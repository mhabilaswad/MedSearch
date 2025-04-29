import { hash } from 'bcryptjs'
import User from '../../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb://localhost:27017/medsearch_db'

// Fungsi untuk menyambung ke MongoDB
async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    return
  }
  await mongoose.connect(MONGODB_URI)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body

    // Validasi input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Tolong isi semua data' })
    }

    // Enkripsi password
    const hashedPassword = await hash(password, 12)

    try {
      await connectToDatabase()

      // Periksa apakah email sudah terdaftar
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'Email sudah terdaftar.' })
      }

      // Buat pengguna baru
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      })

      await newUser.save()
      res.status(201).json({ message: 'Registrasi Berhasil!!' })
    } catch (error) {
      res.status(500).json({ message: 'Server error, coba lagi nanti.' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
