/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/google-font-display */
import './globals.css';
import NavBar from '../components/NavBar.jsx';

import type { Metadata } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Resi Real-Estate Finder',
  // description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang='en'>
      <Head>
        <Link
          // display='optional'
          as=''
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
        />
        <Link  as="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
      </Head>
      <body className={inter.className}>
      <NavBar />
        
        {children}</body>
    </html>
  );
}
