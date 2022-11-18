import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Request from '@/lib/models/Request';

export default async function resolve(req, res) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).end();
    }

    const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Request').RequestEntity | null} */
    let request = null;

    if (session) {
      if (session.type === 'CONSULTANT') {
        await dbConnect();

        const { _id } = req.query;
        const { resolve } = req.body;

        if (resolve !== true) return res.status(400).end();

        request = await Request.findByIdAndUpdate(
          _id,
          { resolved: true },
          { new: true }
        );

        if (!request)
          return res.status(404).json({ message: 'Report not found' });

        res.status(200).json({ request });
      } else {
        res.status(403).end("You don't have permission to perform this action");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
