import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Ward from '@/lib/models/Ward';
import schemaDoctor from '@/lib/validation/ward/Doctor';

export default async function addDoctor(req, res) {
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
      // const { error: error_2 } = validateWard({ doctor }, ['doctor']);
      const { error } = schemaDoctor.validate(
        { doctor },
        {
          abortEarly: false,
        }
      );
      if (error) {
        console.log(error);
        return res.status(400).json({ error: error.details });
      }
      out = await Ward.update({ _id: _id }, { $push: { doctors: doctor } });

      if (!out) return res.status(404).json({ message: 'Ward not found' });

      res.status(200).json({ out });
    }
  } catch (error) {
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
