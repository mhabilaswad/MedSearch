export const dynamic = 'force-dynamic'; // 💡 Tambah ini supaya tidak kena DYNAMIC_SERVER_USAGE

import { connectDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import SimpanObat from '@/models/SimpanObat';
import Obat from '@/models/Obat';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ message: 'Email diperlukan' }, { status: 400 });
    }

    await connectDB();

    const simpanan = await SimpanObat.find({ email }).sort({ createdAt: -1 });

    if (simpanan.length === 0) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    const detailObats = await Promise.all(
      simpanan.map(async (item) => {
        const obat = await Obat.findOne({ nama_obat: item.nama_obat });
        return obat ? { ...obat._doc, _id: item._id } : null;
      })
    );

    const filtered = detailObats.filter((item) => item !== null);
    return NextResponse.json({ data: filtered }, { status: 200 });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 });
  }
}