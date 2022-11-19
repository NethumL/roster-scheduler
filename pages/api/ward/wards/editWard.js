import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Ward from '@/lib/models/Ward';
import Shift from '@/lib/models/Shift';
import validateWard from '@/lib/validation/ward/Ward';
import validateShift from '@/lib/validation/ward/Shift';

export default async function editWard(req, res) {
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

      let shiftsL = [];
      let shft;
      shifts.map(async (shift, index) => {
        const { error: error_1 } = validateShift(
          {
            name: shift.name,
            start: shift.start,
            end: shift.end,
          },
          ['name', 'start', 'end']
        );
        if (error_1) {
          return res.status(400).json({ error: error_1.details });
        }
        if (shift._id === undefined) {
          shft = new Shift(shift);
          await shft.save();
          shiftsL.push(shft._id);
        } else {
          const s = await Shift.findByIdAndUpdate(shift._id, {
            name: shift.name,
            start: shift.start,
            end: shift.end,
          });
          shiftsL.push(s._id);
        }
      });
      let personInChargeId = personInCharge._id;
      const { error: error_2 } = validateWard(
        {
          name,
          description,
          personInChargeId,
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
        return res.status(400).json({ error: error_2.details });
      }
      ward = await Ward.findByIdAndUpdate(_id, {
        name: name,
        description: description,
        personInCharge: personInCharge._id,
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
    console.log(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
