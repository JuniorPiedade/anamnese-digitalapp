"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, FileText, Settings, Plus, Search, Filter, CheckCircle2, Clock, Share2, X, ShieldCheck, AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const [busca, setBusca] = useState("");
  const [nomeNegocio, setNomeNegocio] = useState("Meu Negócio");
  const [nicho, setNicho] = useState("Estética");
  const [baseUrl, setBaseUrl] = useState("");
  const [fichas, setFichas] = useState<any[]>([]);
  const [fichaSelecionada, setFichaSelecionada] = useState<any | null>(null);

  useEffect(() => {
    // 1. Carrega dados de configuração da clínica
    const savedNome = localStorage.getItem('anamnese_nomeNegocio');
    const savedNicho = localStorage.getItem('anamnese_nicho');
    if (savedNome) setNomeNegocio(savedNome);
    if (savedNicho) setNicho(savedNicho);
    
    // 2. Define a URL base para geração de links dinâmicos
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }

    // 3. Carrega as Fichas Dinâmicas (Usa mock padrão apenas se o localStorage estiver vazio)
    const fichasExemploPadrao = [
      { id: "1", cliente: "Mariana Silva", procedimento: "Lash Designer", data: "28 Mai, 09:30", status: "Concluída", telefone: "5571999999999", triagemProfissional: { alergias: "Não relatou", observacoes: "Cliente busca efeito bem natural." } },
      { id: "2", cliente: "Beatriz Costa", procedimento: "Limpeza de Pele", data: "27 Mai, 16:15", status: "Verificado", telefone: "5571999999999", triagemProfissional: { alergias: "Alergia a Ácido Salicílico", observacoes: "Evitar produtos com essa base." } },
      { id: "3", cliente: "Juliana Tavares", procedimento: "Botox / Injetáveis", data: "20 Mai, 14:00", status: "Concluída", telefone: "5571999999999", triagemProfissional: { alergias: "Nenhuma", observacoes: "Retorno de 6 meses." } },
      { id: "4", cliente: "Fernanda Ribeiro", procedimento: "Maquiagem", data: "19 Mai, 11:30", status: "Pendente", telefone: "5571999999999", triagemProfissional: { alergias: "Sensibilidade na pálpebra", observacoes: "Usar produtos hipoalergênicos." } },
    ];

    const salvas = localStorage.getItem('anamnese_fichas');
    if (salvas) {
      setFichas(JSON.parse(salvas));
    } else {
      localStorage.setItem('anamnese_fichas', JSON.stringify(fichasExemploPadrao));
      setFichas(fichasExemploPadrao);
    }
  }, []);

  // Função cirúrgica que monta a mensagem e abre o WhatsApp
  const enviarLinkWhatsapp = (e: React.MouseEvent, clienteNome: string, telefone: string, idFicha: string) => {
    e.stopPropagation(); // Evita abrir o modal ao clicar no botão de enviar link
    
    // Passa o ID da ficha na URL para que o sistema saiba quem está respondendo
    const linkFicha = `${baseUrl}/anamnese/cliente?id=${idFicha}`;
    
    const textoMensagem = `Olá, ${clienteNome}! ✨\n\nPara realizarmos o seu procedimento com total segurança, preciso que confira as perguntas gerais da sua *Ficha de Anamnese Digital* antes do nosso atendimento.\n\nPor favor, acesse o link abaixo para revisar e confirmar os seus dados:\n👉 ${linkFicha}\n\nMuito obrigada! ❤️`;
    
    const urlMensagemUrlEncoded = encodeURIComponent(textoMensagem);
    const linkWhatsapp = `https://api.whatsapp.com/send?phone=${telefone}&text=${urlMensagemUrlEncoded}`;
    
    window.open(linkWhatsapp, '_blank');
  };

  // Simulação de Ação do Paciente (Atualiza o status para "Verificado" instantaneamente)
  const simularConfirmacaoPaciente = (id: string) => {
    const fichasAtualizadas = fichas.map(f => {
      if (f.id === id) {
        return { ...f, status: "Verificado" };
      }
      return f;
    });
    setFichas(fichasAtualizadas);
    localStorage.setItem('anamnese_fichas', JSON.stringify(fichasAtualizadas));
    
    // Atualiza o modal aberto na tela com os novos dados
    setFichaSelecionada(fichasAtualizadas.find(f => f.id === id));
  };

  const fichasFiltradas = fichas.filter(ficha => 
    ficha.cliente?.toLowerCase().includes(busca.toLowerCase()) ||
    ficha.procedimento?.toLowerCase().includes(busca.toLowerCase())
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
                <span className="text-2xl font-bold text-slate-900 tracking-tight">{fichas.length}</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Aguardando Cliente</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-amber-600 tracking-tight">
                  {fichas.filter(f => f.status === 'Pendente').length}
                </span>
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm col-span-2 md:col-span-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Confirmadas / Verificadas</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-emerald-600 tracking-tight">
                  {fichas.filter(f => f.status === 'Verificado' || f.status === 'Concluída').length}
                </span>
              </div>
            </div>
          </div>

          {/* SEÇÃO DE BUSCA E LISTAGEM */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
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
            </div>

            {/* LISTA DE FICHAS COM DISPARO DE LINK */}
            <div className="divide-y divide-slate-100">
              {fichasFiltradas.length > 0 ? (
                fichasFiltradas.map((ficha) => (
                  <div 
                    key={ficha.id} 
                    onClick={() => setFichaSelecionada(ficha)}
                    className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/60 cursor-pointer transition-all group"
                  >
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
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 uppercase tracking-tight ${
                        ficha.status === 'Concluída' || ficha.status === 'Verificado'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {ficha.status === 'Concluída' || ficha.status === 'Verificado' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {ficha.status}
                      </span>
                      
                      <button 
                        onClick={(e) => enviarLinkWhatsapp(e, ficha.cliente, ficha.telefone, ficha.id)}
                        title="Enviar link para preenchimento"
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
                  Nenhuma ficha ativa encontrada.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* MODAL DETALHADO DA FICHA + SIMULADOR DO PACIENTE */}
      {fichaSelecionada && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={() => setFichaSelecionada(null)} />
          
          <div className="relative w-full md:max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{fichaSelecionada.cliente}</h3>
                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-tight">{fichaSelecionada.procedimento}</p>
              </div>
              <button onClick={() => setFichaSelecionada(null)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2 text-xs">
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Triagem Clínica Geral</span>
                <p><strong className="text-slate-600">Alergias:</strong> {fichaSelecionada.triagemProfissional?.alergias || "Nenhuma informada"}</p>
                <p><strong className="text-slate-600">Observações:</strong> {fichaSelecionada.triagemProfissional?.observacoes || "Nenhuma informada"}</p>
              </div>

              {/* ÁREA DE TESTE DE FLUXO (SIMULADOR DO CLIENTE) */}
              {fichaSelecionada.status === 'Pendente' ? (
                <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl space-y-2">
                  <div className="flex gap-2 text-amber-800">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <div className="text-[11px]">
                      <p className="font-bold">Aguardando confirmação externa</p>
                      <p className="text-amber-600/90 mt-0.5">O link foi enviado. Clique no botão abaixo para simular que o seu cliente abriu no celular e confirmou tudo.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => simularConfirmacaoPaciente(fichaSelecionada.id)}
                    className="w-full mt-1 flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold py-2 rounded-lg shadow-xs active:scale-[0.98] transition-all"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" /> Simular Confirmação do Paciente
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex gap-2.5 text-emerald-800 text-[11px]">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-bold">Status: Verificado!</p>
                    <p className="text-emerald-600/90 mt-0.5">O paciente já revisou o link enviado pelo WhatsApp e confirmou todas as informações com sucesso.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
