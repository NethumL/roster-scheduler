import mongoose, { Schema } from 'mongoose';

const ExchangeSchema = new mongoose.Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  otherDoctor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shift: {
    type: Schema.Types.ObjectId,
    ref: 'Shift',
    required: true,
  },
  shiftDate: {
    type: Date,
    required: true,
  },
  otherShift: {
    type: Schema.Types.ObjectId,
    ref: 'Shift',
    required: true,
  },
  otherShiftDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
    required: true,
    default: 'PENDING',
  },
});

export default mongoose.models.Exchange ||
  mongoose.model('Exchange', ExchangeSchema);
