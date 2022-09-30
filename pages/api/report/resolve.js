import { getLoginSession } from '@/lib/auth/session';
import dbConnect from '@/lib/db';
import Report from '@/lib/models/Report';

export default async function resolve(req, res) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).end();
    }

    const session = await getLoginSession(req);

    /** @type {import('@/lib/models/Report').ReportEntity | null} */
    let report = null;

    if (session) {
      if (session.type === 'Consultant') {
        await dbConnect();

        const { postId } = req.body;
        report = await Report.findByIdAndUpdate(
          postId,
          { resolved: true },
          { new: true }
        );

        if (!report)
          return res.status(404).json({ message: 'Report not found' });

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
