import React from 'react';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ backgroundColor: '#0b0f19', color: '#f3f4f6', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
