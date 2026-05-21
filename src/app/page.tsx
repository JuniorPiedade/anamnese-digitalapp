"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RaizPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-pulse text-xs font-semibold text-slate-400 uppercase tracking-widest font-sans antialiased">
        Carregando Anamnese Digital...
      </div>
    </div>
  );
}
