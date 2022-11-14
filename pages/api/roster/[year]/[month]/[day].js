import { getUser } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Roster from '@/lib/models/Roster';
import Ward from '@/lib/models/Ward';

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
    user = await getUser(req);
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }

  await dbConnect();
  const ward = await Ward.findOne({ doctors: user._id }).lean();

  // @ts-ignore
  const year = parseInt(req.query.year);
  // @ts-ignore
  const month = parseInt(req.query.month);
  // @ts-ignore
  const day = parseInt(req.query.day);

  // From query string
  const doctorId = req.query.doctor;

  const roster = await Roster.findOne({
    ward: ward._id,
    month: { $gte: `${year}-${month}-01`, $lte: `${year}-${month}-30` },
  })
    .populate([
      { path: 'rosters.doctor' },
      { path: 'rosters.shifts', options: { retainNullValues: true } },
    ])
    .lean();

  const doctorShifts = roster.rosters.find(
    (elem) => elem.doctor._id.toString() === doctorId
  ).shifts;

  const shift = doctorShifts[day - 1];

  return res.json({
    shift: {
      _id: shift?._id.toString(),
      name: shift?.name,
    },
  });
}
