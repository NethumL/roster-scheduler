import mongoose from 'mongoose';

/**
 * @typedef {{_id: string, username: string, name: string, type: string}} NewUserEntity
 */

const NewUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  type: {
    type: String,
    enum: ['CONSULTANT', 'DOCTOR'],
    required: true,
  },
});
export default mongoose.models.NewUser ||
  mongoose.model('NewUser', NewUserSchema);
