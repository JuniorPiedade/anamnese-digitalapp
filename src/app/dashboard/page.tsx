"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

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

type StatusFicha =
  | "Pendente"
  | "Verificado"
  | "Concluída";

type Ficha = {
  id: string;
  cliente: string;
  procedimento: string;
  data: string;
  status: StatusFicha;
  telefone: string;
  triagemProfissional?: {
    alergias?: string;
    observacoes?: string;
  };
};

export default function DashboardPage() {
  const [busca, setBusca] = useState("");
  const [nomeNegocio, setNomeNegocio] =
    useState("Meu Negócio");
  const [nicho, setNicho] =
    useState("Estética");
  const [baseUrl, setBaseUrl] =
    useState("");

  const [fichas, setFichas] = useState<Ficha[]>(
    []
  );

  const [fichaSelecionada, setFichaSelecionada] =
    useState<Ficha | null>(null);

  // MOCK PADRÃO
  const fichasExemploPadrao: Ficha[] = [
    {
      id: crypto.randomUUID(),
      cliente: "Mariana Silva",
      procedimento: "Lash Designer",
      data: "28 Mai, 09:30",
      status: "Concluída",
      telefone: "5571999999999",
      triagemProfissional: {
        alergias: "Não relatou",
        observacoes:
          "Cliente busca efeito natural.",
      },
    },
    {
      id: crypto.randomUUID(),
      cliente: "Beatriz Costa",
      procedimento: "Limpeza de Pele",
      data: "27 Mai, 16:15",
      status: "Verificado",
      telefone: "5571999999999",
      triagemProfissional: {
        alergias:
          "Alergia a Ácido Salicílico",
        observacoes:
          "Evitar produtos agressivos.",
      },
    },
    {
      id: crypto.randomUUID(),
      cliente: "Fernanda Ribeiro",
      procedimento: "Maquiagem",
      data: "19 Mai, 11:30",
      status: "Pendente",
      telefone: "5571999999999",
      triagemProfissional: {
        alergias:
          "Sensibilidade na pálpebra",
        observacoes:
          "Utilizar produtos hipoalergênicos.",
      },
    },
  ];

  // LOAD INICIAL
  useEffect(() => {
    const savedNome =
      localStorage.getItem(
        "anamnese_nomeNegocio"
      );

    const savedNicho =
      localStorage.getItem(
        "anamnese_nicho"
      );

    if (savedNome)
      setNomeNegocio(savedNome);

    if (savedNicho)
      setNicho(savedNicho);

    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }

    const salvas =
      localStorage.getItem(
        "anamnese_fichas"
      );

    if (salvas) {
      try {
        const parsed = JSON.parse(salvas);
        setFichas(parsed);
      } catch (error) {
        console.error(
          "Erro ao carregar fichas:",
          error
        );

        setFichas(
          fichasExemploPadrao
        );
      }
    } else {
      localStorage.setItem(
        "anamnese_fichas",
        JSON.stringify(
          fichasExemploPadrao
        )
      );

      setFichas(
        fichasExemploPadrao
      );
    }
  }, []);

  // SINCRONIZA ENTRE ABAS
  useEffect(() => {
    const syncFichas = () => {
      const salvas =
        localStorage.getItem(
          "anamnese_fichas"
        );

      if (salvas) {
        try {
          setFichas(
            JSON.parse(salvas)
          );
        } catch {}
      }
    };

    window.addEventListener(
      "storage",
      syncFichas
    );

    return () => {
      window.removeEventListener(
        "storage",
        syncFichas
      );
    };
  }, []);

  // FILTRO OTIMIZADO
  const fichasFiltradas =
    useMemo(() => {
      return fichas.filter(
        (ficha) =>
          ficha.cliente
            ?.toLowerCase()
            .includes(
              busca.toLowerCase()
            ) ||
          ficha.procedimento
            ?.toLowerCase()
            .includes(
              busca.toLowerCase()
            )
      );
    }, [fichas, busca]);

  // ENVIO WHATSAPP
  const enviarLinkWhatsapp = (
    e: React.MouseEvent,
    clienteNome: string,
    telefone: string,
    idFicha: string
  ) => {
    e.stopPropagation();

    const linkFicha = `${baseUrl}/anamnese/cliente?id=${idFicha}`;

    const textoMensagem = `Olá, ${clienteNome}! ✨

Para realizarmos seu procedimento com total segurança, preciso que revise sua *Ficha de Anamnese Digital*.

Acesse abaixo:
👉 ${linkFicha}

Muito obrigada! ❤️`;

    const urlMensagemEncoded =
      encodeURIComponent(
        textoMensagem
      );

    const linkWhatsapp = `https://api.whatsapp.com/send?phone=${telefone}&text=${urlMensagemEncoded}`;

    if (
      typeof window !==
      "undefined"
    ) {
      window.open(
        linkWhatsapp,
        "_blank"
      );
    }
  };

  // SIMULAÇÃO
  const simularConfirmacaoPaciente =
    (id: string) => {
      const fichasAtualizadas =
        fichas.map((ficha) => {
          if (ficha.id === id) {
            return {
              ...ficha,
              status:
                "Verificado" as StatusFicha,
            };
          }

          return ficha;
        });

      setFichas(
        fichasAtualizadas
      );

      localStorage.setItem(
        "anamnese_fichas",
        JSON.stringify(
          fichasAtualizadas
        )
      );

      const fichaAtualizada =
        fichasAtualizadas.find(
          (f) => f.id === id
        ) || null;

      setFichaSelecionada(
        fichaAtualizada
      );
    };

  const totalPendentes =
    fichas.filter(
      (f) =>
        f.status === "Pendente"
    ).length;

  const totalConfirmadas =
    fichas.filter(
      (f) =>
        f.status ===
          "Verificado" ||
        f.status ===
          "Concluída"
    ).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 px-4 py-4 md:py-6 md:fixed md:inset-y-0 md:z-20 flex md:flex-col justify-between md:justify-start items-center md:items-stretch gap-4">
        {/* LOGO */}
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
            <FileText className="h-4 w-4" />
          </div>

          <div>
            <span className="text-sm font-bold text-slate-900 block">
              SmileMap
            </span>

            <span className="text-[11px] text-slate-400">
              Painel Premium
            </span>
          </div>
        </div>

        {/* NAV */}
        <nav className="hidden md:flex flex-col mt-10 flex-1 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/nova-ficha"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
          >
            <FileText className="h-4 w-4" />
            Nova Ficha
          </Link>

          <Link
            href="/dashboard/configuracoes"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Link>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 md:pl-64">
        <main className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
          {/* HEADER */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Olá, {nomeNegocio}
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Nicho atual:{" "}
                <span className="font-semibold text-slate-700">
                  {nicho}
                </span>
              </p>
            </div>

            <Link
              href="/dashboard/nova-ficha"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-3 rounded-2xl transition-all"
            >
              <Plus className="h-4 w-4" />
              Criar Ficha
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total de Fichas
              </span>

              <h2 className="text-3xl font-bold text-slate-900 mt-3">
                {fichas.length}
              </h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Pendentes
              </span>

              <h2 className="text-3xl font-bold text-amber-600 mt-3">
                {totalPendentes}
              </h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Confirmadas
              </span>

              <h2 className="text-3xl font-bold text-emerald-600 mt-3">
                {totalConfirmadas}
              </h2>
            </div>
          </div>

          {/* LISTA */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            {/* SEARCH */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                <input
                  type="text"
                  placeholder="Buscar por cliente ou procedimento..."
                  value={busca}
                  onChange={(e) =>
                    setBusca(
                      e.target.value
                    )
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* FICHAS */}
            <div className="divide-y divide-slate-100">
              {fichasFiltradas.length >
              0 ? (
                fichasFiltradas.map(
                  (ficha) => (
                    <div
                      key={ficha.id}
                      onClick={() =>
                        setFichaSelecionada(
                          ficha
                        )
                      }
                      className="p-5 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group"
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                          <FileText className="h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            {
                              ficha.cliente
                            }
                          </h3>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500">
                              {
                                ficha.procedimento
                              }
                            </span>

                            <span className="text-slate-300">
                              •
                            </span>

                            <span className="text-xs text-slate-400">
                              {
                                ficha.data
                              }
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[11px] font-semibold px-3 py-1 rounded-xl border flex items-center gap-1.5 ${
                            ficha.status ===
                              "Verificado" ||
                            ficha.status ===
                              "Concluída"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : "bg-amber-50 text-amber-700 border-amber-100"
                          }`}
                        >
                          {ficha.status ===
                            "Verificado" ||
                          ficha.status ===
                            "Concluída" ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <Clock className="h-3.5 w-3.5" />
                          )}

                          {
                            ficha.status
                          }
                        </span>

                        <button
                          onClick={(
                            e
                          ) =>
                            enviarLinkWhatsapp(
                              e,
                              ficha.cliente,
                              ficha.telefone,
                              ficha.id
                            )
                          }
                          className="hidden sm:flex items-center gap-2 border border-slate-200 hover:border-emerald-200 bg-white hover:bg-emerald-50 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-all"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                          Enviar
                        </button>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="p-10 text-center">
                  <p className="text-sm text-slate-400 font-medium">
                    Nenhuma ficha encontrada.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* MODAL */}
      {fichaSelecionada && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() =>
              setFichaSelecionada(
                null
              )
            }
          />

          <div className="relative z-10 w-full md:max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* HEADER */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {
                    fichaSelecionada.cliente
                  }
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {
                    fichaSelecionada.procedimento
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  setFichaSelecionada(
                    null
                  )
                }
                className="h-9 w-9 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-all"
              >
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-5 space-y-5">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Triagem Clínica
                </span>

                <p className="text-sm text-slate-700">
                  <strong>
                    Alergias:
                  </strong>{" "}
                  {fichaSelecionada
                    .triagemProfissional
                    ?.alergias ||
                    "Nenhuma"}
                </p>

                <p className="text-sm text-slate-700">
                  <strong>
                    Observações:
                  </strong>{" "}
                  {fichaSelecionada
                    .triagemProfissional
                    ?.observacoes ||
                    "Nenhuma"}
                </p>
              </div>

              {/* STATUS */}
              {fichaSelecionada.status ===
              "Pendente" ? (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />

                    <div>
                      <p className="text-sm font-bold text-amber-800">
                        Aguardando
                        confirmação
                      </p>

                      <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                        O paciente
                        ainda não
                        confirmou a
                        ficha enviada
                        por WhatsApp.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      simularConfirmacaoPaciente(
                        fichaSelecionada.id
                      )
                    }
                    className="mt-4 w-full h-11 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Simular
                    Confirmação
                  </button>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />

                  <div>
                    <p className="text-sm font-bold text-emerald-800">
                      Paciente
                      Verificado
                    </p>

                    <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                      O paciente já
                      confirmou os
                      dados da
                      anamnese com
                      sucesso.
                    </p>
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
