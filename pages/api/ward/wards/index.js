// import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Ward from '@/lib/models/Ward';

export default async function viewWard(req, res) {
  /**
   * TODO: Verify whether an admin logged in
   */

  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    // const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Ward').WardEntity | null} */
    let wards = null;
    // if (session) {
    await dbConnect();
    wards = await Ward.find({});

    res.status(200).json({ wards });
    console.log(ward);
    // }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
