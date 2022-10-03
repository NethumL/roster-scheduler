// import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Preferences from '@/lib/models/Preferences';

export default async function setLeaveDates(req, res) {
  /**
   * TODO: Verify whether doctor logged in
   * TODO: Validate user input
   */
  try {
    if (req.method !== 'PUT') {
      return res.status(405).end();
    }

    // const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Preferences').PreferencesEntity | null} */
    let preferences = null;
    // if (session) {
    await dbConnect();

    const { doctor, leaveDates } = req.body;
    preferences = await Preferences.findOneAndUpdate(
      { doctor: doctor },
      {
        leaveDates: leaveDates,
      }
    );
    if (!preferences) {
      preferences = new Preferences({
        doctor,
        preferenceOrder: [],
        leaveDates,
      });
    }
    await preferences.save();
    res.status(200).json({ preferences });
    console.log(preferences);
    // }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
