'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type Props = {
  params: {
    nama_obat: string;
  };
};

const DetailObat = ({ params }: Props) => {
  const nama_obat = decodeURIComponent(params.nama_obat);
  const [detail, setDetail] = useState<any>(null);
  const { data: session } = useSession();

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/api/obat-detail?nama_obat=${encodeURIComponent(nama_obat)}`);
        const json = await res.json();
        setDetail(json.data);
      } catch (err) {
        console.error('Gagal fetch detail obat:', err);
      }
    };

    const checkSaved = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch('/api/cek-simpan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: session.user.email,
              nama_obat: nama_obat,
            }),
          });

          const json = await res.json();
          if (json.isSaved) {
            setIsSaved(true);
          }
        } catch (err) {
          console.error('Gagal cek simpan:', err);
        }
      }
    };

    fetchDetail();
    checkSaved();
  }, [nama_obat, session]);


  const handleSaveObat = async () => {
    if (!detail?.nama_obat) {
      alert("Nama obat tidak boleh kosong");
      return;
    }
  
    try {
      if (!isSaved) {
        // Simpan obat
        const response = await fetch('/api/simpan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: session?.user?.email,
            nama_obat: detail.nama_obat,
          }),
        });
  
        if (response.ok) {
          setIsSaved(true);
        } else {
          console.error('Gagal menyimpan obat.');
        }
      } else {
        // Hapus obat
        const response = await fetch('/api/hapus', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: session?.user?.email,
            nama_obat: detail.nama_obat,
          }),
        });
  
        if (response.ok) {
          setIsSaved(false);
        } else {
          console.error('Gagal menghapus obat.');
        }
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };
  

  if (!detail) return <div className="p-6 text-center text-gray-600">Memuat data...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{detail.nama_obat}</h1>

      {/* Gambar dan deskripsi */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img
          src={detail.gambar || '/placeholder.jpg'}
          alt={detail.nama_obat}
          className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
        />
        <div className="flex-1 grid grid-cols-1 gap-4 text-sm text-gray-700 w-full md:w-2/3 h-[400px] overflow-y-auto">
          <Section
            title="Deskripsi"
            content={detail.deskripsi && detail.deskripsi.trim() !== '-' ? detail.deskripsi : 'Tidak ada deskripsi untuk Obat ini'}
          />
        </div>
      </div>

      {/* Detail lainnya */}
      <div className="grid grid-cols-1 gap-6 text-gray-800 text-sm leading-relaxed">
        <Section title="Kategori" content={detail.kategori} />
        <Section title="Komposisi" content={detail.komposisi} />
        <Section title="Indikasi" content={detail.indikasi} />
        <Section title="Dosis" content={detail.dosis} />
        <Section title="Efek Samping" content={detail.efek_samping} />
        <Section title="Kontraindikasi" content={detail.kontra_indikasi} />
        <Section title="Peringatan" content={detail.peringatan} />
        <Section title="Informasi Lain" content={detail.informasi_lain} />
      </div>

      {/* Tombol simpan */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSaveObat}
          className={`py-3 px-6 text-white font-bold rounded-full transition-colors duration-300 ${isSaved
              ? 'bg-[#D1D5DB] hover:bg-[#9CA3AF]' // Tetap gaya 'disimpan', tapi tetap bisa di-klik
              : 'bg-[#28a745] hover:bg-[#218838]'
            }`}
        >
          {isSaved ? 'Obat Disimpan' : 'Simpan Obat'}
        </button>

      </div>
    </div>
  );
};

const Section = ({ title, content }: { title: string; content: string }) => {
  if (!content) return null;
  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-gray-700 text-justify text-sm">{content}</p>
    </div>
  );
};

export default DetailObat;
