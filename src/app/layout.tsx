import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import React from 'react';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

    <body>
    {children}
    <Script src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.clientId}`}
            strategy={'beforeInteractive'}></Script>
    </body>
    </html>
  );
}
