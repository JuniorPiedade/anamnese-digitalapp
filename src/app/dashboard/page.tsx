"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Users, Plus, Search, Copy, Share2, Check, Settings, Calendar, Clock, X
} from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<any | null>(null);
  const [primeiroNome, setPrimeiroNome] = useState("Profissional");
  
  const [perfil, setPerfil] = useState({
    nome: "Anamnese Digital",
    nicho: "Seu Nicho",
    foto: ""
  });

  useEffect(() => {
    const nome = localStorage.getItem('anamnese_nomeNegocio') || "Anamnese Digital";
    const nicho = localStorage.getItem('anamnese_nicho') || "Gestão Estética";
    const foto = localStorage.getItem('anamnese_fotoPerfil') || "";
    
    setPerfil({ nome, nicho, foto });
    setPrimeiroNome(nome.trim().split(' ')[0]);
  }, []);

  const LINK_ANAMNESE = "https://anamnese-digitalapp.vercel.app/anamnese/cliente";
  const MENSAGEM_WHATSAPP = encodeURIComponent(`Olá! Por favor, preencha sua ficha digital:\n${LINK_ANAMNESE}`);

  const copiarLink = () => {
    navigator.clipboard.writeText(LINK_ANAMNESE);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const fichasExemplo = [
    { 
      id: "1", 
      paciente: "Mariana Silva", 
      procedimento: "Toxina Botulínica", 
      data: "19/05/2026", 
      status: "Assinado",
      historico: [
        { data: "19/05/2026", evento: "Retorno e aplicação de reforço em região de glabela." },
        { data: "05/05/2026", evento: "Aplicação inicial de Toxina Botulínica (35U) - Full Face." }
      ]
    },
    { 
      id: "2", 
      paciente: "Beatriz Costa", 
      procedimento: "Preenchimento Labial", 
      data: "18/05/2026", 
      status: "Assinado",
      historico: [
        { data: "18/05/2026", evento: "Preenchimento Labial com 1ml de Ácido Hialurônico (Restylane)." }
      ]
    },
  ];

  const fichasFiltradas = fichasExemplo.filter(ficha => 
    ficha.paciente.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ficha.procedimento.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col md:flex-row w-full">
      
      {/* SIDEBAR CORRIGIDA (LARGURA FIXA E COMPORTAMENTO FLEX NO DESKTOP) */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 px-5 py-5 md:py-6 flex md:flex-col justify-between md:justify-start items-center md:items-stretch gap-4 shrink-0">
        <div className="flex items-center gap-3 w-full px-1">
          <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
            {perfil.foto ? <img src={perfil.foto} className="h-full w-full object-cover" alt="Perfil" /> : <FileText className="text-blue-600 h-5 w-5" />}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-bold text-slate-900 truncate block w-full">{perfil.nome}</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight truncate block w-full mt-0.5">{perfil.nicho}</span>
          </div>
        </div>
        
        <nav className="hidden md:flex flex-col mt-8 flex-1 space-y-1 w-full">
          <a href="#" className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 w-full"><LayoutDashboard className="h-4 w-4 shrink-0" /> Início</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 w-full"><FileText className="h-4 w-4 shrink-0" /> Fichas</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 w-full"><Users className="h-4 w-4 shrink-0" /> Pacientes</a>
          <a href="/dashboard/configuracoes" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 w-full"><Settings className="h-4 w-4 shrink-0" /> Ajustes</a>
        </nav>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL (DENTRO DO FLUXO DO GRID) */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        
        {/* HEADER REALINHADO COM O CONTEÚDO */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 md:px-8 backdrop-blur-md gap-4 w-full">
          <div className="relative flex-1 max-w-xs md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Buscar por paciente ou procedimento..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
          </div>
          <a href="/dashboard/nova-ficha" className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-all whitespace-nowrap"><Plus className="h-3.5 w-3.5" /> Nova Ficha</a>
        </header>

        {/* CONTAINER DO DASHBOARD */}
        <main className="p-4 md:p-8 max-w-5xl w-full mx-auto flex-1">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Bem-vinda, {primeiroNome}</h1>
            <p className="text-xs text-slate-500 mt-0.5">Painel de controle {perfil.nicho.toLowerCase()}.</p>
          </div>

          {/* CARD DE COMPARTILHAMENTO AJUSTADO PARA EVITAR QUEBRA DE BOTÃO */}
          <div className="mb-6 md:mb-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/70 to-indigo-50/40 p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-xl bg-white border border-blue-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {perfil.foto ? <img src={perfil.foto} className="h-full w-full object-cover" alt="Perfil" /> : <Share2 className="text-blue-500 h-5 w-5" />}
               </div>
               <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">Enviar Anamnese</h3>
                  <p className="text-[11px] text-slate-500">Mande o link direto para o cliente.</p>
               </div>
            </div>
            <div className="flex flex-row items-center gap-2 shrink-0">
              <button onClick={copiarLink} className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-sm whitespace-nowrap min-w-[120px]">
                {copiado ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />} {copiado ? "Copiado!" : "Copiar Link"}
              </button>
              <a href={`https://wa.me/?text=${MENSAGEM_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all whitespace-nowrap"><Share2 className="h-3.5 w-3.5" /> WhatsApp</a>
            </div>
          </div>

          {/* LISTAGEM DE PACIENTES */}
          <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden mb-8">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="px-6 py-4">Paciente</th>
                    <th className="px-6 py-4">Procedimento</th>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fichasFiltradas.map((ficha) => (
                    <tr key={ficha.id} onClick={() => setPacienteSelecionado(ficha)} className="hover:bg-slate-50/60 cursor-pointer transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{ficha.paciente}</td>
                      <td className="px-6 py-4 text-slate-500">{ficha.procedimento}</td>
                      <td className="px-6 py-4 text-slate-400">{ficha.data}</td>
                      <td className="px-6 py-4 text-right"><span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg font-bold text-[9px] uppercase tracking-tighter border border-emerald-100">✓ {ficha.status}</span></td>
                    </tr>
                  ))}
                  {fichasFiltradas.length === 0 && (
                    <tr><td colSpan={4} className="text-center py-8 text-slate-400">Nenhum paciente encontrado.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Interface Mobile */}
            <div className="block md:hidden divide-y divide-slate-100">
              {fichasFiltradas.map((ficha) => (
                <div key={ficha.id} onClick={() => setPacienteSelecionado(ficha)} className="p-4 active:bg-slate-50 flex items-center justify-between gap-2 cursor-pointer">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-bold text-slate-900 truncate">{ficha.paciente}</span>
                    <span className="text-xs text-slate-500 truncate">{ficha.procedimento}</span>
                    <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> {ficha.data}</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-bold text-[9px] uppercase border border-emerald-100 shrink-0">✓ {ficha.status}</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* NAVEGAÇÃO MOBILE */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30 px-6 py-2 flex items-center justify-around shadow-lg">
          <a href="#" className="flex flex-col items-center gap-0.5 text-blue-600"><LayoutDashboard className="h-4 w-4" /><span className="text-[9px] font-bold uppercase tracking-tight">Início</span></a>
          <a href="#" className="flex flex-col items-center gap-0.5 text-slate-400"><FileText className="h-4 w-4" /><span className="text-[9px] font-medium uppercase tracking-tight">Fichas</span></a>
          <a href="#" className="flex flex-col items-center gap-0.5 text-slate-400"><Users className="h-4 w-4" /><span className="text-[9px] font-medium uppercase tracking-tight">Pacientes</span></a>
          <a href="/dashboard/configuracoes" className="flex flex-col items-center gap-0.5 text-slate-400"><Settings className="h-4 w-4" /><span className="text-[9px] font-medium uppercase tracking-tight">Ajustes</span></a>
        </nav>
        <div className="h-16 md:hidden" />
      </div>

      {/* MODAL / GAVETA HISTÓRICO */}
      {pacienteSelecionado && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setPacienteSelecionado(null)} />
          <div className="relative w-full md:max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] md:max-h-[75vh] z-10">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{pacienteSelecionado.paciente}</h3>
                <p className="text-[11px] text-slate-400 uppercase font-medium tracking-tight mt-0.5">{pacienteSelecionado.procedimento}</p>
              </div>
              <button onClick={() => setPacienteSelecionado(null)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto flex-1 space-y-6">
              <div className="relative border-l-2 border-blue-100 pl-4 ml-2 space-y-6">
                {pacienteSelecionado.historico?.map((evento: any, idx: number) => (
                  <div key={idx} className="relative">
                    <span className={`absolute -left-[21px] top-1.5 h-2 w-2 rounded-full border-
