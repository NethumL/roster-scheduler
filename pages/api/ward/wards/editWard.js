// import { getLoginSession } from '@/lib/auth/session';
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

    // const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Ward').WardEntity | null} */
    let ward = null;

    // if (session) {
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
    ward = await Ward.findByIdAndUpdate(_id, {
      name: name,
      description: description,
      personInCharge: personInCharge,
      shifts: shifts,
      minNumberOfDoctors: minNumberOfDoctors,
      maxNumberOfLeaves: maxNumberOfLeaves,
      minNumberOfDoctorsPerShift: minNumberOfDoctorsPerShift,
      allowAdjacentShifts: allowAdjacentShifts,
    });

    if (!ward) return res.status(404).json({ message: 'Ward not found' });

    res.status(200).json({ ward });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
