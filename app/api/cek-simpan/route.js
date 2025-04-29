import connectDB from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import SimpanObat from '@/models/SimpanObat';

export async function POST(req) {
  try {
    await connectDB(); // hanya panggil connectDB() untuk koneksi mongoose
    const { email, nama_obat } = await req.json();

    const simpanan = await SimpanObat.findOne({
      email: email,
      nama_obat: nama_obat,
    });

    if (simpanan) {
      return NextResponse.json({ isSaved: true });
    } else {
      return NextResponse.json({ isSaved: false });
    }
  } catch (error) {
    console.error('Error cek simpan:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
