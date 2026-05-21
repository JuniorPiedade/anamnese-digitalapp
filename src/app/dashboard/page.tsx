"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, FileText, Settings, Plus, Search, Filter, CheckCircle2, Clock, Share2
} from 'lucide-react';

export default function DashboardPage() {
  const [busca, setBusca] = useState("");
  const [nomeNegocio, setNomeNegocio] = useState("Meu Negócio");
  const [nicho, setNicho] = useState("Estética");
  const [baseUrl, setBaseUrl] = useState("");

  // Captura a URL atual do projeto para gerar o link correto do cliente
  useEffect(() => {
    const savedNome = localStorage.getItem('anamnese_nomeNegocio');
    const savedNicho = localStorage.getItem('anamnese_nicho');
    if (savedNome) setNomeNegocio(savedNome);
    if (savedNicho) setNicho(savedNicho);
    
    // Define a URL base (ex: https://seu-app.vercel.app)
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  // Dados com os respectivos WhatsApps para simular o disparo real
  const ultimasFichas = [
    { id: 1, cliente: "Mariana Silva", procedimento: "Lash Designer", data: "Hoje, 09:30", status: "Concluída", telefone: "5571999999999" },
    { id: 2, cliente: "Beatriz Costa", procedimento: "Limpeza de Pele", data: "Ontem, 16:15", status: "Concluída", telefone: "5571999999999" },
    { id: 3, cliente: "Juliana Tavares", procedimento: "Botox / Injetáveis", data: "20 Mai, 14:00", status: "Concluída", telefone: "5571999999999" },
    { id: 4, cliente: "Fernanda Ribeiro", procedimento: "Maquiagem", data: "19 Mai, 11:30", status: "Pendente", telefone: "5571999999999" },
  ];

  // Função cirúrgica que monta a mensagem e abre o WhatsApp
  const enviarLinkWhatsapp = (clienteNome: string, telefone: string) => {
    const linkFicha = `${baseUrl}/anamnese/cliente`;
    
    const textoMensagem = `Olá, ${clienteNome}! ✨\n\nPara realizarmos o seu procedimento com total segurança, preciso que preencha a sua *Ficha de Anamnese Digital* antes do nosso atendimento.\n\nPor favor, acesse o link abaixo para responder e assinar:\n👉 ${linkFicha}\n\nMuito obrigada! ❤️`;
    
    const urlMensagemUrlEncoded = encodeURIComponent(textoMensagem);
    const linkWhatsapp = `https://api.whatsapp.com/send?phone=${telefone}&text=${urlMensagemUrlEncoded}`;
    
    window.open(linkWhatsapp, '_blank');
  };

  const fichasFiltradas = ultimasFichas.filter(ficha => 
    ficha.cliente.toLowerCase().includes(busca.toLowerCase()) ||
    ficha.procedimento.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR ESQUERDA */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 px-4 py-4 md:py-6 md:fixed md:inset-y-0 md:z-20 flex md:flex-col justify-between md:justify-start items-center md:items-stretch gap-4">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
            <FileText className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent leading-none">Anamnese Digital</span>
            <span className="text-[10px] text-slate-400 mt-0.5 font-medium">Painel Profissional</span>
          </div>
        </div>
        
        <nav className="hidden md:flex flex-col mt-10 flex-1 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600">
            <LayoutDashboard className="h-4 w-4" /> Início
          </Link>
          <Link href="/dashboard/nova-ficha" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <FileText className="h-4 w-4" /> Nova Ficha
          </Link>
          <Link href="/dashboard/configuracoes" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Settings className="h-4 w-4" /> Configurações
          </Link>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 md:pl-64 flex flex-col">
        <main className="p-4 md:p-8 max-w-4xl w-full mx-auto space-y-8">
          
          {/* HEADER DE BOAS-VINDAS */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Olá, {nomeNegocio}</h1>
              <p className="text-xs text-slate-500 mt-0.5">Nicho atual definido: <span className="font-semibold text-slate-700">{nicho}</span></p>
            </div>
            <Link href="/dashboard/nova-ficha" className="flex items-center justify-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm hover:bg-blue-700 active:scale-95 transition-all w-full sm:w-auto">
              <Plus className="h-4 w-4" /> Criar Ficha
            </Link>
          </div>

          {/* CARDS DE ESTATÍSTICAS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total de Fichas</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">48</span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md">+12%mês</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pacientes Ativos</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">36</span>
                <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded-md">Histórico total</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm col-span-2 md:col-span-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Taxa de Conclusão</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">94%</span>
                <span className="text-[10px] text-slate-500 font-medium">Fichas assinadas</span>
              </div>
            </div>
          </div>

          {/* SEÇÃO DE BUSCA E LISTAGEM */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
            
            {/* BARRA DE FILTROS & BUSCA */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-3 bg-slate-50/40">
              <div className="relative w-full flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar ficha por nome do cliente ou procedimento..." 
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>
              <button className="flex items-center gap-1.5 border border-slate-200 bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all w-full sm:w-auto justify-center">
                <Filter className="h-3.5 w-3.5" /> Filtrar
              </button>
            </div>

            {/* LISTA DE FICHAS COM DISPARO DE LINK */}
            <div className="divide-y divide-slate-100">
              {fichasFiltradas.length > 0 ? (
                fichasFiltradas.map((ficha) => (
                  <div key={ficha.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/60 transition-all group">
                    <div className="flex items-center gap-3.5">
                      <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{ficha.cliente}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-slate-500 font-medium">{ficha.procedimento}</span>
                          <span className="text-[10px] text-slate-300">•</span>
                          <span className="text-[11px] text-slate-400">{ficha.data}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                        ficha.status === 'Concluída' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {ficha.status === 'Concluída' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {ficha.status}
                      </span>
                      
                      {/* BOTÃO PREMIUM DE ENVIAR LINK VIA WHATSAPP */}
                      <button 
                        onClick={() => enviarLinkWhatsapp(ficha.cliente, ficha.telefone)}
                        title="Enviar ficha via WhatsApp"
                        className="flex items-center gap-1.5 border border-slate-200 hover:border-emerald-200 bg-white hover:bg-emerald-50 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-600 hover:text-emerald-700 transition-all"
                      >
                        <Share2 className="h-3 w-3" />
                        <span className="hidden sm:inline">Enviar Link</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Nenhuma ficha encontrada para "{busca}"
                </div>
              )}
            </div>
            
          </div>

        </main>
      </div>
    </div>
  );
}
