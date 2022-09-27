import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';

export default async function updateUser(req, res) {
  /**
   * TODO: Verify whether an admin logged in
   * TODO: Validate the passwords
   */
  try {
    const session = await getLoginSession(req);

    /** @type {import('@/lib/models/User').UserEntity|null} */
    let user = null;

    if (session) {
      await dbConnect();

      const { _id } = req.query;
      const { password, confPassword } = req.body;

      user = await User.findByIdAndUpdate(
        _id,
        { password },
        {
          new: true,
        }
      );

      if (!user) return res.status(404).json({ message: 'User not found' });

      res
        .status(200)
        .json({
          _id: user._id,
          username: user.username,
          name: user.name,
          type: user.type,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
