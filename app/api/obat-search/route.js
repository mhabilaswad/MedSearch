import { connectDB } from '@/lib/mongoose';
import Obat from '@/models/Obat';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    const regex = new RegExp(query, 'i'); // Case insensitive

    const hasilPencarian = await Obat.find({
      nama_obat: { $regex: regex }
    }).limit(10); // Limit hasil pencarian

    console.log("Hasil pencarian:", hasilPencarian);

    return new Response(
      JSON.stringify({ data: hasilPencarian }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error searching obat:', error);
    return new Response('Error searching obat', { status: 500 });
  }
}
