'use client';

import { useEffect, useState } from 'react';

type Props = {
  params: {
    nama_obat: string;
  };
};

const DetailObat = ({ params }: Props) => {
  const nama_obat = decodeURIComponent(params.nama_obat);
  const [detail, setDetail] = useState<any>(null);

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

    fetchDetail();
  }, [nama_obat]);

  if (!detail) return <div className="p-6 text-center text-gray-600">Memuat data...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{detail.nama_obat}</h1>

      {/* Bagian gambar dan deskripsi */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img
          src={detail.gambar || '/placeholder.jpg'}
          alt={detail.nama_obat}
          className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
        />
<Section
  title="Deskripsi"
  content={detail.deskripsi && detail.deskripsi.trim() !== '-' ? detail.deskripsi : 'Tidak ada deskripsi untuk Obat ini'}
/>

      </div>

      {/* Bagian detail lainnya */}
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
