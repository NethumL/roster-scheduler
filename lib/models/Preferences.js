import mongoose, { Schema } from 'mongoose';

const PreferencesSchema = new mongoose.Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  preferenceOrder: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Shift' }],
    required: true,
  },
  leaveDates: {
    type: [Date],
    required: true,
  },
});

export default mongoose.models.Preferences ||
  mongoose.model('Preferences', PreferencesSchema);
