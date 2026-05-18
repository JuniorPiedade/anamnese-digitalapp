'use client';

import React from 'react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-[#0b0f19]">
      <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
          Anamnese Digital ✨
        </h1>
        <p className="mb-6 text-zinc-400">
          O sistema de fichas inteligente customizável para profissionais de estética.
        </p>
        <div className="rounded-xl bg-emerald-500/10 p-4 border border-emerald-500/25 text-emerald-400 font-medium text-sm">
          A estrutura base foi criada com sucesso! 🚀
        </div>
      </div>
    </div>
  );
}
