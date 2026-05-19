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

  // URL da ficha pública que criamos no passo anterior
  const LINK_ANAMNESE = "https://anamnese-digitalapp.vercel.app/anamnese/cliente";
  
  // Mensagem padrão que será enviada pelo WhatsApp
  const MENSAGEM_WHATSAPP = encodeURIComponent(
    `Olá! Para agilizarmos o seu atendimento e garantirmos total segurança no seu procedimento, por favor, preencha a nossa ficha de pré-atendimento digital antes da sua consulta.\n\nClique no link seguro para responder (leva menos de 3 minutos):\n${LINK_ANAMNESE}`
  );

  // Função para copiar o link para a área de transferência
  const copiarLink = () => {
    navigator.clipboard.writeText(LINK_ANAMNESE);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // Dados estáticos temporários (enquanto não conectamos o banco)
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
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      
      {/* SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-slate-200 bg-white px-4 py-6">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Klinni IA</span>
        </div>
        <nav className="mt-10 flex-1 space-y-1">
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

      {/* ÁREA CENTRAL */}
      <div className="flex-1 pl-64">
        
        {/* HEADER */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-8 backdrop-blur-md">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar paciente ou procedimento..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <a href="/dashboard/nova-ficha" className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-all">
              <Plus className="h-4 w-4" /> Preencher na Clínica
            </a>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="p-8 max-w-5xl">
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Painel de Controle</h1>
            <p className="text-xs text-slate-500 mt-1">Gerencie seus pré-atendimentos e fichas digitais.</p>
          </div>

          {/* CARD DE AÇÕES RÁPIDAS (COMPARTILHAMENTO) */}
          <div className="mb-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/70 to-indigo-50/40 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Enviar Anamnese para o Cliente</h3>
              <p className="text-xs text-slate-500 mt-0.5">Copie o link ou envie diretamente para o WhatsApp do paciente.</p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Botão de Copiar Link */}
              <button 
                onClick={copiarLink}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-98 transition-all shadow-sm"
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
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-98 transition-all"
              >
                <Share2 className="h-3.5 w-3.5" /> Compartilhar no WhatsApp
              </a>
            </div>
          </div>

          {/* HISTÓRICO DE FICHAS */}
          <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-4">
              <h2 className="text-sm font-bold text-slate-900">Fichas Recentes</h2>
            </div>

            <div className="overflow-x-auto">
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
                        <td className="
