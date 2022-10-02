import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Ward from '@/lib/models/Ward';

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
    let report = null;

    if (session) {
      await dbConnect();

      const {
        wardId,
        name,
        description,
        personInCharge,
        numDutyCycles,
        numDoctors,
        maxNumLeaves,
        minNumDoctorsPerShift,
        statusAdjacentShifts,
      } = req.body;
      ward = await Ward.findByIdAndUpdate(
        wardId,
        { name: name },
        { description: description },
        { personInCharge: personInCharge },
        { numDutyCycles: numDutyCycles },
        { numDoctors: numDoctors },
        { maxNumLeaves: maxNumLeaves },
        { minNumDoctorsPerShift: minNumDoctorsPerShift },
        { statusAdjacentShifts: statusAdjacentShifts }
      );

      if (!ward) return res.status(404).json({ message: 'Report not found' });

      res.status(200).json({ ward });
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
