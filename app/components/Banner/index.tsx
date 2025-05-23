'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Signin from '../Navbar/Signdialog' // pastikan path ini benar ya

const Banner = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [isSigninOpen, setIsSigninOpen] = useState(false)

    const handleButtonClick = () => {
        if (session) {
            // Sudah login, langsung ke homepage
            router.push('/homepage')
        }
    }

    return (
        <div id="home-section" className="relative bg-lightkblue overflow-hidden">
            {/* Gambar Background */}
            <div className="absolute top-0 transform z-0 pointer-events-none">
                <Image
                    src="/assets/banner/landing.png"
                    alt="Landing"
                    width={1500}
                    height={1000}
                    priority
                />
            </div>

            {/* Konten */}
            <div className="relative z-10 mx-auto max-w-7xl min-h-screen px-6 flex items-start pt-36">
                <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
                    {/* Kolom Kiri */}
                    <div className="col-span-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-10">
                        <h1 className="text-midnightblue text-4xl sm:text-6xl font-semibold">
                            Solusi Cerdas
                            <br />
                            Mencari Informasi
                            <br />
                            Obat
                        </h1>
                        <h3 className="text-charcoal text-lg sm:text-2xl font-normal">
                            Temukan Informasi lengkap tentang obat dengan mudah, cepat, dan akurat
                        </h3>

                        {/* Tombol Mulai */}
                        <div>
                            <button
                                onClick={handleButtonClick}
                                className="bg-[#1C74DB] hover:bg-[#155bb0] transition-colors px-14 py-3 rounded-xl text-white text-lg font-medium shadow-lg"
                            >
                                Mulai
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* SignIn Dialog */}
            {isSigninOpen && <Signin />}
        </div>
    )
}

export default Banner
