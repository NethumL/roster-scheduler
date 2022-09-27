import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Report from '@/lib/models/Report';

export default async function resolve(req, res) {
  /**
   * TODO: Verify whether a consultant logged in
   */

  try {
    if (req.method !== 'PUT') {
      return res.status(405).end();
    }

    const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Report').ReportEntity | null} */
    let report = null;

    if (session) {
      await dbConnect();

      const { postId } = req.body;
      report = await Report.findByIdAndUpdate(
        postId,
        { resolved: true },
        { new: true }
      );

      if (!report) return res.status(404).json({ message: 'Report not found' });

      res.status(200).json({ report });
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}
