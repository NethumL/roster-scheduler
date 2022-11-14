import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Preferences from '@/lib/models/Preferences';
import Roster from '@/lib/models/Roster';
import User from '@/lib/models/User';
import Ward from '@/lib/models/Ward';
import { send } from '@/lib/util';
import mongoose from 'mongoose';

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  /** @type {?import('@/lib/models/User').UserEntity} */
  let user;

  try {
    const session = await getLoginSession(req);

    if (session) {
      const { username } = session;

      await dbConnect();

      user = await User.findOne({ username }).lean();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }

  if (!user) {
    res.status(500).end('No such user');
  }

  const ward = await Ward.findOne({ personInCharge: user._id })
    .populate(['personInCharge', 'doctors'])
    .lean();

  // @ts-ignore
  const year = parseInt(req.query.year);
  // @ts-ignore
  const month = parseInt(req.query.month);

  const daysInMonth = new Date(year, month, 0).getDate();

  // Get preferences for doctors in ward
  const prefs = await Preferences.find({
    doctor: { $in: ward.doctors },
  })
    .populate('doctor')
    .exec();

  /** @type {string[]} */
  const shifts = ward.shifts.map((shift) => shift.toString());

  const doctors = Object.fromEntries(
    prefs.map((document) => [
      document.doctor._id.toString(),
      {
        prefs: document.preferenceOrder.map(
          (/** @type {import('mongoose').ObjectId} */ shift) =>
            shifts.indexOf(shift.toString())
        ),
        leaves: document.leaveDates.map((/** @type {Date} */ date) =>
          date.getDate()
        ),
      },
    ])
  );

  const body = {
    constraints: {
      minDoctors: Array(ward.shifts.length).fill(
        ward.minNumberOfDoctorsPerShift
      ),
      maxDoctors: Array(ward.shifts.length).fill(
        ward.minNumberOfDoctorsPerShift * 2
      ),
      days: daysInMonth,
      shifts: ward.shifts.length,
    },
    doctors,
  };

  try {
    const response = await send('POST', process.env.SERVICE_HOST, body, {
      headers: { 'X-secret': process.env.SERVICE_SECRET },
    });

    const rosterInsts = Object.entries(response).map(
      ([doctorId, shiftInds]) => {
        return {
          doctor: new mongoose.Types.ObjectId(doctorId),
          shifts: shiftInds.map((ind) => {
            if (ind === -1) return null;
            return new mongoose.Types.ObjectId(shifts[ind]);
          }),
        };
      }
    );

    const roster = new Roster({
      ward: ward._id,
      month: `${year}-${month}-01`,
      rosters: rosterInsts,
    });
    await roster.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).end();
  }
}
