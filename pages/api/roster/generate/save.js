import dbConnect from '@/lib/db';
import Roster from '@/lib/models/Roster';
import Ward from '@/lib/models/Ward';
import mongoose from 'mongoose';

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  if (req.headers['x-secret'] !== process.env.SERVICE_SECRET) {
    return res.status(401).end();
  }

  try {
    const { schedule, data } = req.body;
    const { ward: wardId, year, month } = data;

    await dbConnect();

    const ward = await Ward.findOne({ _id: wardId })
      .populate(['personInCharge', 'doctors'])
      .lean();

    const shifts = ward.shifts.map((shift) => shift.toString());

    const rosterInsts = Object.entries(schedule).map(
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
    console.error(error);
    res.status(500).end();
  }
}
