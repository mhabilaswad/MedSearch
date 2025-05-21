'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProtectedPage from '@/app/components/auth/ProtectedPage';
import Link from "next/link";

const Homepage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [selected, setSelected] = useState<'gejala' | 'penyakit'>('gejala');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!session && status !== 'loading') {
      router.push('/');
    }
  }, [session, status, router]);

  const [obatPopuler, setObatPopuler] = useState<Obat[]>([]);
  const [obatDisimpan, setObatDisimpan] = useState<Obat[]>([]);
  const [riwayatPencarian, setRiwayatPencarian] = useState<any[]>([]); // State untuk riwayat pencarian obat

  useEffect(() => {
    if (session?.user?.email) {
      const fetchObat = async () => {
        const res = await fetch('/api/obat-populer');
        const json = await res.json();
        console.log("DATA OBAT POPULER:", json);
        setObatPopuler(json.data || []);
      };

      const fetchObatDisimpan = async () => {
        try {
          const res = await fetch(`/api/obat-disimpan?email=${session?.user?.email}`);
          const json = await res.json();
          if (res.ok) {
            setObatDisimpan(json.data || []);
          } else {
            console.error('Gagal mengambil obat yang disimpan');
          }
        } catch (error) {
          console.error('Terjadi kesalahan:', error);
        }
      };

      fetchObat();
      fetchObatDisimpan();
    }

    // Mengambil riwayat pencarian obat dari localStorage saat komponen dimuat
    const riwayat = JSON.parse(localStorage.getItem('riwayatObat') || '[]');
    // Menyaring dan mengambil 4 riwayat terbaru saja
    setRiwayatPencarian(riwayat.slice(-4));
  }, [session]);

  type Obat = {
    _id: string;
    nama_obat: string;
    gambar: string;
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/searching?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleDeleteObat = async (id: string) => {
    if (!confirm('Apakah kamu yakin ingin menghapus obat ini?')) return;

    const res = await fetch(`/api/obat-disimpan/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setObatDisimpan(obatDisimpan.filter((obat) => obat._id !== id));
    }
  };

  return (
    <ProtectedPage>
      <div className="space-y-16 px-4 py-8">
        {/* 1. Hero Section */}
        <section className="text-center space-y-14">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            Temukan Informasi Obat <br />dengan Mudah
          </h1>
          {/* Search Box */}
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Cari nama obat atau penyakit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
          </div>

        </section>

        {/* 2. Daftar Obat Populer */}
        <section>
          <div className="container mx-auto max-w-[85%] px-7 py-7 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-5">Daftar Obat Populer</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {obatPopuler.map((obat) => (
                <div key={obat._id} className="bg-white border rounded-lg p-4 text-center shadow">
                  <img
                    src={obat.gambar}
                    alt={obat.nama_obat}
                    className="h-32 w-full object-cover rounded mb-2"
                  />
                  <p className="font-medium">{obat.nama_obat}</p>
                  <Link href={`/detail/${encodeURIComponent(obat.nama_obat)}`} passHref>
                    <button
                      className="mt-2 px-4 py-1 text-sm bg-[#1C74DB] text-white rounded hover:bg-[#155AA0]"
                      onClick={() => {
                        // Menyimpan riwayat obat yang dilihat ke localStorage
                        const riwayat = JSON.parse(localStorage.getItem('riwayatObat') || '[]');
                        riwayat.push({
                          nama_obat: obat.nama_obat,
                          tanggal: new Date().toLocaleString(),
                        });
                        // Mengambil hanya 4 riwayat terbaru
                        localStorage.setItem('riwayatObat', JSON.stringify(riwayat.slice(-4)));
                      }}
                    >
                      Lihat Detail
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Riwayat Pencarian Obat */}
        <section>
          <div className="container mx-auto max-w-[85%] px-8 py-8 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Riwayat Pencarian Obat</h2>
            <div className="space-y-4">
              {riwayatPencarian.length > 0 ? (
                riwayatPencarian.map((obat, i) => (
                  <div key={i} className="flex justify-between items-center bg-gray-100 rounded-lg p-4 shadow">
                    <div>
                      <p className="font-medium">{obat.nama_obat}</p>
                      <p className="text-sm text-gray-500">{obat.tanggal}</p>
                    </div>
                    <Link href={`/detail/${encodeURIComponent(obat.nama_obat)}`} passHref>
                      <button className="text-blue-600 hover:underline">Lihat Detail &gt;</button>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Belum ada riwayat pencarian obat.</p>
              )}
            </div>
          </div>
        </section>

        {/* 4. Obat yang Kamu Simpan */}
        <section>
          <div className="container mx-auto max-w-[85%] px-7 py-7 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-5">Obat yang Kamu Simpan</h2>
            {obatDisimpan.length > 0 ? (
              <div className="flex overflow-x-auto space-x-0 pb-6 gap-8">
                {obatDisimpan.map((obat) => (
                  <div
                    key={obat._id}
                    className="flex-none w-3/7 md:w-1/4 bg-white border rounded-lg p-4 text-center shadow"
                  >
                    <img
                      src={obat.gambar || '/placeholder.jpg'}
                      alt={obat.nama_obat}
                      className="h-32 w-full object-cover rounded mb-2"
                    />
                    <p className="font-medium">{obat.nama_obat}</p>
                    <Link href={`/detail/${encodeURIComponent(obat.nama_obat)}`} passHref>
                    <button
                      className="mt-2 px-4 py-1 text-sm bg-[#1C74DB] text-white rounded hover:bg-[#155AA0]"
                      onClick={() => {
                        // Menyimpan riwayat obat yang dilihat ke localStorage
                        const riwayat = JSON.parse(localStorage.getItem('riwayatObat') || '[]');
                        riwayat.push({
                          nama_obat: obat.nama_obat,
                          tanggal: new Date().toLocaleString(),
                        });
                        // Mengambil hanya 4 riwayat terbaru
                        localStorage.setItem('riwayatObat', JSON.stringify(riwayat.slice(-4)));
                      }}
                    >
                      Lihat Detail
                    </button>
                  </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Tidak ada obat yang disimpan.</p>
            )}
          </div>
        </section>
      </div>
    </ProtectedPage>
  );
};

export default Homepage;