import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Ward from '@/lib/models/Ward';
import Shift from '@/lib/models/Shift';

export default async function editWard(req, res) {
  /**
   * TODO: Verify whether admin logged in
   */

  try {
    if (req.method !== 'PUT') {
      return res.status(405).end();
    }

    const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Ward').WardEntity | null} */
    let ward = null;

    if (session) {
      await dbConnect();

      const {
        _id,
        name,
        description,
        personInCharge,
        shifts,
        minNumberOfDoctors,
        maxNumberOfLeaves,
        minNumberOfDoctorsPerShift,
        allowAdjacentShifts,
      } = req.body;
      console.log('api body edit ward');
      console.log(req.body);
      let shiftsL = [];
      let shft;
      console.log(shifts);
      shifts.map(async (shift) => {
        if (shift._id === undefined) {
          shft = new Shift(shift);
          shft.save();
          shiftsL.push(shft._id);
        } else {
          const s = await Shift.findByIdAndUpdate(shift._id, {
            name: shift.name,
            start: shift.start,
            end: shift.end,
          });
          console.log('shift id');
          console.log(shift._id);
          shiftsL.push(s._id);
          console.log(shiftsL);
        }
      });
      ward = await Ward.findByIdAndUpdate(_id, {
        name: name,
        description: description,
        personInCharge: personInCharge._id,
        // shifts: shiftsL,
        minNumberOfDoctors: minNumberOfDoctors,
        maxNumberOfLeaves: maxNumberOfLeaves,
        minNumberOfDoctorsPerShift: minNumberOfDoctorsPerShift,
        allowAdjacentShifts: allowAdjacentShifts,
      });
      ward = await Ward.findByIdAndUpdate(_id, {
        $addToSet: { shifts: { $each: shiftsL } },
      });
      if (!ward) return res.status(404).json({ message: 'Ward not found' });

      res
        .status(200)
        .json(await Ward.find({ _id: ward._id }).populate('shifts').lean());
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
