import { connectDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import SimpanObat from '@/models/SimpanObat';

export async function DELETE(req) {
  try {
    await connectDB();
    const { email, nama_obat } = await req.json();

    if (!email || !nama_obat) {
      return NextResponse.json({ error: 'Email dan nama_obat wajib diisi' }, { status: 400 });
    }

    const result = await SimpanObat.deleteOne({ email, nama_obat });

    if (result.deletedCount > 0) {
      return NextResponse.json({ message: 'Obat berhasil dihapus' });
    } else {
      return NextResponse.json({ message: 'Data tidak ditemukan' }, { status: 404 });
    }
  } catch (error) {
    console.error('Gagal menghapus obat:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
