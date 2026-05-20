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
    nicho: "Gestão Estética",
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
        { data: "05/05/2026", evento: "Primeira Anamnese Digital preenchida via WhatsApp." }
      ]
    },
    { 
      id: "2", 
      paciente: "Beatriz Costa", 
      procedimento: "Preenchimento Labial", 
      data: "18/05/2026", 
      status: "Assinado",
      historico: [
        { data: "18/05/2026", evento: "Preenchimento Labial com 1ml de Ácido Hialurônico." }
      ]
    },
  ];

  const fichasFiltradas = fichasExemplo.filter(ficha => 
    ficha.paciente.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ficha.procedimento.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col md:flex-row w-full overflow-x-hidden">
      
      {/* SIDEBAR CORRIGIDA: TRAVADA COM LARGURA REAL E SHRINK-0 NO DESKTOP */}
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

      {/* ÁREA DE CONTEÚDO PRINCIPAL (OCUPA TODO O ESPAÇO RESTANTE) */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        
        {/* HEADER COMPLETAMENTE ALINHADO */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 md:px-8 backdrop-blur-md gap-4 w-full">
          <div className="relative flex-1 max-w-xs md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Buscar por paciente ou procedimento..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
          </div>
          <a href="/dashboard/nova-ficha" className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-all whitespace-nowrap"><Plus className="h-3.5 w-3.5" /> Nova Ficha</a>
        </header>

        {/* CONTAINER DASHBOARD */}
        <main className="p-4 md:p-8 max-w-5xl w-full mx-auto flex-1">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Bem-vinda, {primeiroNome}</h1>
            <p className="text-xs text-slate-500 mt-0.5">Painel de controle {perfil.nicho.toLowerCase()}.</p>
          </div>

          {/* CARD DE COMPARTILHAMENTO CORRIGIDO CONTRA COMPRESSÃO VISUAL */}
          <div className="mb-6 md:mb-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/70 to-indigo-50/40 p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-4 min-w-0">
               <div className="h-12 w-12 rounded-xl bg-white border border-blue-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {perfil.foto ? <img src={perfil.foto} className="h-full w-full object-cover" alt="Perfil" /> : <Share2 className="text-blue-500 h-5 w-5" />}
               </div>
               <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">Enviar Anamnese</h3>
                  <p className="text-[11px] text-slate-500
