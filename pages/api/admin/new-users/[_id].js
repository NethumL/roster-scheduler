import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import NewUser from '@/lib/models/NewUser';
import User from '@/lib/models/User';

export default async function newUser(req, res) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).end();
    }

    const session = await getLoginSession(req);

    if (session) {
      if (session.type === 'ADMIN') {
        await dbConnect();

        const { _id } = req.query;
        const { accept } = req.body;

        let user = null;
        let currentUser = await NewUser.findById(_id)
          .select('+password')
          .lean();
        if (!currentUser)
          return res.status(404).json({ message: 'User not found' });

        if (accept) {
          const { name, username, password, type } = currentUser;

          user = new User({
            name,
            username,
            password,
            type,
          });

          await user.save();
        }

        await NewUser.findByIdAndDelete(_id);
        res.status(200).json({ user });
      } else {
        res.status(403).end("You don't have permission to perform this action");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
