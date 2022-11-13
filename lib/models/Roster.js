import mongoose, { Schema } from 'mongoose';
import User from './User';
import Shift from './Shift';

const RosterInstanceSchema = new mongoose.Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shifts: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Shift' }],
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
  rosters: {
    type: [RosterInstanceSchema],
    required: true,
  },
});

export const RosterInstance =
  mongoose.models?.RosterInstance ||
  mongoose.model('RosterInstance', RosterInstanceSchema);

export default mongoose.models?.Roster ||
  mongoose.model('Roster', RosterSchema);
