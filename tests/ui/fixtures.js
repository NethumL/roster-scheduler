import { loadEnvConfig } from '@next/env';
import { test } from '@playwright/test';
import mongoose from 'mongoose';
import NewUser from '../../lib/models/NewUser';
import User from '../../lib/models/User';
import Request from '../../lib/models/Request';
import Ward from '../../lib/models/Ward';
import Preferences from '../../lib/models/Preferences';
import Shift from '../../lib/models/Shift';
export default test.extend({
  sharedBeforeEach: [
    async ({}, use) => {
      await setup();
      await use();
      await teardown();
    },
    // @ts-ignore
    { scope: 'test', auto: true },
  ],
});

async function setup() {
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
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c9b',
      username: 'doctor1',
      name: 'Doctor 1',
      password: '$2a$12$1XlHf1SKssVoAO03lgBJQenqn3fLSOhZVLbg6b/S7ooqtoubSY0E2',
      type: 'DOCTOR',
    },
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c9c',
      username: 'consultant1',
      name: 'Consultant 1',
      password: '$2a$12$1XlHf1SKssVoAO03lgBJQenqn3fLSOhZVLbg6b/S7ooqtoubSY0E2',
      type: 'CONSULTANT',
    },
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c9d',
      username: 'doctor2',
      name: 'Doctor 2',
      password: '$2a$12$1XlHf1SKssVoAO03lgBJQenqn3fLSOhZVLbg6b/S7ooqtoubSY0E2',
      type: 'DOCTOR',
    },
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c9e',
      username: 'consultant2',
      name: 'Consultant 2',
      password: '$2a$12$1XlHf1SKssVoAO03lgBJQenqn3fLSOhZVLbg6b/S7ooqtoubSY0E2',
      type: 'CONSULTANT',
    },
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c9f',
      username: 'doctor3',
      name: 'Doctor 3',
      password: '$2a$12$1XlHf1SKssVoAO03lgBJQenqn3fLSOhZVLbg6b/S7ooqtoubSY0E2',
      type: 'DOCTOR',
    },
  ]);

  await Request.insertMany([
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c9e',
      subject: 'Test Subject 1',
      description: 'Test Description 1',
      resolved: false,
      user: '5f9f1c9b9c9b9c9b9c9b9c9b',
    },
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c9f',
      subject: 'Test Subject 2',
      description: 'Test Description 2',
      resolved: true,
      user: '5f9f1c9b9c9b9c9b9c9b9c9b',
    },
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c10',
      subject: 'Test Subject 3',
      description: 'Test Description 3',
      resolved: false,
      user: '5f9f1c9b9c9b9c9b9c9b9c9d',
    },
  ]);

  await Ward.insertMany([
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c11',
      name: 'Test Ward 1',
      description: 'Test Description 1',
      personInCharge: '5f9f1c9b9c9b9c9b9c9b9c9c',
      shifts: ['5f9f1c9b3c3b9c9b9c9b9c12', '5f9f1c9b3c3b9c9b9c9b9c13'],
      minNumberOfDoctors: 1,
      maxNumberOfLeaves: 2,
      minNumberOfDoctorsPerShift: 1,
      allowAdjacentShifts: false,
      doctors: ['5f9f1c9b9c9b9c9b9c9b9c9b', '5f9f1c9b9c9b9c9b9c9b9c9d'],
    },
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c12',
      name: 'Test Ward 2',
      description: 'Test Description 2',
      personInCharge: '5f9f1c9b9c9b9c9b9c9b9c9e',
      shifts: ['5f9f1c9b3c3b9c9b9c9b9c14', '5f9f1c9b3c3b9c9b9c9b9c15'],
      minNumberOfDoctors: 1,
      maxNumberOfLeaves: 2,
      minNumberOfDoctorsPerShift: 1,
      allowAdjacentShifts: false,
      doctors: ['5f9f1c9b9c9b9c9b9c9b9c9f'],
    },
  ]);

  await Shift.insertMany([
    {
      _id: '5f9f1c9b3c3b9c9b9c9b9c12',
      name: 'Shift 1',
      start: '12:00',
      end: '13:00',
    },
    {
      _id: '5f9f1c9b3c3b9c9b9c9b9c13',
      name: 'Shift 2',
      start: '13:00',
      end: '14:00',
    },
    {
      _id: '5f9f1c9b3c3b9c9b9c9b9c14',
      name: 'Shift 3',
      start: '04:00',
      end: '08:00',
    },
    {
      _id: '5f9f1c9b3c3b9c9b9c9b9c15',
      name: 'Shift 4',
      start: '08:00',
      end: '12:00',
    },
  ]);
  await Preferences.insertMany([
    {
      _id: '63368eca4f61caa84b8efb02',
      doctor: '5f9f1c9b9c9b9c9b9c9b9c9b',
      leaveDates: [
        '2022-12-13T18:30:00.000+00:00',
        '2022-12-06T18:30:00.000+00:00',
      ],
      preferenceOrder: ['5f9f1c9b3c3b9c9b9c9b9c13', '5f9f1c9b3c3b9c9b9c9b9c12'],
    },
  ]);
  await NewUser.insertMany([
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c12',
      username: 'doctor3',
      name: 'Doctor 3',
      password: '$2a$12$1XlHf1SKssVoAO03lgBJQenqn3fLSOhZVLbg6b/S7ooqtoubSY0E2',
      type: 'DOCTOR',
    },
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c13',
      username: 'doctor4',
      name: 'Doctor 4',
      password: '$2a$12$1XlHf1SKssVoAO03lgBJQenqn3fLSOhZVLbg6b/S7ooqtoubSY0E2',
      type: 'DOCTOR',
    },
    {
      _id: '5f9f1c9b9c9b9c9b9c9b9c14',
      username: 'consultant2',
      name: 'Consultant 2',
      password: '$2a$12$1XlHf1SKssVoAO03lgBJQenqn3fLSOhZVLbg6b/S7ooqtoubSY0E2',
      type: 'CONSULTANT',
    },
  ]);
}

async function teardown() {
  await mongoose.connect(process.env.MONGODB_URI);
  await clearDb();
}

async function clearDb() {
  await User.deleteMany({});
  await NewUser.deleteMany({});
  await Request.deleteMany({});
  await Ward.deleteMany({});
  await Shift.deleteMany({});
  await Preferences.deleteMany({});
}
