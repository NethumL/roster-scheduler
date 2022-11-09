import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Preferences from '@/lib/models/Preferences';
import User from '@/lib/models/User';
import Ward from '@/lib/models/Ward';
import { send } from '@/lib/util';

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

  const daysInMonth = new Date(
    // @ts-ignore
    parseInt(req.query.year),
    // @ts-ignore
    parseInt(req.query.month),
    0
  ).getDate();

  // Get prefs for ward doctors
  const result = await Preferences.find({
    doctor: { $in: ward.doctors },
  })
    .populate('doctor')
    .exec();

  const doctors = Object.fromEntries(
    result.map((document) => [
      document.doctor.username,
      {
        prefs: document.preferenceOrder,
        leaves: document.leaveDates.map((/** @type {Date} */ date) =>
          date.getDate()
        ),
      },
    ])
  );

  try {
    const response = await send(
      'POST',
      process.env.SERVICE_HOST,
      {
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
      },
      {
        headers: { 'X-secret': process.env.SERVICE_SECRET },
      }
    );

    // TODO: Save roster to database

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).end();
  }
}
