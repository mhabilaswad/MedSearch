import Link from "next/link";
import Image from "next/image";

interface ProductType {
    id: number;
    section: string;
    link: string[];
}

interface socialLinks {
    imgSrc: string;
    link: string;
    width: number;
}

const socialLinks: socialLinks[] = [
    {
        imgSrc: '/assets/footer/facebook.svg',
        link: 'www.facebook.com',
        width: 10
    },
    {
        imgSrc: '/assets/footer/insta.svg',
        link: 'www.instagram.com',
        width: 14
    },
    {
        imgSrc: '/assets/footer/twitter.svg',
        link: 'www.twitter.com',
        width: 14
    },
]

const footer = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="my-12 grid grid-cols-1 gap-y-10 sm:grid-cols-6 lg:grid-cols-12">
                {/* COLUMN-1 */}
                <div className='sm:col-span-6 lg:col-span-7'>
                    <div className="flex flex-shrink-0 items-center border-right">
                        {/* Logo */}
                        <Image src="/assets/logo/logo.png" alt="logo" width={214} height={66} />
                    </div>
                    {/* Text below the logo */}
                    <h3 className='text-xs font-medium text-gunmetalgray lh-160 mt-5 mb-4 lg:mb-16'>
                        Solusi Cerdas Mencari <br /> Informasi Obat
                    </h3>
                    {/* Address Text */}
                    <p className="text-xs font-normal text-darkgray opacity-80">
                        Kopelma Darussalam,<br />Kec. Syiah Kuala,<br />Kota Banda Aceh, Aceh 23111
                    </p>
                </div>
                
                <div className="lg:col-span-5 sm:col-span-6 flex justify-end items-start gap-4">
                    <div className="flex flex-col items-end space-y-4">
                        {/* Email */}
                        <p className="text-darkgray text-base font-normal text-right">medsearch@gmail.com</p>
                        {/* Instagram */}
                        <Link href="https://www.instagram.com/hmif.fmipausk/" target="_blank" className="flex items-center gap-2">
                            <Image src="/assets/footer/insta.svg" alt="Instagram" width={14} height={14} />
                            <p className="text-darkgray text-base font-normal text-right">@MedSearch</p>
                        </Link>

                        {/* Phone Number */}
                        <p className="text-darkgray text-base font-normal text-right">+62 123 456 789</p>
                    </div>
                </div>
            </div>

            {/* All Rights Reserved */}
            <div className='py-10 md:flex items-center justify-between border-t border-t-gray-blue'>
                <h4 className='text-dark-red opacity-75 text-sm text-center md:text-start font-normal'>@MedSearch</h4>
                <div className="flex gap-5 mt-5 md:mt-0 justify-center md:justify-start">
                    <h4 className='text-dark-red opacity-75 text-sm font-normal'><Link href="/" target="_blank">Privacy policy</Link></h4>
                    <div className="h-5 bg-dark-red opacity-25 w-0.5"></div>
                    <h4 className='text-dark-red opacity-75 text-sm font-normal'><Link href="/" target="_blank">Terms & conditions</Link></h4>
                </div>
            </div>
        </div>
    )
}

export default footer;

