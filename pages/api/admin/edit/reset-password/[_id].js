import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import validateUser from '@/lib/validation/User';
import { hashSync } from 'bcryptjs';

export default async function resetPassword(req, res) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).end();
    }

    const session = await getLoginSession(req);

    /** @type {import('@/lib/models/User').UserEntity|null} */
    let user = null;

    if (session) {
      if (session.type === 'ADMIN') {
        await dbConnect();

        const { _id } = req.query;
        const { password } = req.body;

        const { error } = validateUser({ password }, ['password']);
        if (error) {
          return res.status(400).json({ error: error.details });
        }

        const hashedPassword = hashSync(password);

        user = await User.findByIdAndUpdate(
          _id,
          { password: hashedPassword },
          {
            new: true,
          }
        );

        if (!user) return res.status(404).json({ message: 'User not found' });

        res
          .status(200)
          .json({ message: 'Password has been successfully changed' });
      } else {
        res.status(403).end("You don't have permission to perform this action");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
