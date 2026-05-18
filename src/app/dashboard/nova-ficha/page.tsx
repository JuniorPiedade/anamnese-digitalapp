"use client";

import React, { useState } from 'react';
import { 
  User, 
  HeartPulse, 
  Sparkles, 
  PenTool, 
  ArrowLeft, 
  ArrowRight, 
  Check,
  ChevronRight
} from 'lucide-react';

export default function NovaFichaPage() {
  const [step, setStep] = useState(1);

  // Estados do Formulário (Exemplo estrutural completo)
  const [formData, setFormData] = useState({
    // Passo 1
    nome: '', dataNascimento: '', cpf: '', telefone: '', profissao: '',
    // Passo 2
    gestante: 'nao', alergias: '', medicamentos: '', problemasCardiacos: 'nao', queloide: 'nao',
    // Passo 3
    exposicaoSol: 'nao', fuma: 'nao', praticaExercicio: 'sim', rotinaSkincare: '',
    // Passo 4
    aceitaTermos: false
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const avancar = () => setStep(prev => Math.min(prev + 1, 4));
  const voltar = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Ficha salva com sucesso na memória! Pronta para ir para o banco de dados.");
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      
      {/* HEADER COMPACTO */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <a href="/dashboard" className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar ao Painel
          </a>
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Ficha de Anamnese Corporal & Facial</span>
          <div className="w-20"></div> {/* Spacer balanceador */}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        
        {/* INDICADOR DE ETAPAS (STEPPER) */}
        <div className="mb-10 block">
          <div className="flex items-center justify-between">
            {[
              { id: 1, label: "Identificação", icon: User },
              { id: 2, label: "Clínico", icon: HeartPulse },
              { id: 3, label: "Hábitos", icon: Sparkles },
              { id: 4, label: "Termo", icon: PenTool },
            ].map((item) => {
              const IconComp = item.icon;
              const isDone = step > item.id;
              const isActive = step === item.id;

              return (
                <div key={item.id} className="flex flex-col items-center flex-1 relative">
                  {/* Linha conectora */}
                  {item.id border-t-2 > 1 && (
                    <div className={`absolute top-5 left-[-50%] right-[50%] h-[2px] -z-10 transition-colors ${
                      step >= item.id ? 'bg-blue-600' : 'bg-slate-200'
                    }`} />
                  )}
                  
                  {/* Círculo do Ícone */}
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                    isDone ? 'bg-blue-600 border-blue-600 text-white' :
                    isActive ? 'bg-white border-blue-600 text-blue-600 shadow-sm ring-4 ring-blue-50' :
                    'bg-white border-slate-200 text-slate-400'
                  }`}>
                    {isDone ? <Check className="h-4 w-4 stroke-[3]" /> : <IconComp className="h-4 w-4" />}
                  </div>
                  <span className={`mt-2 text-[10px] font-bold tracking-tight uppercase ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTAINER DO FORMULÁRIO */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* ETAPA 1: DADOS PESSOAIS */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Dados de Identificação</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">Nome Completo</label>
                    <input type="text" value={formData.nome} onChange={e => handleChange('nome', e.target.value)} required placeholder="Nome completo do paciente" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">Data de Nascimento</label>
                    <input type="date" value={formData.dataNascimento} onChange={e => handleChange('dataNascimento', e.target.value)} required className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">CPF</label>
                    <input type="text" value={formData.cpf} onChange={e => handleChange('cpf', e.target.value)} placeholder="000.000.000-00" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">Telefone / WhatsApp</label>
                    <input type="tel" value={formData.telefone} onChange={e => handleChange('telefone', e.target.value)} required placeholder="(71) 99999-9999" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">Profissão</label>
                    <input type="text" value={formData.profissao} onChange={e => handleChange('profissao', e.target.value)} placeholder="Ex: Advogada" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 2: HISTÓRICO CLÍNICO */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Antecedentes Clínicos e Saúde</h2>
                
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/40">
                    <span className="text-xs font-semibold text-slate-700 block mb-2">Está gestante ou amamentando?</span>
                    <div className="flex gap-4">
                      {['sim', 'nao'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 text-xs font-medium cursor-pointer capitalize text-slate-600">
                          <input type="radio" name="gestante" value={opt} checked={formData.gestante === opt} onChange={e => handleChange('gestante', e.target.value)} className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"/>
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/40">
                    <span className="text-xs font-semibold text-slate-700 block mb-2">Histórico de Cicatrizes / Queloides?</span>
                    <div className="flex gap-4">
                      {['sim', 'nao'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 text-xs font-medium cursor-pointer capitalize text-slate-600">
                          <input type="radio" name="queloide" value={opt} checked={formData.queloide === opt} onChange={e => handleChange('queloide', e.target.value)} className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"/>
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">Alergias conhecidas (Medicamentos, cosméticos, látex)</label>
                    <textarea value={formData.alergias} onChange={e => handleChange('alergias', e.target.value)} placeholder="Descreva aqui se houver, ou digite 'Não possui'" rows={2} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"/>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">Medicamentos de uso contínuo</label>
                    <textarea value={formData.medicamentos} onChange={e => handleChange('medicamentos', e.target.value)} placeholder="Ex: Anticoncepcional, anti-hipertensivo..." rows={2} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"/>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 3: ESTILO DE VIDA */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Hábitos Diários & Cuidados</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/40">
                    <div>
                      <span className="text-xs font-semibold text-slate-700 block">Exposição solar frequente/frequenta praia?</span>
                      <span className="text-[10px] text-slate-400">Importante para avaliação de risco de manchas e peelings.</span>
                    </div>
                    <div className="flex gap-4">
                      {['sim', 'nao'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 text-xs font-medium cursor-pointer capitalize text-slate-600">
                          <input type="radio" name="exposicaoSol" value={opt} checked={formData.exposicaoSol === opt} onChange={e => handleChange('exposicaoSol', e.target.value)} className="h-4 w-4 border-slate-300 text-blue-600"/>
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/40">
                    <div>
                      <span className="text-xs font-semibold text-slate-700 block">Tabagismo (Fuma)?</span>
                      <span className="text-[10px] text-slate-400">O fumo impacta diretamente na oxigenação e colágeno da pele.</span>
                    </div>
                    <div className="flex gap-4">
                      {['sim', 'nao'].map(opt => (
                        <label key={opt} className="flex items-center gap-2 text-xs font-medium cursor-pointer capitalize text-slate-600">
                          <input type="radio" name="fuma" value={opt} checked={formData.fuma === opt} onChange={e => handleChange('fuma', e.target.value)} className="h-4 w-4 border-slate-300 text-blue-600"/>
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500 mb-1 block">Produtos ou ácidos que usa em casa atualmente (Skincare)</label>
                    <input type="text" value={formData.rotinaSkincare} onChange={e => handleChange('rotinaSkincare', e.target.value)} placeholder="Ex: Vitamina C, Sabonete de ácido salicílico, Protetor solar" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 4: TERMO E ASSINATURA */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Consentimento e Responsabilidade</h2>
                
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 max-h-48 overflow-y-auto text-[11px] leading-relaxed text-slate-600 space-y-2">
                  <p className="font-bold text-slate-800">DECLARAÇÃO DE RESPONSABILIDADE E CONSENTIMENTO INFORMADO</p>
                  <p>1. Confirmo que todas as informações prestadas neste formulário de anamnese são rigorosamente verdadeiras, não omitindo dados sobre minha saúde física, rotinas ou histórico médico.</p>
                  <p>2. Fui devidamente informado(a) sobre as indicações, contraindicações, cuidados pós-procedimento e possíveis reações adversas inerentes aos tratamentos estéticos propostos.</p>
                  <p>3. Autorizo a execução dos tratamentos acordados e comprometo-me a seguir à risca todas as recomendações domiciliares fornecidas pelo profissional.</p>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required checked={formData.aceitaTermos} onChange={e => handleChange('aceitaTermos', e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"/>
                    <span className="text-xs text-slate-600 leading-tight">
                      Li, compreendo e aceito integralmente os termos de responsabilidade acima descritos.
                    </span>
                  </label>
                </div>

                {/* Bloco de Assinatura Digital Estilizado */}
                <div className="pt-4">
                  <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Assinatura Digital do Paciente</label>
                  <div className="h-32 w-full rounded-xl border border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center text-slate-400 gap-1 hover:bg-slate-50 transition-colors cursor-crosshair">
                    <PenTool className="h-5 w-5 stroke-[1.5]" />
                    <span className="text-[10px]">O paciente assina diretamente na tela do dispositivo</span>
                  </div>
                </div>
              </div>
            )}

            {/* BOTÕES DE NAVEGAÇÃO INTERNOS */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button type="button" onClick={voltar} disabled={step === 1} className={`flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}>
                <ArrowLeft className="h-3.5 w-3.5" /> Anterior
              </button>

              {step < 4 ? (
                <button type="button" onClick={avancar} className="flex items-center gap-1 rounded-xl bg-slate-950 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-all">
                  Próximo <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button type="submit" disabled={!formData.aceitaTermos} className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/10 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  Finalizar e Salvar Ficha
                </button>
              )}
            </div>

          </form>
        </div>
      </main>

    </div>
  );
}
