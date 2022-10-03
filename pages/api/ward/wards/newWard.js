// import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Ward from '@/lib/models/Ward';

export default async function newWard(req, res) {
  /**
   * TODO: Verify whether an admin logged in
   * TODO: Validate user input
   */

  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    // const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Ward').WardEntity | null} */
    let ward = null;
    // if (session) {
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
    ward = new Ward({
      name,
      description,
      personInCharge,
      shifts,
      minNumberOfDoctors,
      maxNumberOfLeaves,
      minNumberOfDoctorsPerShift,
      allowAdjacentShifts,
      doctors: [],
    });

    await ward.save();
    res.status(200).json({ ward });
    console.log(ward);
    // }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
