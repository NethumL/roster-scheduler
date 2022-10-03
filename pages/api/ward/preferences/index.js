// import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Preferences from '@/lib/models/Preferences';

export default async function viewPreferences(req, res) {
  /**
   * TODO: Verify whether a doctor logged in
   */

  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    // const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Preferences').PreferencesEntity | null} */
    let preferences = null;
    // if (session) {
    const { doctor } = req.body;
    await dbConnect();
    preferences = await Preferences.findOne({ doctor: doctor }).exec();

    res.status(200).json({ preferences });
    console.log(preferences);
    // }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
