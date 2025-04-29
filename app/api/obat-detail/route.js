import connectDB from '@/lib/mongoose';
import Obat from '@/models/Obat';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const namaObat = searchParams.get('nama_obat');

    let hasil;

    if (namaObat) {
      hasil = await Obat.findOne({ nama_obat: decodeURIComponent(namaObat) });
    } else {
      hasil = await Obat.find({});
    }

    return new Response(
      JSON.stringify({ data: hasil }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching obat:', error);
    return new Response('Error fetching obat', { status: 500 });
  }
}
