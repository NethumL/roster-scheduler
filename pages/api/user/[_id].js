import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';

export default async function updateUser(req, res) {
  /**
   * TODO: Validate the request body
   */
  try {
    const session = await getLoginSession(req);

    /** @type {import('@/lib/models/User').UserEntity|null} */
    let user = null;

    if (session) {
      if (session.type === 'Admin') {
        await dbConnect();

        const { _id } = req.query;
        const { name, type } = req.body;

        user = await User.findByIdAndUpdate(
          _id,
          { name, type },
          {
            new: true,
          }
        );

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({
          user: {
            _id: user._id,
            username: user.username,
            name: user.name,
            type: user.type,
          },
        });
      } else {
        res.status(403).end("You don't have permission to perform this action");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
