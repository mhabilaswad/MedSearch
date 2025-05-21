import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../../../models/User'  // Import model User

// MongoDB URI
const MONGODB_URI = 'mongodb://localhost:27017/medsearch_db'

// Fungsi untuk menyambung ke MongoDB
async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    return
  }
  await mongoose.connect(MONGODB_URI)
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
