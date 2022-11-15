import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Exchange from '@/lib/models/Exchange';
import Roster from '@/lib/models/Roster';
import Ward from '@/lib/models/Ward';
import mongoose from 'mongoose';

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  /** @type {?import('@/lib/models/User').UserEntity} */
  let user;

  try {
    user = await getUser(req);
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }

  if (user.type !== 'DOCTOR') {
    return res.status(403).end();
  }

  const { id } = req.query;
  const { status } = req.body;

  // @ts-ignore
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({ error: 'ID is invalid' });
  }

  if (status !== 'ACCEPTED' && status !== 'REJECTED') {
    return res.status(422).json({ error: 'Status is invalid' });
  }

  await dbConnect();

  const ward = await Ward.findOne({ doctors: user._id }).exec();

  const exchange = await Exchange.findOne({ _id: id }).exec();

  if (exchange.otherDoctor.toString() !== user._id) {
    return res.status(403).end();
  }

  /** @type {Date} */
  const date = exchange.shiftDate;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  exchange.status = status;
  await exchange.save();

  if (status === 'ACCEPTED') {
    const roster = await Roster.findOne({
      ward: ward._id,
      month: { $gte: `${year}-${month}-01`, $lte: `${year}-${month}-30` },
    }).exec();

    const doctorShifts = roster.rosters.find(
      (r) => r.doctor.toString() === user._id
    ).shifts;

    const theirDoctorShifts = roster.rosters.find(
      (r) => r.doctor.toString() === exchange.doctor.toString()
    ).shifts;

    doctorShifts[date.getDate() - 1] = exchange.shift;
    theirDoctorShifts[date.getDate() - 1] = exchange.otherShift;

    await roster.save();
  }

  res.json({ success: true });
}
