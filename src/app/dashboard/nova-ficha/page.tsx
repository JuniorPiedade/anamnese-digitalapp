"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Eye,
  Sparkles,
  Droplet,
  Syringe,
  FileText,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { supabase } from "../../../supabaseClient";

type ServicoTipo = "lash" | "make" | "pele" | "botox" | "";

export default function NovaFichaPage() {
  const router = useRouter();

  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servicoSelecionado, setServicoSelecionado] = useState<ServicoTipo>("");
  const [alergiasTriagem, setAlergiasTriagem] = useState("");
  const [observacoesTriagem, setObservacoesTriagem] = useState("");

  const [sucesso, setSucesso] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [linkGerado, setLinkGerado] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const formatarProcedimentoNome = (id: ServicoTipo) => {
    const nomes = {
      lash: "Lash Designer",
      make: "Maquiagem",
      pele: "Limpeza de Pele",
      botox: "Botox / Injetáveis",
    };
    return nomes[id as keyof typeof nomes] || id;
  };

  const limparFormulario = () => {
    setCliente("");
    setTelefone("");
    setServicoSelecionado("");
    setAlergiasTriagem("");
    setObservacoesTriagem("");
    setErro("");
  };

  const gerarEEnviarFicha = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro("");

    if (!cliente.trim() || !telefone.trim() || !servicoSelecionado) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setCarregando(true);

    let telefoneLimpo = telefone.replace(/\D/g, "");
    telefoneLimpo = telefoneLimpo.replace(/^55/, "");
    if (telefoneLimpo.length === 11) {
      telefoneLimpo = `55${telefoneLimpo}`;
    }

    // Criando o código identificador único da ficha
    const novaFichaId = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

    // Organizando os dados para as colunas exatas da tabela do Supabase
    const novaFicha = {
      id: novaFichaId,
      cliente: cliente.trim(), 
      procedimento: formatarProcedimentoNome(servicoSelecionado),
      data: "Hoje, " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      status: "Pendente",
      telefone: telefoneLimpo,
      alergias: allergiesTriagem.trim() || "Nenhuma alergia relatada na triagem inicial",
      observacoes: observacoesTriagem.trim() || "Nenhuma observação adicional",
    };

    try {
      // Salva o cadastro inicial pendente no Supabase
      const { error } = await supabase.from("cadastros").insert([novaFicha]);

      if (error) {
        setErro("Erro ao salvar no banco de dados: " + error.message);
        setCarregando(false);
        return;
      }

      // Cria o link que o cliente vai usar para responder a anamnese
      const linkFichaCliente = `${baseUrl}/anamnese/cliente?id=${novaFichaId}`;
      setLinkGerado(linkFichaCliente);
      
      // Ativa a tela de sucesso direto no sistema, sem abrir o WhatsApp
      setSucesso(true);
    } catch (err) {
      setErro("Erro inesperado ao processar o formulário.");
    } finally {
      setCarregando(false);
    }
  };

  if (sucesso) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-800 antialiased font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm space-y-6">
          <div className="h-16 w-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Ficha Criada no Sistema!</h2>
            <p className="text-sm text-slate-500 mt-2">
              O cadastro de <strong>{cliente}</strong> já foi gerado e aparecerá na sua dashboard.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-left space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Link para o Cliente responder:</span>
            <input 
              readOnly 
              type="text" 
              value={linkGerado} 
              onClick={(e) => (e.target as HTMLInputElement).select()}
              className="w-full text-xs bg-white border border-slate-200 p-2.5 rounded-xl text-blue-600 font-mono outline-none cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">Clique no link acima para copiar e enviar para o cliente como preferir.</p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button onClick={() => router.push("/dashboard")} className="w-full bg-slate-900 text-white text-sm font-semibold py-3 rounded-2xl hover:bg-slate-800 transition-all">
              Ir para o Dashboard
            </button>
            <button onClick={() => { setSucesso(false); limparFormulario(); }} className="w-full bg-white border border-slate-200 text-slate-700 text-sm font-semibold py-3 rounded-2xl hover:bg-slate-50 transition-all">
              Criar Outra Ficha
            </button>
          </div>
        </div>
      </div>
    );
  }

  const procedimentos = [
    { id: "lash", nome: "Lash Designer", icon: Eye },
    { id: "make", nome: "Maquiagem", icon: Sparkles },
    { id: "pele", nome: "Limpeza de Pele", icon: Droplet },
    { id: "botox", nome: "Botox / Injetáveis", icon: Syringe },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-5">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800">
          <ArrowLeft className="h-4 w-4" /> Voltar ao Painel
        </Link>
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="border-b border-slate-100 p-6 bg-slate-50/60">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center"><FileText className="h-5 w-5" /></div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">Nova Ficha de Anamnese</h1>
                <p className="text-sm text-slate-500 mt-1">Preencha os dados iniciais para abrir o cadastro do paciente.</p>
              </div>
            </div>
          </div>
          <form onSubmit={gerarEEnviarFicha} className="p-6 space-y-6">
            {erro && (
              <div className="flex items-start gap-3 bg-red-50 text-red-700 rounded-2xl p-4">
                <AlertCircle className="h-5 w-5 mt-0.5" /> <span className="text-sm">{erro}</span>
              </div>
            )}
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Nome do Paciente</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input required type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Ex: Amanda Bezerra" className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">WhatsApp do Paciente</label>
                <input required type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="71999999999" className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700">Procedimento Agendado</label>
              <div className="grid grid-cols-2 gap-3">
                {procedimentos.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.id} type="button" onClick={() => setServicoSelecionado(item.id as ServicoTipo)} className={`rounded-2xl border p-4 text-left transition-all ${servicoSelecionado === item.id ? "bg-slate-900 text-white shadow-md border-slate-900" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
                      <div className="flex items-center gap-2"><Icon className="h-4 w-4" /> <span className="text-sm font-semibold">{item.nome}</span></div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="space-y-5 border-t border-slate-100 pt-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Alergias Relatadas (Opcional)</label>
                <input type="text" value={alergiasTriagem} onChange={(e) => setAlergiasTriagem(e.target.value)} placeholder="Ex: Dipirona, látex..." className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Observações Iniciais (Opcional)</label>
                <textarea rows={4} value={observacoesTriagem} onChange={(e) => setObservacoesTriagem(e.target.value)} placeholder="Informações importantes..." className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none resize-none focus:border-blue-500" />
              </div>
            </div>
            <button type="submit" disabled={carregando} className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold disabled:bg-slate-300">
              {carregando ? "Salvando Cadastro..." : "Criar Cadastro na Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
