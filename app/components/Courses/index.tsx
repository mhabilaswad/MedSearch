"use client"
import React, { Component } from "react";
import Image from "next/image";

export default class AboutUs extends Component {
    render() {
        return (
            <div id="about-us" className="my-20">
                <div className="mx-auto max-w-7xl sm:py-8 px-4 lg:px-8">
                    <div className="sm:flex justify-between items-center mb-0">
                        <h3 className="text-midnightblue text-4xl lg:text-5xl font-semibold">Tentang Kami</h3>
                    </div>

                    <div className="sm:flex sm:items-center">
                        {/* Bagian kiri (Teks) */}
                        <div className="sm:w-1/2 text-left pr-12">
                            <p className="text-lg text-gray-700">
                                MedSearch adalah platform pencarian obat yang dirancang untuk memudahkan
                                masyarakat dalam menemukan informasi terpercaya tentang obat-obatan, dosis,
                                indikasi, dan efek sampingnya.
                            </p>
                        </div>



                        {/* Bagian kanan (Gambar) */}
                        <div className="sm:w-1/2 ml-12">
                            <Image
                                src="/assets/courses/tentangkami.png"
                                alt="Tentang Kami"
                                width={500}
                                height={400}
                                className="rounded-lg object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
