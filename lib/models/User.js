import mongoose from 'mongoose';

/**
 * @typedef {{_id: string, username: string, name: string, type: string}} UserEntity
 */

const UserSchema = new mongoose.Schema({
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
    enum: ['CONSULTANT', 'DOCTOR', 'ADMIN'],
    required: true,
  },
});
export default mongoose.models?.User || mongoose.model('User', UserSchema);
