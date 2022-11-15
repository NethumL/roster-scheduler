import dbConnect from '@/lib/db';
import NewUser from '@/lib/models/NewUser';
import schemaRegister from '@/lib/validation/auth/register';
import { hashSync } from 'bcryptjs';

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { error, value } = schemaRegister.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      console.error(error);
      return res.status(422).json(error.details);
    }

    const { name, username, password, userType } = value;

    const hashedPassword = hashSync(password);

    await dbConnect();

    let newUser = new NewUser({
      name,
      username,
      password: hashedPassword,
      type: userType,
    });

    newUser.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).end('Server error');
  }
}
