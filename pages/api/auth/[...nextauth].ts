import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../../../models/User'  // Import model User

async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    console.log('✅ MongoDB sudah terkoneksi');
    return;
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) throw new Error('❌ MONGODB_URI tidak ditemukan');

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Berhasil konek ke MongoDB');
  } catch (err) {
    console.error('❌ Gagal konek MongoDB:', err);
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          // Jika email atau password tidak ada, tolak akses
          return null;
        }

        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user._id, email: user.email };
        } else {
          return null;
        }
      }
      ,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email ?? '';
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id
        session.email = token.email
      }
      return session
    },
  },
})
