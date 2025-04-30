import { connectDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import SimpanObat from '@/models/SimpanObat'; // Pastikan model SimpanObat sudah ada

export async function POST(req) {
  try {
    const { email, nama_obat } = await req.json();

    console.log('Data yang diterima:', { email, nama_obat });

    if (!email || !nama_obat) {
      return NextResponse.json({ message: 'Email dan nama obat diperlukan' }, { status: 400 });
    }

    await connectDB();

    const simpanObat = new SimpanObat({
      email,
      nama_obat,
      createdAt: new Date(),
    });

    await simpanObat.save();

    console.log('Obat berhasil disimpan:', simpanObat);
    return NextResponse.json({ message: 'Obat berhasil disimpan!' }, { status: 201 });
  } catch (err) {
    console.error('Error menyimpan obat:', err);
    return NextResponse.json({ message: 'Gagal menyimpan obat' }, { status: 500 });
  }
}


