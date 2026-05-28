"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, Eye, Sparkles, Droplet, Syringe, FileText, ArrowLeft, Send, CheckCircle2
} from 'lucide-react';

export default function NovaFichaPage() {
  const router = useRouter();
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servicoSelecionado, setServicoSelecionado] = useState<"lash" | "make" | "pele" | "botox" | "">("");
  const [alergiasTriagem, setAlergiasTriagem] = useState("");
  const [observacoesTriagem, setObservacoesTriagem] = useState("");
  
  const [sucesso, setSucesso] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  // Captura a URL base para gerar o link correto que o cliente vai acessar
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const formatarProcedimentoNome = (id: string) => {
    const nomes = { lash: "Lash Designer", make: "Maquiagem", pele: "Limpeza de Pele", botox: "Botox / Injetáveis" };
    return nominations[id as keyof typeof nomes] || id;
  };

  const gerarEEnviarFicha = (e: React.FormEvent) => {
    e.preventDefault();

    if (!servicoSelecionado) {
      alert("Por favor, selecione o procedimento antes de gerar o link.");
      return;
    }

    // 1. Limpa o telefone deixando apenas números para a API do WhatsApp (ex: 5571999999999)
    let telefoneLimpo = telefone.replace(/\D/g, "");
    if (telefoneLimpo.length === 11 && !telefoneLimpo.startsWith("55")) {
      telefoneLimpo = "55" + telefoneLimpo;
    }

    // 2. Cria o ID único e o objeto da nova ficha
    const novaFichaId = String(Date.now());
    const novaFicha = {
      id: novaFichaId,
      cliente: cliente,
      procedimento: formatarProcedimentoNome(servicoSelecionado),
      data: "Hoje, " + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: "Pendente",
      telefone: telefoneLimpo || "5571999999999",
      triagemProfissional: {
        alergias: alergiasTriagem || "Nenhuma informada na triagem inicial",
        observacoes: observacoesTriagem || "Nenhuma observação inicial"
      }
    };

    // 3. Salva nativamente no localStorage junto com as outras
    const fichasAtuais = localStorage.getItem('anamnese_fichas');
    let listaAtualizada = [];
    if (fichasAtuais) {
      listaAtualizada = JSON.parse(fichasAtuais);
    }
    listaAtualizada.unshift(novaFicha); // Coloca no topo da lista
    localStorage.setItem('anamnese_fichas', JSON.stringify(listaAtualizada));

    // 4. Monta o link do cliente e dispara o WhatsApp
    const linkFichaCliente = `${baseUrl}/anamnese/cliente?id=${novaFichaId}`;
    const textoMensagem = `Olá, ${cliente}! ✨\n\nPara realizarmos o seu procedimento de *${formatarProcedimentoNome(servicoSelecionado)}* com total segurança, preciso que revise e preencha a sua *Ficha de Anamnese Digital*.\n\nPor favor, acesse o link abaixo para responder e assinar:\n👉 ${linkFichaCliente}\n\nMuito obrigada! ❤️`;
    
    const urlMensagemEncoded = encodeURIComponent(textoMensagem);
    const linkWhatsapp = `https://api.whatsapp.com/send?phone=${telefoneLimpo}&text=${urlMensagemEncoded}`;

    // Abre o WhatsApp em nova aba
    window.open(linkWhatsapp, '_blank');

    // Ativa tela de sucesso interna
    setSucesso(true);
  };

  if (sucesso) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-800 antialiased font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm space-y-5">
          <div className="h-14 w-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Ficha Inicial Gerada!</h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              O link foi gerado e enviado via WhatsApp. A ficha do paciente <strong>{cliente}</strong> já se encontra no seu painel com o status <span className="text-amber-600 font-semibold">Pendente</span>.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button 
              onClick={() => router.push('/dashboard')} 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition-all"
            >
              Ir para o Dashboard
            </button>
            <button 
              onClick={() => {
                setSucesso(false);
                setCliente("");
                setTelefone("");
                setServicoSelecionado("");
                setAlergiasTriagem("");
                setObservacoesTriagem("");
              }} 
              className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold py-2.5 rounded-xl transition-all"
            >
              Gerar outra Ficha
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans py-6 px-4">
      <div className="max-w-md w-full mx-auto space-y-4">
        
        {/* Botão de Voltar */}
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao Painel
        </Link>

        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          {/* Cabeçalho */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" /> Preparar Nova Ficha de Anamnese
            </h1>
            <p className="text-[11px] text-slate-500 mt-0.5">Insira os dados básicos do paciente para disparar o link exclusivo.</p>
          </div>

          <form onSubmit={gerarEEnviarFicha} className="p-5 space-y-5">
            
            {/* DADOS DE CONTATO DO PACIENTE */}
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Nome do Paciente / Cliente</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input 
                    required 
                    type="text" 
                    placeholder="Ex: Amanda Bezerra"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">WhatsApp do Paciente</label>
                <input 
                  required 
                  type="tel" 
                  placeholder="Ex: 71999999999 (Apenas números com DDD)"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* SELEÇÃO DO PROCEDIMENTO */}
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1.5">Procedimento Agendado</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setServicoSelecionado("lash")} className={`p-2.5 rounded-xl border text-left flex items-center gap-1.5 text-[11px] font-semibold transition-all ${servicoSelecionado === 'lash' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}><Eye className="h-3.5 w-3.5" /> Lash Designer</button>
                <button type="button" onClick={() => setServicoSelecionado("make")} className={`p-2.5 rounded-xl border text-left flex items-center gap-1.5 text-[11px] font-semibold transition-all ${servicoSelecionado === 'make' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}><Sparkles className="h-3.5 w-3.5" /> Maquiagem</button>
                <button type="button" onClick={() => setServicoSelecionado("pele")} className={`p-2.5 rounded-xl border text-left flex items-center gap-1.5 text-[11px] font-semibold transition-all ${servicoSelecionado === 'pele' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}><Droplet className="h-3.5 w-3.5" /> Limpeza de Pele</button>
                <button type="button" onClick={() => setServicoSelecionado("botox")} className={`p-2.5 rounded-xl border text-left flex items-center gap-1.5 text-[11px] font-semibold transition-all ${servicoSelecionado === 'botox' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}><Syringe className="h-3.5 w-3.5" /> Botox / Injetáveis</button>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* NOTAS DE TRIAGEM RÁPIDA (OPCIONAL DO PROFISSIONAL) */}
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Alergias Prévias Relatadas (Opcional)</label>
                <input 
                  type="text
