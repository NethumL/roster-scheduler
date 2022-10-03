import mongoose, { Schema } from 'mongoose';
import User from './User';
// import Shift from './Shift';
import { ShiftSchema } from '@/lib/models/Shift';
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shifts: {
    type: [{ ShiftSchema }],
    // type: [{ type: Schema.Types.Schema, ref: 'Shift' }],
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
