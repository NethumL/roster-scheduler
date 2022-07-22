import Local from 'passport-local';
import dbConnect from '../db';
import User from '../models/User';
import { validatePassword } from './user';

export const localStrategy = new Local.Strategy(async function (
  username,
  password,
  done
) {
  await dbConnect();
  const user = await User.findOne({ username }).select('+password').lean();
  const isValid = user && validatePassword(user, password);
  if (isValid) {
    done(null, user);
  } else {
    done(new Error('Invalid credentials'), null);
  }
});
