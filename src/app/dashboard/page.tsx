"use client";

import React from 'react';
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
  ChevronRight 
} from 'lucide-react';

export default function DashboardPage() {
  // Dados fictícios para ilustrar o esqueleto das fichas
  const fichasRecentes = [
    { id: 1, paciente: "Mariana Silva", procedimento: "Toxina Botulínica", data: "18/05/2026", status: "Assinado" },
    { id: 2, paciente: "Carlos Eduardo", procedimento: "Preenchimento Labial", data: "18/05/2026", status: "Pendente" },
    { id: 3, paciente: "Beatriz Costa", procedimento: "Peeling Químico", data: "17/05/2026", status: "Assinado" },
    { id: 4, paciente: "Ana Júlia Santos", procedimento: "Bioestimulador de Colágeno", data: "16/05/2026", status: "Assinado" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased">
      
      {/* 1. MENU LATERAL (SIDEBAR) */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-slate-200 bg-white px-4 py-6">
        {/* Identidade do SaaS */}
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Anamnese Digital
          </span>
        </div>

        {/* Links de Navegação */}
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

        {/* Rodapé do Menu (Perfil/Sair) */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
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

      {/* 2. ÁREA CENTRAL (CONTEÚDO PRINCIPAL) */}
      <div className="flex-1 pl-64">
        
        {/* HEADER DA ÁREA CENTRAL */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-8 backdrop-blur-md">
          {/* Barra de Pesquisa */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar paciente ou ficha..." 
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs outline-none transition-all focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Ações da Direita */}
          <div className="flex items-center gap-4">
            <button className="relative rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-blue-600"></span>
            </button>
            
            <button className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-500/10 transition-all hover:opacity-95">
              <Plus className="h-4 w-4" />
              Nova Ficha
            </button>
          </div>
        </header>

        {/* PAINEL DE CONTEÚDO */}
        <main className="p-8">
          
          {/* Boas-Vindas e Título */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Painel de Controle</h1>
            <p className="text-xs text-slate-500 mt-1">Gerencie os termos de consentimento e históricos clínicos.</p>
          </div>

          {/* CARDS DE MÉTRICAS RÁPIDAS */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-slate-500">Total de Fichas</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">148</span>
                <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">+12 este mês</span>
              </div>
            </div>
            
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-slate-500">Assinaturas Pendentes</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">3</span>
                <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">Ações requeridas</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="text-xs font-medium text-slate-500">Pacientes Ativos</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">124</span>
                <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">Histórico salvo</span>
              </div>
            </div>
          </div>

          {/* TABELA DE FICHAS ONDE ELAS VÃO MORAR */}
          <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Últimas Fichas Movimentadas</h2>
              <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
                Ver todas <ChevronRight className="h-3 w-3" />
              </a>
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
                  {fichasRecentes.map((ficha) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}
