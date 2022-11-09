import mongoose, { Schema } from 'mongoose';

const ShiftInstanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const RosterSchema = new mongoose.Schema({
  ward: {
    type: Schema.Types.ObjectId,
    ref: 'Ward',
    required: true,
  },
  month: {
    type: Date,
    required: true,
  },
  shifts: {
    type: [[ShiftInstanceSchema]],
    required: true,
  },
});

export default mongoose.models?.Roster ||
  mongoose.model('Roster', RosterSchema);
