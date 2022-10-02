import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Ward from '@/lib/models/Ward';

export default async function ward(req, res) {
  /**
   * TODO: Verify whether a doctor logged in
   * TODO: Validate user input
   * TODO: Include user id
   */

  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Report').ReportEntity | null} */
    let ward = null;

    if (session) {
      await dbConnect();

      const { subject, description } = req.body;
      ward = new Ward({
        name,
        description,
        personInCharge,
        numDutyCycles,
        numDoctors,
        maxNumLeaves,
        minNumDoctorsPerShift,
        statusAdjacentShifts,
      });

      await ward.save();
      res.status(200).json({ ward });
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
