import mongoose from 'mongoose';

const SimpanObatSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  nama_obat: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.SimpanObat || mongoose.model('SimpanObat', SimpanObatSchema);