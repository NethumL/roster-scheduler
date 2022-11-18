import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Ward from '@/lib/models/Ward';
import Shift from '@/lib/models/Shift';

export default async function newWard(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Ward').WardEntity | null} */
    let ward = null;
    let preference = null;
    if (session) {
      await dbConnect();

      const {
        name,
        description,
        personInCharge,
        shifts,
        minNumberOfDoctors,
        maxNumberOfLeaves,
        minNumberOfDoctorsPerShift,
        allowAdjacentShifts,
      } = req.body;
      let shiftsL = [];
      let shft;
      shifts.map((shift) => {
        shft = new Shift(shift);
        shft.save();
        shiftsL.push(shft._id);
      });
      ward = new Ward({
        name,
        description,
        personInCharge,
        shifts: shiftsL,
        minNumberOfDoctors,
        maxNumberOfLeaves,
        minNumberOfDoctorsPerShift,
        allowAdjacentShifts,
        doctors: [],
      });

      await ward.save();

      res
        .status(200)
        .json(await Ward.find({ _id: ward._id }).populate('shifts').lean());
    }
  } catch (error) {
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
