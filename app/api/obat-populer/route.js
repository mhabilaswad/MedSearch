import connectDB from '@/lib/mongoose';
import Obat from '@/models/Obat';

export async function GET() {
  try {
    await connectDB(); // Koneksi akan tetap aktif jika sudah ada

    // Mengambil 4 obat secara acak dengan gambar yang valid (tidak kosong dan bukan '-')
    const obatPopuler = await Obat.aggregate([
      {
        $match: {
          gambar: { $ne: '', $ne: '-' } // Filter gambar yang tidak kosong atau tidak '-'
        }
      },
      { $sample: { size: 4 } } // Mengambil 4 dokumen secara acak
    ]);

    console.log("Data obat populer:", obatPopuler); // Cek data yang diterima

    return new Response(
      JSON.stringify({ data: obatPopuler }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching obat populer:', error);
    return new Response('Error fetching obat populer', { status: 500 });
  }
}