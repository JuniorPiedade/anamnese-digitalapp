"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, HeartPulse, User, ShieldCheck } from "lucide-react";
// LINHA 7 CORRIGIDA: Agora usando o alias oficial do projeto
import { supabase } from "../../supabaseClient";

export default function AnamneseClientePage() {
  const searchParams = useSearchParams();
  const fichaId = searchParams.get("id");

  const [carregando, setCarregando] = useState(true);
  const [fichaEncontrada, setFichaEncontrada] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const [dadosTriagem, setDadosTriagem] = useState({ cliente: "", procedimento: "" });
  const [historicoMedico, setHistoricoMedico] = useState("");
  const [gestanteOuLactante, setGestanteOuLactante] = useState("nao");
  const [jaFezProcedimento, setJaFezProcedimento] = useState("nao");
  const [aceitaTermos, setAceitaTermos] = useState(false);

  useEffect(() => {
    async function carregarFichaInicial() {
      if (!fichaId) {
        setErro("Código da ficha inválido.");
        setCarregando(false);
        return;
      }
      try {
        const { data, error } = await supabase.from("cadastros").select("cliente, procedimento").eq("id", fichaId).single();
        if (error || !data) {
          setErro("Ficha não encontrada no sistema.");
        } else {
          setDadosTriagem({ cliente: data.cliente, procedimento: data.procedimento });
          setFichaEncontrada(true);
        }
      } catch (err) {
        setErro("Erro ao conectar com o banco de dados.");
      } finally {
        setCarregando(false);
      }
    }
    carregarFichaInicial();
  }, [fichaId]);

  const salvarFicha = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aceitaTermos) {
      setErro("Você precisa aceitar os termos de consentimento.");
      return;
    }

    setCarregando(true);
    try {
      const dadosAtualizados = {
        status: "Concluído",
        alergias: `Histórico/Alergias: ${historicoMedico || "Nenhum histórico crítico"}`,
        observacoes: `Gestante: ${gestanteOuLactante.toUpperCase()} | Já fez antes: ${jaFezProcedimento.toUpperCase()}`,
      };

      const { error } = await supabase.from("cadastros").update(dadosAtualizados).eq("id", fichaId);
      if (error) {
        setErro("Erro ao salvar respostas: " + error.message);
      } else {
        setSucesso(true);
      }
    } catch (err) {
      setErro("Erro inesperado ao salvar.");
    } finally {
      setCarregando(false);
    }
  };

  if (carregando && !fichaEncontrada && !sucesso) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-slate-500">Carregando formulário...</p>
        </div>
      </div>
    );
  }

  if (sucesso) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-800 antialiased font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm space-y-6">
          <div className="h-16 w-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600"><CheckCircle2 className="h-8 w-8" /></div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Ficha Enviada com Sucesso!</h2>
            <p className="text-sm text-slate-500 mt-2">Obrigada, <strong>{dadosTriagem.cliente}</strong>. Seus dados foram guardados com segurança.</p>
          </div>
        </div>
      </div>
    );
  }

  if (erro && !fichaEncontrada) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm space-y-4">
          <div className="h-12 w-12 bg-red-50 text-red-600 flex items-center justify-center rounded-full mx-auto"><AlertCircle className="h-6 w-6" /></div>
          <p className="text-sm text-slate-500">{erro}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans py-8 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-2xl"><HeartPulse className="h-6 w-6" /></div>
          <div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase">{dadosTriagem.procedimento}</span>
            <h1 className="text-lg font-bold text-slate-900 mt-1">Ficha de Anamnese Digital</h1>
          </div>
        </div>

        <form onSubmit={salvarFicha} className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 space-y-6">
            {erro && (
              <div className="flex items-start gap-3 bg-red-50 text-red-700 rounded-2xl p-4">
                <AlertCircle className="h-5 w-5 mt-0.5" /> <span className="text-sm">{erro}</span>
              </div>
            )}
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <label className="text-xs font-bold text-slate-400 uppercase">Paciente</label>
              <div className="flex items-center gap-2 text-slate-800 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                <User className="h-4 w-4 text-slate-400" /> <span className="text-sm font-semibold">{dadosTriagem.cliente}</span>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Histórico de saúde ou alergias importantes:</label>
                <textarea rows={3} value={historicoMedico} onChange={(e) => setHistoricoMedico(e.target.value)} placeholder="Ex: Alergias, uso de ácidos, medicamentos contínuos..." className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none resize-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Está gestante ou lactante?</label>
                  <select value={gestanteOuLactante} onChange={(e) => setGestanteOuLactante(e.target.value)} className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm bg-white outline-none focus:border-blue-500">
                    <option value="nao">Não</option>
                    <option value="sim">Sim</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Já realizou esse serviço antes?</label>
                  <select value={jaFezProcedimento} onChange={(e) => setJaFezProcedimento(e.target.value)} className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm bg-white outline-none focus:border-blue-500">
                    <option value="nao">Não, primeira vez</option>
                    <option value="sim">Sim, já tenho costume</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-800"><ShieldCheck className="h-4 w-4 text-blue-600" /> <span className="text-xs font-bold uppercase text-slate-400">Consentimento</span></div>
              <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">Declaro que as informações acima são verdadeiras e estou ciente de que omitir dados de saúde pode interferir no resultado do procedimento.</p>
              <label className="flex items-start gap-3 pt-2 cursor-pointer">
                <input type="checkbox" checked={aceitaTermos} onChange={(e) => setAceitaTermos(e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-950" />
                <span className="text-xs text-slate-600 font-medium">Confirmo que as informações fornecidas são corretas e autorizo o procedimento.</span>
              </label>
            </div>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <button type="submit" disabled={carregando} className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold disabled:bg-slate-300">
              {carregando ? "Enviando Ficha..." : "Confirmar e Enviar Ficha"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
