// import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Ward from '@/lib/models/Ward';

export default async function viewDoctors(req, res) {
  /**
   * TODO: Verify whether an admin logged in
   */

  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    // const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Ward').WardEntity | null} */
    let doctors = null;
    // if (session) {
    const { _id } = req.body;
    await dbConnect();
    doctors = await Ward.findById(_id).select('doctors');

    if (!doctors) {
      return res.status(404).json({ message: 'Invalid ward id' });
    }
    res.status(200).json({ doctors: doctors.doctors });
    console.log(doctors);
    // }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
