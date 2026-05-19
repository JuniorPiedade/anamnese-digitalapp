"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Plus, 
  Search, 
  CheckCircle2, 
  Copy, 
  Share2, 
  Check
} from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiado, setCopiado] = useState(false);

  const LINK_ANAMNESE = "https://anamnese-digitalapp.vercel.app/anamnese/cliente";
  
  const MENSAGEM_WHATSAPP = encodeURIComponent(
    `Olá! Para agilizarmos o seu atendimento e garantirmos total segurança no seu procedimento, por favor, preencha a nossa ficha de pré-atendimento digital antes da sua consulta.\n\nClique no link seguro para responder (leva menos de 3 minutos):\n${LINK_ANAMNESE}`
  );

  const copiarLink = () => {
    navigator.clipboard.writeText(LINK_ANAMNESE);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const fichasExemplo = [
    { id: "1", paciente: "Mariana Silva", procedimento: "Toxina Botulínica", data: "19/05/2026", status: "Assinado" },
    { id: "2", paciente: "Beatriz Costa", procedimento: "Preenchimento Labial", data: "18/05/2026", status: "Assinado" },
    { id: "3", paciente: "Carlos Eduardo", procedimento: "Limpeza de Pele", data: "15/05/2026", status: "Assinado" },
  ];

  const fichasFiltradas = fichasExemplo.filter(ficha => 
    ficha.paciente.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ficha.procedimento.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR (DESKTOP) / HEADER SUPERIOR (MOBILE) */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 px-4 py-4 md:py-6 md:fixed md:inset-y-0 md:z-20 flex md:flex-col justify-between md:justify-start items-center md:items-stretch gap-4">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Klinni IA</span>
        </div>
        
        {/* Menu - Escondido no Mobile, Visível no Desktop */}
        <nav className="hidden md:flex flex-col mt-10 flex-1 space-y-1">
          <a href="#" className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600">
            <LayoutDashboard className="h-4 w-4" /> Início
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <FileText className="h-4 w-4" /> Fichas de Anamnese
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Users className="h-4 w-4" /> Meus Pacientes
          </a>
        </nav>
      </aside>

      {/* ÁREA CENTRAL (Ajusta o espaçamento esquerdo apenas no desktop) */}
      <div className="flex-1 md:pl-64 flex flex-col">
        
        {/* HEADER / BARRA DE BUSCA */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 md:px-8 backdrop-blur-md gap-4">
          <div className="relative flex-1 max-w-xs md:max-w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar paciente..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center">
            <a href="/dashboard/nova-ficha" className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-all whitespace-nowrap">
              <Plus className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Preencher na Clínica</span><span className="sm:hidden">Nova Ficha</span>
            </a>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="p-4 md:p-8 max-w-5xl w-full mx-auto flex-1">
          
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Painel de Controle</h1>
            <p className="text-xs text-slate-500 mt-0.5">Gerencie seus pré-atendimentos e fichas digitais.</p>
          </div>

          {/* CARD DE AÇÕES RÁPIDAS (TOTALMENTE RESPONSIVO) */}
          <div className="mb-6 md:mb-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/70 to-indigo-50/40 p-5 md:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Enviar Anamnese para o Cliente</h3>
              <p className="text-xs text-slate-500 mt-0.5">Dispare o link direto para o WhatsApp do seu paciente.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:flex items-center gap-2 w-full lg:w-auto">
              {/* Botão de Copiar Link */}
              <button 
                onClick={copiarLink}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-98 transition-all shadow-sm w-full sm:w-auto"
              >
                {copiado ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" /> Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" /> Copiar Link
                  </>
                )}
              </button>

              {/* Botão de Enviar WhatsApp */}
              <a 
                href={`https://wa.me/?text=${MENSAGEM_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-98 transition-all w-full sm:w-auto"
              >
                <Share2 className="h-3.5 w-3.5" /> Enviar no WhatsApp
              </a>
            </div>
          </div>

          {/* LISTA / TABELA DE FICHAS */}
          <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-bold text-slate-900">Fichas Recentes</h2>
            </div>

            {/* VISTA DESKTOP: TABELA TRADICIONAL */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Paciente</th>
                    <th className="px-6 py-3">Procedimento</th>
                    <th className="px-6 py-3">Data de Envio</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {fichasFiltradas.length > 0 ? (
                    fichasFiltradas.map((ficha) => (
                      <tr key={ficha.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900">{ficha.paciente}</td>
                        <td className="px-6 py-4 text-slate-600">{ficha.procedimento}</td>
                        <td className="px-6 py-4 text-slate-500">{ficha.data}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-medium">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" /> {ficha.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-slate-400">Nenhum paciente encontrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* VISTA MOBILE: CARDS COMPACTOS (DESIGN LIGADO E LIMPO) */}
            <div className="block md:hidden divide-y divide-slate-100">
              {fichasFiltradas.length > 0 ? (
                fichasFiltradas.map((ficha) => (
                  <div key={ficha.id} className="p-4 flex flex-col gap-2 hover:bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{ficha.paciente}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[9px] font-medium">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" /> {ficha.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>{ficha.procedimento}</span>
                      <span>{ficha.data}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-slate-400">Nenhum paciente encontrado.</div>
              )}
            </div>

          </div>
        </main>

        {/* MENU INFERIOR FIXO DE NAVEGAÇÃO (APENAS NO MOBILE) */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30 px-6 py-2 flex items-center justify-around shadow-lg">
          <a href="#" className="flex flex-col items-center gap-0.5 text-blue-600">
            <LayoutDashboard className="h-4 w-4" />
            <span className="text-[9px] font-bold uppercase tracking-tight">Início</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600">
            <FileText className="h-4 w-4" />
            <span className="text-[9px] font-medium uppercase tracking-tight font-sans">Fichas</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600">
            <Users className="h-4 w-4" />
            <span className="text-[9px] font-medium uppercase tracking-tight font-sans">Pacientes</span>
          </a>
        </nav>
        
        {/* Espaçador inferior para o conteúdo não sumir atrás do menu fixo do mobile */}
        <div className="h-16 md:hidden" />
        
      </div>
    </div>
  );
}
