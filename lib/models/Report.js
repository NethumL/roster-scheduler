import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

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
      type: DoctorSchema,
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
