"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Users, Plus, Search, Copy, Share2, Check, Settings, X, Calendar, Clock, AlertCircle, ShieldCheck
} from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<any | null>(null);
  const [fichas, setFichas] = useState<any[]>([]);
  
  const [perfil, setPerfil] = useState({
    nome: "Anamnese Digital",
    nicho: "Gestão Estética",
    foto: ""
  });

  useEffect(() => {
    // 1. Carrega Perfil do Profissional
    const nome = localStorage.getItem('anamnese_nomeNegocio') || "Anamnese Digital";
    const nicho = localStorage.getItem('anamnese_nicho') || "Gestão Estética";
    const foto = localStorage.getItem('anamnese_fotoPerfil') || "";
    setPerfil({ nome, nicho, foto });

    // 2. Carrega Fichas Dinâmicas com os novos status do fluxo de confirmação
    const fichasExemploPadrao = [
      { 
        id: "1", 
        paciente: "Mariana Silva", 
        procedimento: "Toxina Botulínica", 
        data: "19/05/2026", 
        status: "Verificado", // Mudado para refletir a confirmação do paciente
        perguntasGerais: { alergias: "Não", medicacoes: "Nenhuma", historicoCirurgico: "Nenhum" },
        historico: [
          { data: "20/05/2026", evento: "Paciente acessou o link e confirmou as informações da anamnese." },
          { data: "19/05/2026", evento: "Link de anamnese gerado e enviado para o WhatsApp do paciente." },
          { data: "19/05/2026", evento: "Triagem inicial e perguntas gerais preenchidas pelo profissional." }
        ]
      },
      { 
        id: "2", 
        paciente: "Beatriz Costa", 
        procedimento: "Preenchimento Labial", 
        data: "18/05/2026", 
        status: "Pendente",
        perguntasGerais: { alergias: "Histórico de Herpes labial ativa", medicacoes: "Uso eventual de hixizine", historicoCirurgico: "Nenhum" },
        historico: [
          { data: "18/05/2026", evento: "Ficha criada. Aguardando o paciente acessar o link para confirmação." },
          { data: "18/05/2026", evento: "Perguntas gerais preenchidas na clínica pelo profissional." }
        ]
      },
    ];

    const salvas = localStorage.getItem('anamnese_fichas');
    if (salvas) {
      setFichas(JSON.parse(salvas));
    } else {
      localStorage.setItem('anamnese_fichas', JSON.stringify(fichasExemploPadrao));
      setFichas(fichasExemploPadrao);
    }
  }, []);

  // Simulação de ação do Paciente (Para testar o fluxo localmente enquanto o Firebase não assume)
  const simularConfirmacaoPaciente = (id: string) => {
    const fichasAtualizadas = fichas.map(ficha => {
      if (ficha.id === id) {
        const hoje = new Date().toLocaleDateString('pt-BR');
        return {
          ...ficha,
          status: "Verificado",
          historico: [
            { data: hoje, evento: "✓ O paciente acessou o link externo e confirmou os dados com sucesso." },
            ...ficha.historico
          ]
        };
      }
      return ficha;
    });
    setFichas(fichasAtualizadas);
    localStorage.setItem('anamnese_fichas', JSON.stringify(fichasAtualizadas));
    setPacienteSelecionado(fichasAtualizadas.find(f => f.id === id));
  };

  const LINK_ANAMNESE = "https://klinni-ia.vercel.app/anamnese/cliente";
  const MENSAGEM_WHATSAPP = encodeURIComponent(`Olá! Sua ficha de anamnese foi pré-preenchida. Por favor, acesse o link abaixo para conferir as informações e confirmar os dados:\n${LINK_ANAMNESE}`);

  const copiarLink = () => {
    navigator.clipboard.writeText(LINK_ANAMNESE);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const fichasFiltradas = fichas.filter(ficha => 
    ficha.paciente?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ficha.procedimento?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const obterSaudacao = () => {
    if (!perfil.nome || perfil.nome === "Anamnese Digital") return "Bem-vindo(a)!";
    return `Bem-vindo(a), ${perfil.nome.split(' ')[0]}!`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col md:flex-row">
      
      {/* BARRA LATERAL */}
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
        
        <nav className="hidden md:flex flex-col mt-8 flex-1 space-y-1">
          <a href="#" className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-xs font-bold text-blue-600"><LayoutDashboard className="h-4 w-4" /> Início</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 hover:bg-slate-50"><FileText className="h-4 w-4" /> Fichas</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 hover:bg-slate-50"><Users className="h-4 w-4" /> Pacientes</a>
          <a href="/dashboard/configuracoes" className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 hover:bg-slate-50"><Settings className="h-4 w-4" /> Ajustes</a>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
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
            <Plus className="h-3.5 w-3.5" /> <span>Nova Ficha</span>
          </a>
        </header>

        <main className="p-4 md:p-8 max-w-5xl w-full mx-auto flex-1">
          <div className="mb-6">
            <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">{obterSaudacao()}</h1>
            <p className="text-[11px] text-slate-400 mt-0.5">Gerenciamento de fichas estéticas e respostas de links enviados.</p>
          </div>

          {/* CARD LINK RÁPIDO */}
          <div className="mb-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/60 to-indigo-50/30 p-4 md:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-white border border-blue-100 flex items-center justify-center shrink-0 shadow-xs">
                  <Share2 className="text-blue-500 h-4 w-4" />
               </div>
               <div>
                  <h3 className="text-xs font-bold text-slate-900 tracking-tight">Compartilhar Link de Confirmação</h3>
                  <p className="text-[10px] text-slate-500">O cliente clica para validar a triagem preenchida.</p>
               </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button onClick={copiarLink} className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-xs">
                {copiado ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />} {copiado ? "Copiado!" : "Copiar"}
              </button>
              <a href={`https://wa.me/?text=${MENSAGEM_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-all">
                <Share2 className="h-3.5 w-3.5" /> Enviar WhatsApp
              </a>
            </div>
          </div>

          {/* LISTAGEM DE PACIENTES */}
          <div className="rounded-2xl border border-slate-200/70 bg-white shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-3.5">Paciente</th>
                    <th className="px-6 py-3.5">Procedimento</th>
                    <th className="px-6 py-3.5">Data</th>
                    <th className="px-6 py-3.5 text-right">Status do Vínculo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fichasFiltradas.map((ficha) => (
                    <tr key={ficha.id} onClick={() => setPacienteSelecionado(ficha)} className="hover:bg-slate-50/50 cursor-pointer transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{ficha.paciente}</td>
                      <td className="px-6 py-4 text-slate-500">{ficha.procedimento}</td>
                      <td className="px-6 py-4 text-slate-400">{ficha.data}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`px-2.5 py-1 rounded-lg font-bold text-[9px] uppercase border inline-flex items-center gap-1 ${
                          ficha.status === 'Verificado' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {ficha.status === 'Verificado' ? (
                            <><ShieldCheck className="h-3 w-3" /> Verificado</>
                          ) : (
                            <><AlertCircle className="h-3 w-3" /> Pendente</>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL DE HISTÓRICO E DETALHES */}
      {pacienteSelecionado && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setPacienteSelecionado(null)} />
          
          <div className="relative w-full md:max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] md:max-h-[75vh] z-10">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{pacienteSelecionado.paciente}</h3>
                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-tight mt-0.5">{pacienteSelecionado.procedimento}</p>
              </div>
              <button onClick={() => setPacienteSelecionado(null)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {/* Respostas da Triagem interna */}
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-[11px] space-y-1">
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider mb-1">Dados da Triagem Inicial</span>
                <p><strong className="text-slate-600">Alergias:</strong> {pacienteSelecionado.perguntasGerais?.alergias || "Não informado"}</p>
                <p><strong className="text-slate-600">Uso de medicações:</strong> {pacienteSelecionado.perguntasGerais?.medicacoes || "Não informado"}</p>
              </div>

              {/* Botão de Simulação enquanto desenvolve o Backend */}
              {pacienteSelecionado.status === 'Pendente' && (
                <button 
                  onClick={() => simularConfirmacaoPaciente(pacienteSelecionado.id)}
                  className="w-full text-center py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 transition-all flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="h-3.5 w-3.5" /> Simular Confirmação do Cliente (Dev)
                </button>
              )}

              <div className="relative border-l-2 border-blue-100 pl-4 ml-2 space-y-4">
                {pacienteSelecionado.historico?.map((evento: any, idx: number) => (
                  <div key={idx} className="relative">
                    <span className={`absolute -left-[21px] top-1 h-2 w-2 rounded-full border-2 bg-white ${idx === 0 ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-300'}`} />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1"><Clock className="h-3 w-3" /> {evento.data}</span>
                      <p className="text-xs text-slate-600 font-medium mt-0.5 p-2 bg-slate-50/50 rounded-lg border border-slate-100">{evento.evento}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
