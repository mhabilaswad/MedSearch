// lib/mongoose.ts
import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log('=> already connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    isConnected = mongoose.connections[0].readyState === 1;

    if (isConnected) {
      console.log('=> use previous connection');
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGODB_URI!, {
    bufferCommands: false,
  });

  isConnected = true;
  console.log('=> new connection');
};