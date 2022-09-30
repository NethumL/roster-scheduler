import mongoose from 'mongoose';

/**
 * @typedef {{_id: string, subject: string, description: string, userId: string, resolved: boolean, save: function, findByIdAndUpdate: function}} ReportEntity
 */

const ReportSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    resolved: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
