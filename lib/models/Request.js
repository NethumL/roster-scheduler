import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * @typedef {{_id: string, subject: string, description: string, user: {_id: string, name: string}, resolved: boolean, save: function, findByIdAndUpdate: function}} RequestEntity
 */

const RequestSchema = new mongoose.Schema(
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

export default mongoose.models.Request || mongoose.model('Request', RequestSchema);
