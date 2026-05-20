"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ArrowRight } from 'lucide-react';

export default function NovaFichaPage() {
  const router = useRouter();
  const [paciente, setPaciente] = useState("");
  const [procedimento, setProcedimento] = useState("Toxina Botulínica");
  const [alergias, setAlergias] = useState("");
  const [medicacoes, setMedicacoes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paciente.trim()) return;

    setLoading(true);
    const dataFormatada = new Date().toLocaleDateString('pt-BR');

    const novaFicha = {
      id: String(Date.now()),
      paciente: paciente.trim(),
      procedimento: procedimento,
      data: dataFormatada,
      status: "Pendente", // Começa como pendente aguardando validação do cliente via link
      perguntasGerais: {
        alergias: alergias.trim() || "Nenhuma relatada",
        medicacoes: medicacoes.trim() || "Nenhuma relatada",
      },
      historico: [
        { 
          data: dataFormatada, 
          evento: `Ficha de Anamnese criada com status PENDENTE. Aguardando validação do cliente pelo link.` 
        },
        {
          data: dataFormatada,
          evento: `Triagem geral preenchida pelo profissional na clínica.`
        }
      ]
    };

    const existentes = localStorage.getItem('anamnese_fichas');
    const fichasAtuais = existentes ? JSON.parse(existentes) : [];
    localStorage.setItem('anamnese_fichas', JSON.stringify([novaFicha, ...fichasAtuais]));

    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <button type="button" onClick={() => router.push('/dashboard')} className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-500 active:scale-95 transition-all">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-xs font-bold text-slate-900">Preenchimento de Anamnese</h2>
            <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-tight">Triagem Clínica Interna</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nome do Paciente</label>
            <input type="text" required placeholder="Ex: Carlos Eduardo Souza" value={paciente} onChange={(e) => setPaciente(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3 py-2 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"/>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Procedimento Alvo</label>
            <select value={procedimento} onChange={(e) => setProcedimento(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3 py-2 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-700">
              <option value="Toxina Botulínica">Toxina Botulínica</option>
              <option value="Preenchimento Labial">Preenchimento Labial</option>
              <option value="Bioestimulador de Colágeno">Bioestimulador de Colágeno</option>
              <option value="Lash Design">Lash Design / Extensão</option>
            </select>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Perguntas Gerais de Triagem</span>
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-600">Possui alergias ou contraindicações?</label>
              <input type="text" placeholder="Ex: Alergia a frutos do mar, AAS, etc." value={alergias} onChange={(e) => setAlergias(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3 py-2 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-600">Usa medicações contínuas?</label>
              <input type="text" placeholder="Ex: Anti-hipertensivo, anticoagulante..." value={medicacoes} onChange={(e) => setMedicacoes(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3 py-2 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" disabled={loading || !paciente.trim()} className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-950 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-900 active:scale-[0.98] transition-all disabled:opacity-50">
              {loading ? (
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>Gerar e Salvar Ficha <ArrowRight className="h-3.5 w-3.5" /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
