"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Bell, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  X
} from 'lucide-react';

// Tipagem para garantir a segurança dos dados no TypeScript
interface Ficha {
  id: number;
  paciente: string;
  procedimento: string;
  data: string;
  status: "Assinado" | "Pendente";
}

export default function DashboardPage() {
  // 1. ESTADO DOS DADOS: Transforma a lista estática em uma lista viva na memória
  const [fichas, setFichas] = useState<Ficha[]>([
    { id: 1, paciente: "Mariana Silva", procedimento: "Toxina Botulínica", data: "18/05/2026", status: "Assinado" },
    { id: 2, paciente: "Carlos Eduardo", procedimento: "Preenchimento Labial", data: "18/05/2026", status: "Pendente" },
    { id: 3, paciente: "Beatriz Costa", procedimento: "Peeling Químico", data: "17/05/2026", status: "Assinado" },
    { id: 4, paciente: "Ana Júlia Santos", procedimento: "Bioestimulador de Colágeno", data: "16/05/2026", status: "Assinado" },
  ]);

  // 2. ESTADOS DE CONTROLE: Busca e Modal
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nomeInput, setNomeInput] = useState("");
  const [procedimentoInput, setProcedimentoInput] = useState("");

  // 3. LÓGICA: Filtragem em tempo real pela barra de pesquisa
  const fichasFiltradas = fichas.filter(ficha => 
    ficha.paciente.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ficha.procedimento.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 4. LÓGICA: Adicionar nova ficha dinamicamente
  const handleCriarFicha = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeInput.trim() || !procedimentoInput.trim()) return;

    const novaFicha: Ficha = {
      id: Date.now(), // Gera um ID único baseado no tempo
      paciente: nomeInput,
      procedimento: procedimentoInput,
      data: new Date().toLocaleDateString('pt-BR'),
      status: "Pendente"
    };

    setFichas([novaFicha, ...fichas]); // Coloca a nova ficha no topo da lista
    setNomeInput("");
    setProcedimentoInput("");
    setIsModalOpen(false); // Fecha o modal
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased">
      
      {/* MENU LATERAL (SIDEBAR) */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-slate-200 bg-white px-4 py-6">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Anamnese Digital
          </span>
        </div>

        <nav className="mt-10 flex-1 space-y-1">
          <a href="#" className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 transition-colors">
            <LayoutDashboard className="h-4 w-4" />
            Início
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <FileText className="h-4 w-4" />
            Fichas de Anamnese
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <Users className="h-4 w-4" />
            Meus Pacientes
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <Settings className="h-4 w-4" />
            Configurações
          </a>
        </nav>

        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-660 text-xs">
              DR
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-slate-900 truncate">Clínica de Estética</p>
              <p className="text-[10px] text-slate-500 truncate">usuario@email.com</p>
            </div>
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ÁREA CENTRAL */}
      <div className="flex-1 pl-64">
        
        {/* HEADER */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-8 backdrop-blur-md">
          {/* Vínculo do Input com o estado de busca */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar paciente ou procedimento..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs outline-none transition-all focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-blue-600"></span>
            </button>
            
            {/* Clique ativa a abertura do Modal */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/10 transition-all hover:opacity-95"
            >
              <Plus className="h-4 w-4" />
              Nova Ficha
            </button>
          </div>
        </header>

        {/* PAINEL DE CONTEÚDO */}
        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Painel de Controle</h1>
            <p className="text-xs text-slate-500 mt-1">Gerencie os termos de consentimento e históricos clínicos.</p>
          </div>

          {/* CARDS DE MÉTRICAS */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-slate-500">Total de Fichas</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">{fichas.length}</span>
                <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">atualizado</span>
              </div>
            </div>
            
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-slate-500">Assinaturas Pendentes</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">
                  {fichas.filter(f => f.status === "Pendente").length}
                </span>
                <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">Ações requeridas</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-slate-500">Pacientes Ativos</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">{fichas.length}</span>
                <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">Histórico salvo</span>
              </div>
            </div>
          </div>

          {/* TABELA DINÂMICA */}
          <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Últimas Fichas Movimentadas</h2>
              <span className="text-xs text-slate-400">Exibindo {fichasFiltradas.length} resultado(s)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                    <th className="px-6 py-3">Paciente</th>
                    <th className="px-6 py-3">Procedimento</th>
                    <th className="px-6 py-3">Data de Criação</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Ação</th>
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
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            ficha.status === "Assinado" 
                              ? "bg-emerald-50 text-emerald-700" 
                              : "bg-amber-50 text-amber-700"
                          }`}>
                            {ficha.status === "Assinado" ? (
                              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <Clock className="h-3 w-3 text-amber-500" />
                            )}
                            {ficha.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                            Visualizar
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-slate-400 font-medium">
                        Nenhum paciente ou procedimento encontrado para "{searchQuery}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* 5. MODAL INTERATIVO (FORMULÁRIO FLUTUANTE) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900">Iniciar Nova Ficha</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCriarFicha} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  Nome do Paciente
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Amanda Rezende" 
                  value={nomeInput}
                  onChange={(e) => setNomeInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none transition-all focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  Procedimento Estético
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Fios de Sustentação" 
                  value={procedimentoInput}
                  onChange={(e) => setProcedimentoInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none transition-all focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Adicionar à Lista
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
