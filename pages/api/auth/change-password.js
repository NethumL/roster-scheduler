import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { compareSync, hashSync } from 'bcryptjs';

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const session = await getLoginSession(req);

    if (session) {
      const { username } = session;

      const { currentPassword, newPassword } = req.body;

      await dbConnect();

      const user = await User.findOne({ username }).select('+password').exec();

      if (compareSync(currentPassword, user.password)) {
        user.password = hashSync(newPassword);
        user.save();
        res.status(200).json({ success: true });
      } else {
        return res.status(500).json({ error: 'Password is incorrect' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
