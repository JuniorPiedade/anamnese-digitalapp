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
  Smartphone
} from 'lucide-react';

export default function FichaClientePublicaPage() {
  const [step, setStep] = useState(1);
  const [enviado, setEnviado] = useState(false);

  const [formData, setFormData] = useState({
    nome: '', dataNascimento: '', cpf: '', telefone: '', profissao: '',
    gestante: 'nao', alergias: '', medicamentos: '', problemasCardiacos: 'nao', queloide: 'nao',
    exposicaoSol: 'nao', fuma: 'nao', praticaExercicio: 'sim', rotinaSkincare: '',
    aceitaTermos: false
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const avancar = () => setStep(prev => Math.min(prev + 1, 4));
  const voltar = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.aceitaTermos) return;
    setEnviado(true);
  };

  // TELA DE SUCESSO (O QUE O CLIENTE VÊ AO TERMINAR)
  if (enviado) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center antialiased">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4">
            <Check className="h-6 w-6 stroke-[3]" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Obrigado, {formData.nome.split(' ')[0]}!</h1>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Sua ficha de anamnese foi respondida e enviada com sucesso para a clínica. Seus dados estão salvos e protegidos.
          </p>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center justify-center gap-1">
              <Smartphone className="h-3 w-3" /> Você já pode fechar esta aba.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      
      {/* HEADER EXCLUSIVO PÚBLICO (SEM LOGOUT OU MENUS) */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md text-center">
        <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-wider uppercase">
          Formulário de Pré-Atendimento Estético
        </span>
      </header>

      <main className="mx-auto max-w-xl px-4 py-8 sm:px-6">
        
        {/* STEPPER COMPACTO PARA CELULAR */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {[
              { id: 1, icon: User },
              { id: 2, icon: HeartPulse },
              { id: 3, icon: Sparkles },
              { id: 4, icon: PenTool },
            ].map((item) => {
              const IconComp = item.icon;
              const isDone = step > item.id;
              const isActive = step === item.id;

              return (
                <div key={item.id} className="flex items-center flex-1 last:flex-none relative justify-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
                    isDone ? 'bg-blue-600 border-blue-600 text-white' :
                    isActive ? 'bg-white border-blue-600 text-blue-600 ring-4 ring-blue-50' :
                    'bg-white border-slate-200 text-slate-400'
                  }`}>
                    {isDone ? <Check className="h-3 w-3 stroke-[3]" /> : <IconComp className="h-3.5 w-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTAINER DO FORMULÁRIO */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* ETAPA 1 */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">Dados Pessoais</h2>
                  <p className="text-[11px] text-slate-400">Insira suas informações de identificação para abrir seu prontuário.</p>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Nome Completo</label>
                  <input type="text" value={formData.nome} onChange={e => handleChange('nome', e.target.value)} required placeholder="Seu nome completo" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Nascimento</label>
                    <input type="date" value={formData.dataNascimento} onChange={e => handleChange('dataNascimento', e.target.value)} required className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">WhatsApp</label>
                    <input type="tel" value={formData.telefone} onChange={e => handleChange('telefone', e.target.value)} required placeholder="(00) 00000-0000" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 2 */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">Histórico de Saúde</h2>
                  <p className="text-[11px] text-slate-400">Suas respostas garantem a total segurança durante a aplicação do procedimento.</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/40 flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-700">Gestante ou lactante?</span>
                    <div className="flex gap-3">
                      {['sim', 'nao'].map(opt => (
                        <label key={opt} className="flex items-center gap-1.5 text-xs font-medium capitalize text-slate-600 cursor-pointer">
                          <input type="radio" name="gestante" value={opt} checked={formData.gestante === opt} onChange={e => handleChange('gestante', e.target.value)} className="h-3.5 w-3.5 text-blue-600"/>
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/40 flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-700">Tem queloides?</span>
                    <div className="flex gap-3">
                      {['sim', 'nao'].map(opt => (
                        <label key={opt} className="flex items-center gap-1.5 text-xs font-medium capitalize text-slate-600 cursor-pointer">
                          <input type="radio" name="queloide" value={opt} checked={formData.queloide === opt} onChange={e => handleChange('queloide', e.target.value)} className="h-3.5 w-3.5 text-blue-600"/>
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Alergias conhecidas</label>
                    <textarea value={formData.alergias} onChange={e => handleChange('alergias', e.target.value)} placeholder="Ex: Medicamentos, cosméticos, nenhum..." rows={2} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"/>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 3 */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">Hábitos Diários</h2>
                  <p className="text-[11px] text-slate-400">Nos ajude a entender sua rotina e cuidados atuais com a pele.</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/40">
                    <span className="text-xs font-semibold text-slate-700">Fuma?</span>
                    <div className="flex gap-3">
                      {['sim', 'nao'].map(opt => (
                        <label key={opt} className="flex items-center gap-1.5 text-xs font-medium capitalize text-slate-600">
                          <input type="radio" name="fuma" value={opt} checked={formData.fuma === opt} onChange={e => handleChange('fuma', e.target.value)} className="h-3.5 w-3.5 text-blue-600"/> {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Procedimento de interesse ou que vai realizar hoje</label>
                    <input type="text" value={formData.rotinaSkincare} onChange={e => handleChange('rotinaSkincare', e.target.value)} placeholder="Ex: Preenchimento, Botox, Limpeza de pele" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 4 */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">Consentimento</h2>
                  <p className="text-[11px] text-slate-400">Leia com atenção os termos de responsabilidade antes do envio.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 max-h-36 overflow-y-auto text-[10px] leading-relaxed text-slate-600 space-y-2">
                  <p className="font-bold text-slate-700">DECLARAÇÃO DE RESPONSABILIDADE</p>
                  <p>1. Confirmo que todas as informações prestadas são rigorosamente verdadeiras.</p>
                  <p>2. Fui informado(a) sobre as indicações, cuidados pós-procedimento e possíveis riscos inerentes ao tratamento.</p>
                </div>
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" required checked={formData.aceitaTermos} onChange={e => handleChange('aceitaTermos', e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600"/>
                    <span className="text-[11px] text-slate-600 leading-tight">Declaro que li e aceito voluntariamente os termos descritos acima.</span>
                  </label>
                </div>
              </div>
            )}

            {/* BOTÕES */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button type="button" onClick={voltar} disabled={step === 1} className={`flex items-center gap-1 text-xs font-semibold text-slate-500 px-2 py-1.5 ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}>
                <ArrowLeft className="h-3.5 w-3.5" /> Voltar
              </button>

              {step < 4 ? (
                <button type="button" onClick={avancar} className="flex items-center gap-1 rounded-xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white shadow-sm">
                  Avançar <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button type="submit" disabled={!formData.aceitaTermos} className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md disabled:opacity-50">
                  Enviar Respostas
                </button>
              )}
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
