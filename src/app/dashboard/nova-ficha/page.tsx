"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Scissors, Phone, FilePlus, AlertCircle } from "lucide-react";
// LINHA CORRIGIDA: Agora usando o alias oficial do projeto
import { supabase } from "@/supabaseClient";

export default function NovaFichaPage() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const [cliente, setCliente] = useState("");
  const [procedimento, setProcedimento] = useState("");
  const [telefone, setTeleflow] = useState("");

  const criarFicha = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cliente || !procedimento) {
      setErro("Por favor, preencha o nome do cliente e o procedimento.");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      const novaFicha = {
        cliente,
        procedimento,
        telefone,
        status: "Pendente",
        data: new Date().toLocaleDateString("pt-BR"),
      };

      const { error } = await supabase.from("cadastros").insert([novaFicha]);

      if (error) {
        setErro("Erro ao salvar no Supabase: " + error.message);
      } else {
        // Sucesso: Volta para a dashboard onde a nova linha já vai aparecer
        router.push("/dashboard");
      }
    } catch (err) {
      setErro("Erro inesperado ao criar a ficha.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans p-4 md:p-8">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* VOLTAR */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-all">
            <ArrowLeft className="h-4 w-4" /> Voltar ao Painel
          </Link>
        </div>

        {/* CARD PRINCIPAL */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-2xl">
              <FilePlus className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Iniciar Nova Triagem</h1>
              <p className="text-xs text-slate-400 mt-0.5">Gere um novo registro de anamnese para sua cliente</p>
            </div>
          </div>

          <form onSubmit={criarFicha} className="p-6 space-y-5">
            {erro && (
              <div className="flex items-start gap-3 bg-red-50 text-red-700 rounded-2xl p-4">
                <AlertCircle className="h-5 w-5 mt-0.5" /> <span className="text-sm">{erro}</span>
              </div>
            )}

            {/* NOME DO CLIENTE */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Nome da Cliente</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ex: Maria Silva"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* PROCEDIMENTO */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Procedimento / Serviço</label>
              <div className="relative">
                <Scissors className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ex: Extensão de Cílios, Designer..."
                  value={procedimento}
                  onChange={(e) => setProcedimento(e.target.value)}
                  className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* TELEFONE */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">WhatsApp / Telefone (Opcional)</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  placeholder="Ex: 71 99999-9999"
                  value={telefone}
                  onChange={(e) => setTeleflow(e.target.value)}
                  className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* BOTÃO SUBMIT */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={carregando}
                className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold disabled:bg-slate-300 transition-all"
              >
                {carregando ? "Gerando Ficha..." : "Gerar e Ir para o Painel"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
