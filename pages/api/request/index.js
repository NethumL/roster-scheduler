import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Request from '@/lib/models/Request';
import validateRequest from '@/lib/validation/Request';

export default async function request(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Request').RequestEntity | null} */
    let request = null;

    if (session) {
      if (session.type === 'DOCTOR') {
        await dbConnect();

        const { error } = validateRequest({
          ...req.body,
          user: session._id,
          resolved: false,
        });

        if (error) {
          return res.status(400).json({ error: error.details });
        }

        const { subject, description } = req.body;
        request = new Request({
          subject,
          description,
          user: session._id,
          resolved: false,
        });

        await request.save();
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
