import mongoose from 'mongoose';

export const connectToDb = async () => {
  if (mongoose.connections[0].readyState) return;
  // Using new database connection
  await mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};
