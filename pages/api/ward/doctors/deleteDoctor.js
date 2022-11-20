import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Ward from '@/lib/models/Ward';
import Preferences from '@/lib/models/Preferences';
export default async function deleteDoctor(req, res) {
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
      out = await Ward.update({ _id: _id }, { $pull: { doctors: doctor } });
      await Preferences.findOneAndUpdate(
        { doctor: doctor },
        { preferenceOrder: [] }
      );
      res.status(200).json({ out });
    }
  } catch (error) {
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
