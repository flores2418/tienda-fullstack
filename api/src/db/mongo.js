import mongoose from 'mongoose';

export const conectarMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB conectado');
};