import mongoose from 'mongoose';

export const connectToDatabase = async (mongoUri: string): Promise<typeof mongoose> => {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined. Please provide a valid connection string.');
  }

  mongoose.set('strictQuery', false);

  return mongoose.connect(mongoUri, {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000
  });
};

export const disconnectFromDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};
