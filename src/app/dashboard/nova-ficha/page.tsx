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
// IMPORTAÇÃO CORRIGIDA: Caminho relativo para achar o arquivo na raiz da pasta de código
import { supabase } from "../../../supabaseClient";

type ServicoTipo = "lash" | "make" | "pele" | "botox" | "";

export default function NovaFichaPage() {
  const router = useRouter();

  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servicoSelecionado, setServicoSelecionado] =
    useState<ServicoTipo>("");
  const [alergiasTriagem, setAlergiasTriagem] = useState("");
  const [observacoesTriagem, setObservacoesTriagem] = useState("");

  const [sucesso, setSucesso] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [erro, setErro] = useState("");

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

    if (!cliente.trim()) {
      setErro("Informe o nome do paciente.");
      return;
    }

    if (!telefone.trim()) {
      setErro("Informe o WhatsApp do paciente.");
      return;
    }

    if (!servicoSelecionado) {
      setErro("Selecione o procedimento antes de continuar.");
      return;
    }

    // Limpa o telefone
    let telefoneLimpo = telefone.replace(/\D/g, "");

    // Remove DDI caso já exista
    telefoneLimpo = telefoneLimpo.replace(/^55/, "");

    // Adiciona DDI automaticamente
    if (telefoneLimpo.length === 11) {
      telefoneLimpo = `55${telefoneLimpo}`;
    }

    // Criação segura do ID
    const novaFichaId = crypto.randomUUID();

    // Objeto formatado de acordo com as colunas do seu banco
    const novaFicha = {
      id: novaFichaId,
      nome: cliente.trim(), // Salvando na coluna 'nome' conforme seu Supabase
      procedimento: formatarProcedimentoNome(servicoSelecionado),
      data:
        "Hoje, " +
        new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      status: "Pendente",
      telefone: telefoneLimpo,
      alergias: alergiasTriagem.trim() || "Nenhuma alergia relatada na triagem inicial",
      observacoes: observacoesTriagem.trim() || "Nenhuma observação adicional",
    };

    // Enviando os dados direto para o Supabase (Tabela 'cadastros')
    const { error } = await supabase
      .from("cadastros")
      .insert([novaFicha]);

    if (error) {
      console.error("Erro ao salvar no Supabase:", error);
      setErro("Erro ao salvar no banco de dados: " + error.message);
      return;
    }

    // Link do cliente
    const linkFichaCliente = `${baseUrl}/anamnese/cliente?id=${novaFichaId}`;

    // Mensagem WhatsApp
    const textoMensagem = `Olá, ${cliente}! ✨

Para realizarmos o seu procedimento de *${formatarProcedimentoNome(
      servicoSelecionado
    )}* com total segurança, preciso que revise e preencha sua *Ficha de Anamnese Digital*.

Por favor, acesse o link abaixo para responder e assinar:
👉 ${linkFichaCliente}

Muito obrigada! ❤️`;

    const urlMensagemEncoded = encodeURIComponent(textoMensagem);
    const linkWhatsapp = `https://api.whatsapp.com/send?phone=${telefoneLimpo}&text=${urlMensagemEncoded}`;

    // Abre WhatsApp
    window.open(linkWhatsapp, "_blank");

    // Exibe tela de sucesso
    setSucesso(true);
  };

  if (sucesso) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-800 antialiased font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm space-y-6">
          <div className="h-16 w-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Ficha Gerada com Sucesso
            </h2>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              O link da anamnese foi enviado via WhatsApp para{" "}
              <strong>{cliente}</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-2xl transition-all"
            >
              Ir para Dashboard
            </button>

            <button
              onClick={() => {
                setSucesso(false);
                limparFormulario();
              }}
              className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold py-3 rounded-2xl transition-all"
            >
              Criar Nova Ficha
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
        {/* VOLTAR */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Painel
        </Link>

        {/* CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          {/* HEADER */}
          <div className="border-b border-slate-100 p-6 bg-slate-50/60">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  Nova Ficha de Anamnese
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Preencha os dados iniciais para gerar o link do paciente.
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={gerarEEnviarFicha}
            className="p-6 space-y-6"
          >
            {erro && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 rounded-2xl p-4">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <span className="text-sm">{erro}</span>
              </div>
            )}

            {/* DADOS */}
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Nome do Paciente
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                  <input
                    required
                    type="text"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    placeholder="Ex: Amanda Bezerra"
                    className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  WhatsApp do Paciente
                </label>

                <input
                  required
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="71999999999"
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* PROCEDIMENTOS */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700">
                Procedimento Agendado
              </label>

              <div className="grid grid-cols-2 gap-3">
                {procedimentos.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setServicoSelecionado(item.id as ServicoTipo)
                      }
                      className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                        servicoSelecionado === item.id
                          ? "bg-blue-600 border-blue-600 text-white shadow-md"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />

                        <span className="text-sm font-semibold">
                          {item.nome}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TRIAGEM */}
            <div className="space-y-5 border-t border-slate-100 pt-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Alergias Relatadas (Opcional)
                </label>

                <input
                  type="text"
                  value={alergiasTriagem}
                  onChange={(e) => setAlergiasTriagem(e.target.value)}
                  placeholder="Ex: Dipirona, látex..."
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Observações Iniciais (Opcional)
                </label>

                <textarea
                  rows={4}
                  value={observacoesTriagem}
                  onChange={(e) => setObservacoesTriagem(e.target.value)}
                  placeholder="Informações importantes sobre o paciente..."
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none resize-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all"
            >
              Gerar e Enviar Ficha
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
