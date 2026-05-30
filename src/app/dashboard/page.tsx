"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Share2,
  X,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
// Import ajustado para a nova estratégia centralizada em src/app
import { supabase } from "./supabaseClient";

export const dynamic = "force-dynamic";

type StatusFicha = "Pendente" | "Verificado" | "Concluída";

type Ficha = {
  id: string;
  cliente: string;
  procedimento: string;
  data: string;
  status: StatusFicha;
  telefone: string;
  alergias?: string;
  observacoes?: string;
};

export default function DashboardPage() {
  const [busca, setBusca] = useState("");
  const [nomeNegocio, setNomeNegocio] = useState("Meu Negócio");
  const [nicho, setNicho] = useState("Estética");
  const [baseUrl, setBaseUrl] = useState("");
  const [fichas, setFichas] = useState<Ficha[]>([]);
  const [fichaSelecionada, setFichaSelecionada] = useState<Ficha | null>(null);
  const [carregando, setCarregando] = useState(true);

  // CARREGA DADOS DO SUPABASE E CONFIGURAÇÕES
  const buscarFichasDoSupabase = async () => {
    try {
      setCarregando(true);
      const { data, error } = await supabase
        .from("cadastros")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar dados do Supabase:", error.message);
        return;
      }

      if (data) {
        const fichasFormatadas: Ficha[] = data.map((item: any) => ({
          id: item.id,
          cliente: item.cliente,
          procedimento: item.procedimento,
          data: item.data || "Recentemente",
          status: (item.status as StatusFicha) || "Pendente",
          telefone: item.telefone || "",
          alergias: item.alergias,
          observacoes: item.observacoes,
        }));
        setFichas(fichasFormatadas);
      }
    } catch (err) {
      console.error("Erro inesperado na busca de dados:", err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const savedNome = localStorage.getItem("anamnese_nomeNegocio");
    const savedNicho = localStorage.getItem("anamnese_nicho");
    if (savedNome) setNomeNegocio(savedNome);
    if (savedNicho) setNicho(savedNicho);

    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }

    buscarFichasDoSupabase();
  }, []);

  // ATUALIZAÇÃO EM TEMPO REAL
  useEffect(() => {
    const canalRealtime = supabase
      .channel("mudancas-cadastros")
      .on(
        "postgres_changes",
        { event: "*", scheme: "public", table: "cadastros" },
        () => {
          buscarFichasDoSupabase();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canalRealtime);
    };
  }, []);

  // FILTRO DE BUSCA
  const fichasFiltradas = useMemo(() => {
    return fichas.filter(
      (ficha) =>
        ficha.cliente?.toLowerCase().includes(busca.toLowerCase()) ||
        ficha.procedimento?.toLowerCase().includes(busca.toLowerCase())
    );
  }, [fichas, busca]);

  const copiarLinkCliente = (e: React.MouseEvent, idFicha: string) => {
    e.stopPropagation();
    const linkFicha = `${baseUrl}/anamnese/cliente?id=${idFicha}`;
    
    navigator.clipboard.writeText(linkFicha).then(() => {
      alert("Link da ficha copiado com sucesso! Você pode enviar para o cliente.");
    }).catch(() => {
      alert("Link: " + linkFicha);
    });
  };

  const totalPendentes = fichas.filter((f) => f.status === "Pendente").length;
  const totalConfirmadas = fichas.filter((f) => f.status === "Verificado" || f.status === "Concluída").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 px-4 py-4 md:py-6 md:fixed md:inset-y-0 md:z-20 flex md:flex-col justify-between md:justify-start items-center md:items-stretch gap-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            {/* Nome corrigido aqui para Anamnese Digital */}
            <span className="text-sm font-bold text-slate-900 block">Anamnese Digital</span>
            <span className="text-[11px] text-slate-400">Painel de Controle</span>
          </div>
        </div>

        <nav className="hidden md:flex flex-col mt-10 flex-1 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/dashboard/nova-ficha" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <FileText className="h-4 w-4" /> Nova Ficha
          </Link>
          <Link href="/dashboard/configuracoes" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Settings className="h-4 w-4" /> Configurações
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:pl-64">
        <main className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
          {/* HEADER */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Olá, {nomeNegocio}</h1>
              <p className="text-sm text-slate-500 mt-1">Nicho: <span className="font-semibold text-slate-700">{nicho}</span></p>
            </div>
            <Link href="/dashboard/nova-ficha" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-3 rounded-2xl transition-all">
              <Plus className="h-4 w-4" /> Criar Nova Ficha
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Pacientes</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-3">{fichas.length}</h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Aguardando Resposta</span>
              <h2 className="text-3xl font-bold text-amber-600 mt-3">{totalPendentes}</h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Fichas Respondidas</span>
              <h2 className="text-3xl font-bold text-emerald-600 mt-3">{totalConfirmadas}</h2>
            </div>
          </div>

          {/* LISTA DE REGISTROS */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por cliente ou procedimento..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full h-12 rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {carregando ? (
                <div className="p-10 text-center text-sm text-slate-400">Buscando cadastros no Supabase...</div>
              ) : fichasFiltradas.length > 0 ? (
                fichasFiltradas.map((ficha) => (
                  <div
                    key={ficha.id}
                    onClick={() => setFichaSelecionada(ficha)}
                    className="p-5 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{ficha.cliente}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">{ficha.procedimento}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-400">{ficha.data}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-semibold px-3 py-1 rounded-xl border flex items-center gap-1.5 ${
                          ficha.status === "Verificado" || ficha.status === "Concluída"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}
                      >
                        {ficha.status === "Verificado" || ficha.status === "Concluída" ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <Clock className="h-3.5 w-3.5" />
                        )}
                        {ficha.status}
                      </span>

                      <button
                        onClick={(e) => copiarLinkCliente(e, ficha.id)}
                        className="hidden sm:flex items-center gap-2 border border-slate-200 hover:border-blue-200 bg-white hover:bg-blue-50 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-blue-700 transition-all"
                      >
                        <Share2 className="h-3.5 w-3.5" /> Copiar Link
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center">
                  <p className="text-sm text-slate-400 font-medium">Nenhum cadastro encontrado na sua conta do Supabase.</p>
                </div>
