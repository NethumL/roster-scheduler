import { loadEnvConfig } from '@next/env';
import { test } from '@playwright/test';
import mongoose from 'mongoose';
import NewUser from '../../lib/models/NewUser';
import User from '../../lib/models/User';

test.beforeEach(async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  await mongoose.connect(process.env.MONGODB_URI);
  await clearDb();
  await User.insertMany([
    {
      username: 'admin',
      name: 'Admin',
      password: '$2a$12$1XlHf1SKssVoAO03lgBJQenqn3fLSOhZVLbg6b/S7ooqtoubSY0E2',
      type: 'ADMIN',
    },
  ]);
});

test.afterEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await clearDb();
});

async function clearDb() {
  await User.deleteMany({});
  await NewUser.deleteMany({});
}

export default test;
