'use client';

import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";
import LogoutDialog from "./Logoutdialog";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Beranda', href: '#/', current: true },
  { name: 'Tentang', href: '#tentang', current: false },
  { name: 'Hubungi Kami', href: '#hubungi', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const handleSmoothScroll = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState('/');
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    const isAnchor = href.startsWith('#');
    const id = href.replace('#', '');

    setCurrentLink(href);

    if (isAnchor) {
      if (pathname !== '/') {
        setPendingScroll(id);
        router.push('/');
      } else {
        handleSmoothScroll(id);
      }
    } else {
      router.push(href);
    }
  };

  // Jalankan scroll setelah pindah ke '/'
  useEffect(() => {
    if (pathname === '/' && pendingScroll) {
      setTimeout(() => {
        handleSmoothScroll(pendingScroll);
        setPendingScroll(null);
      }, 300);
    }
  }, [pathname, pendingScroll]);

  return (
    <Disclosure as="nav" className="navbar shadow-md">
      <>
        <div className="mx-auto max-w-7xl px-6 py-0 lg:px-8">
          <div className="relative flex h-12 md:h-20 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              {/* LOGO */}
              <div className="flex items-center flex-shrink-0">
                <img className="block h-8 w-auto lg:hidden" src="/assets/logo/logo.png" alt="dsign-logo" />
                <img className="hidden h-8 w-auto lg:block" src="/assets/logo/logo.png" alt="dsign-logo" />
              </div>

              {/* LINKS */}
              <div className="hidden lg:block m-auto">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <span
                      key={item.name}
                      onClick={() => handleLinkClick(item.href)}
                      className={classNames(
                        item.href === currentLink ? 'underline-links' : 'text-slategray',
                        'px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100 cursor-pointer'
                      )}
                      aria-current={item.href === currentLink ? 'page' : undefined}
                    >
                      {item.name}
                    </span>
                  ))}

                  {status === 'authenticated' && (
                    <span
                      onClick={() => handleLinkClick('/homepage')}
                      className={classNames(
                        '/homepage' === currentLink ? 'underline-links' : 'text-slategray',
                        'px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100 cursor-pointer'
                      )}
                      aria-current={currentLink === '/homepage' ? 'page' : undefined}
                    >
                      Homepage
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* AUTH: LOGIN / LOGOUT */}
            <div className="flex items-center gap-3">
              {status === 'authenticated' ? (
                <LogoutDialog />
              ) : (
                <>
                  <Signdialog />
                  <Registerdialog />
                </>
              )}
            </div>

            {/* DRAWER ICON */}
            <div className='block lg:hidden'>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
            </div>

            {/* DRAWER LINKS */}
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;