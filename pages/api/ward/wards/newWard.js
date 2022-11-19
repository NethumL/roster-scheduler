import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Ward from '@/lib/models/Ward';
import Shift from '@/lib/models/Shift';
import validateWard from '@/lib/validation/ward/Ward';
import validateShift from '@/lib/validation/ward/Shift';
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
        const { error: error_1 } = validateShift({
          name: shift.name,
          start: shift.start,
          end: shift.end,
        });
        if (error_1) {
          return res.status(400).json({ error: error_1.details });
        }
        shft = new Shift(shift);
        shft.save();
        shiftsL.push(shft._id);
      });
      const { error: error_2 } = validateWard(
        {
          name,
          description,
          personInCharge: personInCharge._id,
          shiftsL,
          minNumberOfDoctors,
          maxNumberOfLeaves,
          minNumberOfDoctorsPerShift,
          allowAdjacentShifts,
        },
        [
          'name',
          'description',
          'shifts',
          'minNumberOfDoctors',
          'maxNumberOfLeaves',
          'minNumberOfDoctorsPerShift',
          'allowAdjacentShifts',
        ]
      );
      if (error_2) {
        console.log(error_2);
        return res.status(400).json({ error: error_2.details });
      }
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
