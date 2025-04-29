import mongoose, { Schema, Document } from 'mongoose';

// Membuat tipe untuk Obat (untuk TypeScript)
interface IObat extends Document {
  _id: mongoose.Types.ObjectId; // Menggunakan _id dari MongoDB
  id: string; // Alias untuk _id, akan dikonversi ke string
  nama_obat: string;
  gambar: string;
  deskripsi: string;
  kategori: string;
  komposisi: string;
  indikasi: string;
  kontra_indikasi: string;
  efek_samping: string;
  dosis: string;
  peringatan: string;
  informasi_lain: string;
}

// Membuat schema untuk koleksi 'obat'
const ObatSchema: Schema<IObat> = new Schema(
  {
    nama_obat: { type: String, required: true },
    gambar: { type: String, required: true },
    deskripsi: { type: String, required: true },
    kategori: { type: String, required: true },
    komposisi: { type: String, required: true },
    indikasi: { type: String, required: true },
    kontra_indikasi: { type: String, required: true },
    efek_samping: { type: String, required: true },
    dosis: { type: String, required: true },
    peringatan: { type: String, required: true },
    informasi_lain: { type: String, required: true },
  },
  { timestamps: true } // Menambahkan timestamps untuk createdAt dan updatedAt
);

// Menambahkan hook untuk mengubah _id menjadi id (alias)
ObatSchema.virtual('id').get(function () {
  return this._id.toHexString(); // Mengubah ObjectId menjadi string
});

// Menyimpan model jika sudah ada atau membuat model baru
const Obat = mongoose.models.Obat || mongoose.model<IObat>('Obat', ObatSchema);

export default Obat;