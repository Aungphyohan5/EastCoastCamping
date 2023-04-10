
const db = require('../config/connection');
const { User, CampGround } = require('../models');

const userData = require('./userData.json');
const campData = require('./campData.json');

db.once('open', async () => {
  // clears the existing data if any
  await User.deleteMany({});
  await CampGround.deleteMany({});

  // inserts userData
  const users = await User.insertMany(userData);
  const campGrounds = await CampGround.insertMany(campData);

  console.log('userData seeded successfully!');
  console.log('campData seeded successfully!');
  process.exit(0);
})