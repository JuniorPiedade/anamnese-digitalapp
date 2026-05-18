'use client';

import React from 'react';

export default function Home(): React.JSX.Element {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', backgroundColor: '#0b0f19' }}>
      <div style={{ maxWidth: '448px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '32px', backdropFilter: 'blur(12px)' }}>
        <h1 style={{ marginBottom: '8px', fontSize: '30px', fontWeight: 'bold', color: '#ffffff' }}>
          Anamnese Digital ✨
        </h1>
        <p style={{ marginBottom: '24px', color: '#a1a1aa' }}>
          O sistema de fichas inteligente para profissionais de estética.
        </p>
        <div style={{ borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '16px', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#34d399', fontWeight: '500', fontSize: '14px' }}>
          A estrutura base foi criada com sucesso! 🚀
        </div>
      </div>
    </div>
  );
}
