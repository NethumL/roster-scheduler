import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Report from '@/lib/models/Report';

export default async function report(req, res) {
  /**
   * TODO: Validate user input
   */

  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Report').ReportEntity | null} */
    let report = null;

    if (session) {
      if (session.type === 'Doctor') {
        await dbConnect();

        const { subject, description } = req.body;
        report = new Report({
          subject,
          description,
          user: session._id,
          resolved: false,
        });

        await report.save();
        res.status(200).json({ report });
      } else {
        res.status(403).end("You don't have permission to perform this action");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
