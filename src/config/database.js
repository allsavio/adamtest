const mongoose = require('mongoose');

const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/networking-engine';

const connectToDatabase = async (mongoUri = process.env.MONGO_URI || DEFAULT_MONGO_URI) => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(mongoUri, {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
  });
  return mongoose.connection;
};

module.exports = { connectToDatabase };
