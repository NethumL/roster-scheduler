import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Exchange from '@/lib/models/Exchange';
import mongoose from 'mongoose';
import schemaExchange from '@/lib/validation/roster/exchange';

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
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

  await dbConnect();

  const { error, value } = schemaExchange.validate(req.body);

  if (error) {
    console.error(error);
    return res.status(422).json(error.details);
  }

  const { shiftDate, shift, otherDoctor, otherShiftDate, otherShift } = value;

  const exchange = new Exchange({
    doctor: user._id,
    otherDoctor: new mongoose.Types.ObjectId(otherDoctor),
    shift: new mongoose.Types.ObjectId(shift),
    otherShift: new mongoose.Types.ObjectId(otherShift),
    shiftDate: new Date(shiftDate),
    otherShiftDate: new Date(otherShiftDate),
  });

  await exchange.save();
  await exchange.populate(['otherDoctor', 'shift', 'otherShift']);

  res.json({ exchange });
}
