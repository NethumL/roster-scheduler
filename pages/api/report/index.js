import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Report from '@/lib/models/Report';

export default async function report(req, res) {
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
    let report = null;

    if (session) {
      await dbConnect();

      const { subject, description } = req.body;
      report = new Report({
        subject,
        description,
        resolved: false,
      });

      await report.save();
      res.status(200).json({ report });
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
