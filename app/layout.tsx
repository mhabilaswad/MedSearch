'use client';

import './globals.css';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/Footer';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'eLearning',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
