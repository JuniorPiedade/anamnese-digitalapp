"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Users, Plus, Search, CheckCircle2, Copy, Share2, Check, Settings, X, Calendar, Clock
} from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<any | null>(null);
  
  // DADOS DINÂMICOS DO USUÁRIO
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
  }, []);

  const LINK_ANAMNESE = "https://anamnese-digitalapp.vercel.app/anamnese/cliente";
  const MENSAGEM_WHATSAPP = encodeURIComponent(`Olá! Por favor, preencha sua ficha digital:\n${LINK_ANAMNESE}`);

  const copiarLink = () => {
    navigator.clipboard.writeText(LINK_ANAMNESE);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // SIMULAÇÃO DE HISTÓRICO INTEGRADO (O diferencial contra o papel)
  const fichasExemplo = [
    { 
      id: "1", 
      paciente: "Mariana Silva", 
      procedimento: "Toxina Botulínica", 
      data: "19/05/2026", 
      status: "Assinado",
      historico: [
        { data: "19/05/2026", evento: "Retorno e aplicação de reforço em região de glabela." },
        { data: "05/05/2026", evento: "Aplicação inicial de Toxina Botulínica (35U) - Full Face." },
        { data: "05/05/2026", evento: "Primeira Anamnese Digital preenchida e assinada via WhatsApp." }
      ]
    },
    { 
      id: "2", 
      paciente: "Beatriz Costa", 
      procedimento: "Preenchimento Labial", 
      data: "18/05/2026", 
      status: "Assinado",
      historico: [
        { data: "18/05/2026", evento: "Preenchimento Labial com 1ml de Ácido Hialurônico (Restylane)." },
        { data: "18/05/2026", evento: "Anamnese aprovada: sem histórico de alergias ou herpes ativa." }
      ]
    },
  ];

  // 1. FUNCIONALIDADE: BUSCA INTELIGENTE FILTRADA
  const fichasFiltradas = fichasExemplo.filter(ficha => 
    ficha.paciente.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ficha.procedimento.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lógica de Saudação Customizada
  const obterSaudacao = () => {
    if (!perfil.nome || perfil.nome === "Anamnese Digital") {
      return "Bem-vindo(a)!";
    }
    const primeiroNome = perfil.nome.split(' ')[0];
    return `Bem-vindo(a), ${primeiroNome}!`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 px-4 py-4 md:py-6 md:fixed md:inset-y-0 md:z-20 flex md:flex-col justify-between md:justify-start items-center md:items-stretch gap-4">
        <div className="flex items-center gap-3 px-2">
          <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
            {perfil.foto ? <img src={perfil.foto} className="h-full w-full object-cover" alt="Perfil" /> : <FileText className="text-blue-600 h-5 w-5" />}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 truncate max-w-[120px]">{perfil.nome}</span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">{perfil.nicho}</span>
          </div>
        </div>
        <nav className="hidden md:flex flex-col mt-10 flex-1 space-y-1">
          <a href="#" className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600"><LayoutDashboard className="h-4 w-4" /> Início</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"><FileText className="h-4 w-4" /> Fichas</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"><Users className="h-4 w-4" /> Pacientes</a>
          <a href="/dashboard/configuracoes" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"><Settings className="h-4 w-4" /> Ajustes</a>
        </nav>
      </aside>

      <div className="flex-1 md:pl-64 flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 md:px-8 backdrop-blur-md gap-4">
          <div className="relative flex-1 max-w-xs md:max-w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Buscar por paciente ou procedimento..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
          </div>
          <a href="/dashboard/nova-ficha" className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-3.5 py-2 text-xs font-semibold text-white shadow-sm whitespace-nowrap"><Plus className="h-3.5 w-3.5" /> Nova Ficha</a>
        </header>

        <main className="p-4 md:p-8 max-w-5xl w-full mx-auto flex-1">
          {/* Saudação Dinâmica Atualizada */}
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{obterSaudacao()}</h1>
            <p className="text-xs text-slate-500 mt-0.5">Painel de controle {perfil.nicho.toLowerCase()}.</p>
          </div>

          <div className="mb-6 md:mb-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/70 to-indigo-50/40 p-5 md:p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-xl bg-white border border-blue-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {perfil.foto ? <img src={perfil.foto} className="h-full w-full object-cover" alt="Perfil" /> : <Share2 className="text-blue-500 h-5 w-5" />}
               </div>
               <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">Enviar Anamnese</h3>
                  <p className="text-[11px] text-slate-500">Mande o link direto para o cliente.</p>
               </div>
            </div>
            <div className="grid grid-cols-1 sm:flex items-center gap-2">
              <button onClick={copiarLink} className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-sm">
                {copiado ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />} {copiado ? "Copiado!" : "Copiar Link"}
              </button>
              <a href={`https://wa.me/?text=${MENSAGEM_WHATSAPP}`} target="_blank" className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-all"><Share2 className="h-3.5 w-3.5" /> WhatsApp</a>
            </div>
          </div>

          {/* LISTAGEM DE PACIENTES COM SUPORTE MOBILE COMPLETO */}
          <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
            
            {/* Visualização para Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead><tr className="bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100"><th className="px-6 py-4">Paciente</th><th className="px-6 py-4">Procedimento</th><th className="px-6 py-4">Data</th><th className="px-6 py-4 text-right">Status</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {fichasFiltradas.map((ficha) => (
                    <tr key={ficha.id} onClick={() => setPacienteSelecionado(ficha)} className="hover:bg-slate-50/60 cursor-pointer transition-colors"><td className="px-6 py-4 font-bold text-slate-900">{ficha.paciente}</td><td className="px-6 py-4 text-slate-500">{ficha.procedimento}</td><td className="px-6 py-4 text-slate-400">{ficha.data}</td><td className="px-6 py-4 text-right"><span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg font-bold text-[9px] uppercase tracking-tighter border border-emerald-100">✓ {ficha.status}</span></td></tr>
                  ))}
                  {fichasFiltradas.length === 0 && (
                    <tr><td colSpan={4} className="text-center py-8 text-slate-400">Nenhum paciente encontrado.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* INTERFACE MOBILE: Cartões Rápidos de Toque */}
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
              {fichasFiltradas.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">Nenhum paciente encontrado.</div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* FUNCIONALIDADE: LINHA DO TEMPO DO PACIENTE (MODAL RESPONSIVO) */}
      {pacienteSelecionado && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setPacienteSelecionado(null)} />
          
          <div className="relative w-full md:max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] md:max-h-[75vh] z-10">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{pacienteSelecionado.paciente}</h3>
                <p className="text-[11px] text-slate-400 uppercase font-medium tracking-tight mt-0.5">{pacienteSelecionado.procedimento}</p>
              </div>
              <button onClick={() => setPacienteSelecionado(null)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Histórico de Evolução</span>
                <span className="text-[10px] text-slate-500 font-medium">Último acesso: {pacienteSelecionado.data}</span>
              </div>

              <div className="relative border-l-2 border-blue-100 pl-4 ml-2 space-y-6">
                {pacienteSelecionado.historico?.map((evento: any, idx: number) => (
                  <div key={idx} className="relative">
                    <span className={`absolute -left-[21px] top-1.5 h-2 w-2 rounded-full border-2 bg-white ${idx === 0 ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-300'}`} />
                    
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {evento.data}
                      </span>
                      <p className="text-xs text-slate-700 font-medium mt-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                        {evento.evento}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 grid grid-cols-2 gap-2">
              <button onClick={() => alert('Função para abrir ficha completa')} className="w-full text-center py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                Ver Ficha Cheia
              </button>
              <a href={`https://wa.me/?text=${encodeURIComponent(`Olá ${pacienteSelecionado.paciente}, tudo bem? Gostaria de agendar o seu próximo acompanhamento.`)}`} target="_blank" className="w-full text-center py-2 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
                <Share2 className="h-3.5 w-3.5" /> Contatar
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
