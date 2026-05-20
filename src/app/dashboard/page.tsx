"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Users, Plus, Search, Copy, Share2, Check, Settings, X, Calendar, Clock
} from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<any | null>(null);
  
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

  const fichasFiltradas = fichasExemplo.filter(ficha => 
    ficha.paciente.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ficha.procedimento.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const obterSaudacao = () => {
    if (!perfil.nome || perfil.nome === "Anamnese Digital") {
      return "Bem-vindo(a)!";
    }
    const primeiroNome = perfil.nome.split(' ')[0];
    return `Bem-vindo(a), ${primeiroNome}!`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col md:flex-row">
      
      {{/* BARRA LATERAL / TOPO MOBILE */}}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 px-4 py-4 md:py-6 md:fixed md:inset-y-0 md:z-20 flex md:flex-col justify-between md:justify-start items-center md:items-stretch gap-4 shrink-0">
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
            {perfil.foto ? <img src={perfil.foto} className="h-full w-full object-cover" alt="Perfil" /> : <FileText className="text-blue-600 h-5 w-5" />}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-900 truncate max-w-[120px] md:max-w-none">{perfil.nome}</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight truncate">{perfil.nicho}</span>
          </div>
        </div>
        
        {{/* Menu Desktop */}}
        <nav className="hidden md:flex flex-col mt-8 flex-1 space-y-1">
          <a href="#" className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-xs font-bold text-blue-600"><LayoutDashboard className="h-4 w-4" /> Início</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 hover:bg-slate-50"><FileText className="h-4 w-4" /> Fichas</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 hover:bg-slate-50"><Users className="h-4 w-4" /> Pacientes</a>
          <a href="/dashboard/configuracoes" className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 hover:bg-slate-50"><Settings className="h-4 w-4" /> Ajustes</a>
        </nav>

        {{/* Botão de Ajustes simplificado para Mobile à direita */}}
        <div className="md:hidden">
          <a href="/dashboard/configuracoes" className="p-2 text-slate-500 hover:text-slate-800 block">
            <Settings className="h-5 w-5" />
          </a>
        </div>
      </aside>

      {{/* CONTEÚDO PRINCIPAL (Garante o espaçamento da Sidebar no Desktop) */}}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        
        {{/* CABEÇALHO COM BUSCA E BOTÃO ACCORDING */}}
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
          <a href="/dashboard/nova-ficha" className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-3.5 py-2 text-xs font-bold text-white shadow-sm whitespace-nowrap active:scale-95 transition-transform">
            <Plus className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Nova Ficha</span><span className="sm:hidden">Nova</span>
          </a>
        </header>

        {{/* ÁREA INTERNA DA PÁGINA */}}
        <main className="p-4 md:p-8 max-w-5xl w-full mx-auto flex-1">
          
          {{/* SAUDAÇÃO */}}
          <div className="mb-6">
            <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">{obterSaudacao()}</h1>
            <p className="text-[11px] text-slate-400 mt-0.5">Painel central de controle.</p>
          </div>

          {{/* CARD DE ENVIO DE LINK RÁPIDO */}}
          <div className="mb-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/60 to-indigo-50/30 p-4 md:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-white border border-blue-100 flex items-center justify-center shrink-0 shadow-xs">
                  <Share2 className="text-blue-500 h-4 w-4" />
               </div>
               <div>
                  <h3 className="text-xs font-bold text-slate-900 tracking-tight">Enviar Link de Anamnese</h3>
                  <p className="text-[10px] text-slate-500">O paciente preenche direto do celular.</p>
               </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button onClick={copiarLink} className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-xs">
                {copiado ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />} {copiado ? "Copiado!" : "Copiar"}
              </button>
              <a href={`https://wa.me/?text=${MENSAGEM_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-all">
                <Share2 className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
          </div>

          {{/* TABELA / LISTAGEM DE PACIENTES */}}
          <div className="rounded-2xl border border-slate-200/70 bg-white shadow-xs overflow-hidden">
            
            {{/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-3.5">Paciente</th>
                    <th className="px-6 py-3.5">Procedimento</th>
                    <th className="px-6 py-3.5">Data</th>
                    <th className="px-6 py-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fichasFiltradas.map((ficha) => (
                    <tr key={ficha.id} onClick={() => setPacienteSelecionado(ficha)} className="hover:bg-slate-50/50 cursor-pointer transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{ficha.paciente}</td>
                      <td className="px-6 py-4 text-slate-500">{ficha.procedimento}</td>
                      <td className="px-6 py-4 text-slate-400">{ficha.data}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg font-bold text-[9px] uppercase border border-emerald-100">✓ {ficha.status}</span>
                      </td>
                    </tr>
                  ))}
                  {fichasFiltradas.length === 0 && (
                    <tr><td colSpan={4} className="text-center py-8 text-slate-400">Nenhuma ficha ativa encontrada.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {{/* Mobile */}
            <div className="block md:hidden divide-y divide-slate-100">
              {fichasFiltradas.map((ficha) => (
                <div key={ficha.id} onClick={() => setPacienteSelecionado(ficha)} className="p-4 active:bg-slate-50 flex items-center justify-between gap-4 cursor-pointer">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-xs font-bold text-slate-900 truncate">{ficha.paciente}</span>
                    <span className="text-[11px] text-slate-500 truncate">{ficha.procedimento}</span>
                    <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> {ficha.data}</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-bold text-[9px] uppercase border border-emerald-100 shrink-0">✓ {ficha.status}</span>
                </div>
              ))}
              {fichasFiltradas.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">Nenhuma ficha ativa encontrada.</div>
              )}
            </div>
          </div>
        </main>
      </div>

      {{/* LINHA DO TEMPO / MODAL DE EVOLUÇÃO (RESPONSIVO) */}}
      {pacienteSelecionado && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs animate-fade-in" onClick={() => setPacienteSelecionado(null)} />
          
          <div className="relative w-full md:max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] md:max-h-[75vh] z-10 transition-transform">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{pacienteSelecionado.paciente}</h3>
                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-tight mt-0.5">{pacienteSelecionado.procedimento}</p>
              </div>
              <button onClick={() => setPacienteSelecionado(null)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Histórico de Evolução</span>
              </div>

              <div className="relative border-l-2 border-blue-100 pl-4 ml-2 space-y-4">
                {pacienteSelecionado.historico?.map((evento: any, idx: number) => (
                  <div key={idx} className="relative">
                    <span className={`absolute -left-[21px] top-1 h-2 w-2 rounded-full border-2 bg-white ${idx === 0 ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-300'}`} />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {evento.data}
                      </span>
                      <p className="text-xs text-slate-600 font-medium mt-0.5 bg-slate-50 p-2 rounded-xl border border-slate-100 leading-relaxed">
                        {evento.evento}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 grid grid-cols-2 gap-2">
              <button onClick={() => alert('Abrir ficha')} className="w-full text-center py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                Ver Completa
              </button>
              <a href={`https://wa.me/?text=${encodeURIComponent(`Olá ${pacienteSelecionado.paciente}, passando para acompanhar o pós-procedimento!`)}`} target="_blank" rel="noopener noreferrer" className="w-full text-center py-2 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
                Contatar
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
