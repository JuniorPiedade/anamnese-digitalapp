"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, FileText, ArrowRight } from 'lucide-react';

export default function NovaFichaPage() {
  const router = useRouter();
  const [paciente, setPaciente] = useState("");
  const [procedimento, setProcedimento] = useState("Toxina Botulínica");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paciente.trim()) return;

    setLoading(true);

    // Formata a data atual no padrão DD/MM/AAAA
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');

    // Estrutura o novo registro exatamente como o Dashboard espera
    const novaFicha = {
      id: String(Date.now()),
      paciente: paciente.trim(),
      procedimento: procedimento,
      data: dataFormatada,
      status: "Pendente", // Começa como pendente para simular o cliente que ainda vai responder
      historico: [
        { 
          data: dataFormatada, 
          evento: `Link de Anamnese gerado para o procedimento de ${procedimento} e enviado ao paciente.` 
        }
      ]
    };

    // Lê os dados existentes, injeta a nova ficha no início da fila e salva de volta
    const existentes = localStorage.getItem('anamnese_fichas');
    const fichasAtuais = existentes ? JSON.parse(existentes) : [];
    
    localStorage.setItem('anamnese_fichas', JSON.stringify([novaFicha, ...fichasAtuais]));

    // Simula um pequeno delay para suavidade visual antes de voltar ao dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Cabeçalho do formulário */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-800 active:scale-95 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-xs font-bold text-slate-900">Nova Ficha</h2>
            <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-tight">Preparar envio de anamnese</p>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nome do Paciente</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Carlos Eduardo Souza"
              value={paciente}
              onChange={(e) => setPaciente(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-300 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Procedimento Alvo</label>
            <select
              value={procedimento}
              onChange={(e) => setProcedimento(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-slate-700"
            >
              <option value="Toxina Botulínica">Toxina Botulínica</option>
              <option value="Preenchimento Labial">Preenchimento Labial</option>
              <option value="Bioestimulador de Colágeno">Bioestimulador de Colágeno</option>
              <option value="Peeling Químico">Peeling Químico</option>
              <option value="Lash Design">Lash Design / Extensão</option>
              <option value="Harmonização Facial">Harmonização Facial</option>
            </select>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              disabled={loading || !paciente.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-950 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-900 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
            >
              {loading ? (
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>Gerar Ficha Digital <ArrowRight className="h-3.5 w-3.5" /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
