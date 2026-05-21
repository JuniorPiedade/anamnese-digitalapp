"use client";

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-slate-800 antialiased font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Painel Klinni IA</h1>
        <p className="text-xs text-slate-500 mt-2 mb-6">Seja bem-vindo ao seu gerenciador de fichas.</p>
        <Link href="/dashboard/nova-ficha" className="bg-blue-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm hover:bg-blue-700 transition-all">
          Ir para Nova Ficha
        </Link>
      </div>
    </div>
  );
}
