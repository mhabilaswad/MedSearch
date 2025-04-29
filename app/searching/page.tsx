'use client';
import Link from 'next/link'; // JANGAN LUPA import Link dari 'next/link' di atas
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const SearchingPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get('query') || '';
    const [searchInput, setSearchInput] = useState(initialQuery);
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [hasil, setHasil] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm) {
                setIsLoading(true); // Mulai loading
                try {
                    const res = await fetch(`/api/obat-search?query=${encodeURIComponent(searchTerm)}`);
                    const data = await res.json();
                    setHasil(data.data || []);
                } catch (error) {
                    console.error('Gagal fetch data:', error);
                    setHasil([]);
                }
                setIsLoading(false); // Selesai loading
            } else {
                setHasil([]);
            }
        };

        fetchData();
    }, [searchTerm]);

    const handleSearch = () => {
        setSearchTerm(searchInput);
        router.replace(`?query=${encodeURIComponent(searchInput)}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            {/* JUDUL */}
            <div className="mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Pencarian : <span className="text-blue-600">{searchTerm || '-'}</span>
                </h1>
            </div>

            {/* SEARCH BAR */}
            <div className="mb-16 relative">
                <input
                    type="text"
                    placeholder="Cari obat berdasarkan nama atau gejala..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-12 p-2 text-lg border border-gray-100 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MagnifyingGlassIcon
                    className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                {/* Tombol Search di kanan */}
                <button
                    onClick={handleSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                >
                    <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
            </div>

            {/* OBAT CONTAINER */}
            <div className="space-y-5 min-h-[200px]">
                {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {hasil.length > 0 ? (
                            hasil.map((obat) => (
                                <div
                                    key={obat._id}
                                    className="flex items-center p-10 border border-gray-300 rounded-xl shadow-md bg-white"
                                >
                                    {/* Gambar Obat */}
                                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                        <img
                                            src={obat.gambar}
                                            alt={obat.nama_obat}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Info Obat */}
                                    <div className="ml-6 flex flex-col justify-between h-full">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">{obat.nama_obat}</h2>
                                            <p className="text-sm text-gray-500 mt-1">{obat.gejala}</p>
                                        </div>
                                        <Link href={`/detail/${encodeURIComponent(obat.nama_obat)}`} passHref>
                                            <button className="mt-2 px-4 py-1 text-sm bg-[#1C74DB] text-white rounded hover:bg-[#155AA0]">
                                                Lihat Detail
                                            </button>
                                        </Link>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Tidak ditemukan obat sesuai pencarian.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchingPage;
