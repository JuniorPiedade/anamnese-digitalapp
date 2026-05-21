"use client";

import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-slate-800 antialiased font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mx-auto mb-4">
          <LayoutDashboard className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Painel Anamnese Digital</h1>
        <p className="text-xs text-slate-500 mt-2 mb-6">Seja bem-vindo ao seu gerenciador de fichas estéticas.</p>
        <div className="flex flex-col gap-2">
          <Link href="/dashboard/nova-ficha" className="bg-blue-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm hover:bg-blue-700 transition-all">
            Ir para Nova Ficha
          </Link>
          <Link href="/dashboard/configuracoes" className="text-slate-600 text-xs font-semibold py-2.5 px-4 hover:underline">
            Acessar Configurações
          </Link>
        </div>
      </div>
    </div>
  );
}
