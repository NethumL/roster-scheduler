import { getLoginSession } from '@/lib/auth/session';
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

    const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Ward').WardEntity | null} */
    let out = null;

    if (session) {
      await dbConnect();

      const { _id, doctor } = req.body;
      out = await Ward.update({ _id: _id }, { $push: { doctors: doctor } });

      if (!out) return res.status(404).json({ message: 'Ward not found' });

      res.status(200).json({ out });
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
