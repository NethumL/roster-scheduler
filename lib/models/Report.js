import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * @typedef {{_id: string, subject: string, description: string, user: {_id: string, name: string}, resolved: boolean, save: function, findByIdAndUpdate: function}} ReportEntity
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    resolved: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
