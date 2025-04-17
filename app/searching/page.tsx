'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';


const dummyObat = [
    {
        id: 1,
        nama: 'Paracetamol',
        gejala: 'Demam, Sakit Kepala',
        gambar: '/assets/obat/paracetamol.png',
    },
    {
        id: 2,
        nama: 'Amoxicillin',
        gejala: 'Infeksi Bakteri, Radang Tenggorokan',
        gambar: '/assets/obat/amoxicillin.png',
    },
    {
        id: 3,
        nama: 'Cetirizine',
        gejala: 'Alergi, Gatal-gatal',
        gambar: '/assets/obat/cetirizine.png',
    },
];

export default function SearchingPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    const filteredObat = dummyObat.filter((obat) =>
        obat.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obat.gejala.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (status === 'loading') return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            {/* JUDUL */}
            <div className="mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Gejala : <span className="text-blue-600">Demam</span>
                </h1>
            </div>

{/* SEARCH BAR */}
<div className="mb-16 relative">
  <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
  <input
    type="text"
    placeholder="Cari obat berdasarkan nama atau gejala..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-12 p-2 text-lg border border-gray-100 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


            {/* OBAT CONTAINER */}
            <div className="space-y-5">
                {filteredObat.map((obat) => (
                    <div
                        key={obat.id}
                        className="flex items-center p-10 border border-gray-300 rounded-xl shadow-md bg-white"
                    >
                        {/* Gambar Obat */}
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                            <img
                                src={obat.gambar}
                                alt={obat.nama}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Info Obat */}
                        <div className="ml-6 flex flex-col justify-between h-full">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">{obat.nama}</h2>
                                <p className="text-sm text-gray-500 mt-1">{obat.gejala}</p>
                            </div>
                            <button
                                className="mt-4 w-fit bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 text-sm"
                                onClick={() => router.push(`/detail-obat/${obat.id}`)}
                            >
                                Lihat Detail
                            </button>
                        </div>
                    </div>
                ))}

                {filteredObat.length === 0 && (
                    <p className="text-center text-gray-500">Tidak ditemukan obat sesuai pencarian.</p>
                )}
            </div>
        </div>
    );
}
