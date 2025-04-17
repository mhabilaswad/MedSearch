// lib/mongoose.ts
import mongoose, { Mongoose } from 'mongoose';

declare global {
  // hanya saat di development kita perlu ini
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

// url MongoDB
const MONGODB_URI = 'mongodb://127.0.0.1:27017/medsearch_db';

// validasi
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI');
}

// cache koneksi global
let cached = global.mongoose ?? (global.mongoose = { conn: null, promise: null });

async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
