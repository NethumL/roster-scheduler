// import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Ward from '@/lib/models/Ward';

export default async function addDoctor(req, res) {
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

    const { _id, doctors } = req.body;
    ward = await Ward.findByIdAndUpdate(_id, {
      doctors: doctors,
    });

    if (!ward) return res.status(404).json({ message: 'Ward not found' });

    res.status(200).json({ ward });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
