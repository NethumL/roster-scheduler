import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Roster from '@/lib/models/Roster';
import User from '@/lib/models/User';
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
    return res.status(500).end('No such user');
  }

  // @ts-ignore
  const year = parseInt(req.query.year);
  // @ts-ignore
  const month = parseInt(req.query.month);

  const { roster: rosterData } = req.body;

  const ward = await Ward.findOne({ personInCharge: user._id })
    .populate(['personInCharge', 'doctors', 'shifts'])
    .lean();

  const roster = await Roster.findOne({
    ward: ward._id,
    month: { $gte: `${year}-${month}-01`, $lte: `${year}-${month}-30` },
  }).exec();

  const rosterInsts = rosterData.map((document) => {
    return {
      doctor: document._id,
      shifts: document.items.map((item) => {
        if (item === '') return null;
        return new mongoose.Types.ObjectId(item);
      }),
    };
  });

  roster.rosters = rosterInsts;
  await roster.save();

  return res.json({ success: true });
}
