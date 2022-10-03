import mongoose, { Schema } from 'mongoose';

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

export default mongoose.models.Shift || mongoose.model('Shift', ShiftSchema);
export { ShiftSchema };
