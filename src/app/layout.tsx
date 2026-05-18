import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Klinni - Anamnese Digital',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0b0f19] text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
