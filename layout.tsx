import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Klinni - Anamnese Digital',
  description: 'Sistema inteligente de anamnese para estética',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
