import { loadEnvConfig } from '@next/env';
import { test } from '@playwright/test';
import mongoose from 'mongoose';
import User from '../../lib/models/User';

test.beforeEach(async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany({});
  const user = new User({
    username: 'john',
    name: 'John Doe',
    password: '$2a$12$1XlHf1SKssVoAO03lgBJQenqn3fLSOhZVLbg6b/S7ooqtoubSY0E2',
    type: 'ADMIN',
  });
  await user.save();
});

test.afterEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany({});
});

export default test;
