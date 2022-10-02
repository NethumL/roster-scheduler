import mongoose, { Schema } from 'mongoose';
import User from './User';

const ShiftSchema = new mongoose.Schema({
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
});

const WardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  personInCharge: {
    type: User,
    required: true,
  },
  shifts: {
    type: [ShiftSchema],
    required: true,
  },
  minNumberOfDoctors: {
    type: Number,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: 'i',
  },
  maxNumberOfLeaves: {
    type: Number,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: 'i',
  },
  minNumberOfDoctorsPerShift: {
    type: Number,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: 'i',
  },
  allowAdjacentShifts: {
    type: Boolean,
    required: true,
  },
  doctors: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    required: true,
  },
});

export default mongoose.models.Ward || mongoose.model('Ward', WardSchema);
