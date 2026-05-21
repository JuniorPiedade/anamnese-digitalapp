"use client";

import React, { useState, useRef } from 'react';
import { 
  User, ShieldAlert, Activity, Eye, Sparkles, Droplet, Syringe, Check, FileText, Trash2 
} from 'lucide-react';

export default function FormularioAnamneseClientePage() {
  // Controle de Abas/Etapas ou Serviço Selecionado para simular o comportamento modular dinâmico
  const [servicoSelecionado, setServicoSelecionado] = useState<"lash" | "make" | "pele" | "botox" | "">("");
  const [sucesso, setSucesso] = useState(false);
  const [assinado, setAssinado] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  // --- LÓGICA DO CANVAS DE ASSINATURA ---
  const iniciarDesenho = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return;
    isDrawing.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f172a'; // slate-900

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const desenhar = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setAssinado(true);
  };

  const pararDesenho = () => {
    isDrawing.current = false;
  };

  const limparAssinatura = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setAssinado(false);
  };

  const enviarFormulario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assinado) {
      alert("Por favor, preencha a sua assinatura digital antes de enviar.");
      return;
    }
    setSucesso(true);
  };

  if (sucesso) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-800 antialiased font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="h-16 w-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Ficha Enviada com Sucesso!</h2>
          <p className="text-xs text-slate-500 mt-2">Obrigado por responder. Suas informações já estão salvas e seguras no painel do profissional.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans py-8 px-4">
      <div className="max-w-xl w-full mx-auto bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Cabeçalho do Formulário */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Ficha de Anamnese Digital</h1>
          <p className="text-xs text-slate-500 mt-0.5">Por favor, responda com atenção. Seus dados estão protegidos.</p>
        </div>

        <form onSubmit={enviarFormulario} className="p-6 space-y-8">
          
          {/* SELETOR DINÂMICO DE PROCEDIMENTO (Simulação de injeção automática) */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
            <label className="text-xs font-bold text-blue-900 block mb-2">Selecione o procedimento do agendamento:</label>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setServicoSelecionado("lash")} className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-semibold transition-all ${servicoSelecionado === 'lash' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}><Eye className="h-3.5 w-3.5" /> Lash Designer</button>
              <button type="button" onClick={() => setServicoSelecionado("make")} className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-semibold transition-all ${servicoSelecionado === 'make' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}><Sparkles className="h-3.5 w-3.5" /> Maquiagem</button>
              <button type="button" onClick={() => setServicoSelecionado("pele")} className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-semibold transition-all ${servicoSelecionado === 'pele' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}><Droplet className="h-3.5 w-3.5" /> Limpeza de Pele</button>
              <button type="button" onClick={() => setServicoSelecionado("botox")} className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-semibold transition-all ${servicoSelecionado === 'botox' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}><Syringe className="h-3.5 w-3.5" /> Botox / Preenchedores</button>
            </div>
          </div>

          {/* 1. BLOCO CORE (OBRIGATÓRIO) */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><User className="h-3.5 w-3.5 text-slate-400" /> 1. Bloco Core (Obrigatório)</h2>
            
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Nome Completo</label>
                <input required type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500 bg-slate-50/30 transition-all"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Data de Nascimento</label>
                  <input required type="date" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500 bg-slate-50/30 transition-all"/>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Profissão / Ocupação</label>
                  <input required type="text" placeholder="Ex: Advogada" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500 bg-slate-50/30 transition-all"/>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">WhatsApp</label>
                <input required type="tel" placeholder="(71) 99999-9999" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500 bg-slate-50/30 transition-all"/>
              </div>
            </div>

            {/* Histórico Médico Crítico */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-slate-600 block mb-2">Histórico Médico Crítico</label>
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"/>
                  <span>Gestante ou Lactante?</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"/>
                  <span>Possui alguma doença autoimune? (Lúpus, Vitiligo)</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"/>
                  <span>É diabético ou tem problemas de cicatrização/queloide?</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"/>
                  <span>Possui problemas cardíacos ou usa marca-passo?</span>
                </label>
              </div>
            </div>

            {/* Alergias */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Alergias Conhecidas</label>
              <textarea placeholder="Liste alergias a medicamentos (Aspirina, Dipirona), cosméticos, látex, esparadrapo, iodo ou metais..." rows={2} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500 bg-slate-50/30 transition-all resize-none"/>
            </div>

            {/* Medicamentos em Uso */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-slate-600 block mb-2">Medicamentos em Uso</label>
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"/>
                  <span>Usa Roacutan (Isotretinoína)?</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"/>
                  <span>Usa anticoagulantes ou corticoides?</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"/>
                  <span>Usa ácidos na rotina de skincare atual (Retinol, Glicólico)?</span>
                </label>
              </div>
            </div>
          </div>

          {/* 2. BLOCOS MODULARES DINÂMICOS (ATIVADOS CONFORME O SELETOR ACIMA) */}
          
          {/* MODULO: LASH DESIGNER */}
          {servicoSelecionado === "lash" && (
            <div className="space-y-4 pt-4 border-t border-dashed border-slate-200 animate-fadeIn">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2"><Eye className="h-3.5 w-3.5" /> Bloco Lash Designer</h2>
              <div className="space-y-2 bg-blue-50/30 p-4 rounded-xl border border-blue-100/70">
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 h-4 w-4"/>
                  <span>Sofre de claustrofobia? (Olhos fechados por aprox. 2h)</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 h-4 w-4"/>
                  <span>Tem o hábito de dormir de bruços?</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 h-4 w-4"/>
                  <span>Passou por cirurgia ocular recente (menos de 6 meses)?</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 h-4 w-4"/>
                  <span>Histórico de conjuntivite frequente ou sensibilidade ocular extrema?</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 h-4 w-4"/>
                  <span>Alergia conhecida a cianoacrilato (base da cola de cílios)?</span>
                </label>
              </div>
            </div>
          )}

          {/* MODULO: MAQUIAGEM */}
          {servicoSelecionado === "make" && (
            <div className="space-y-4 pt-4 border-t border-dashed border-slate-200 animate-fadeIn">
              <h2 className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Bloco Maquiagem Profissional</h2>
              <div className="space-y-3 bg-purple-50/30 p-4 rounded-xl border border-purple-100/70">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Qual o seu tipo de pele auto-percebido?</label>
                  <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none bg-white">
                    <option>Mista</option>
                    <option>Oleosa</option>
                    <option>Seca</option>
                    <option>Normal</option>
                  </select>
                </div>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700 pt-1">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-purple-600 h-4 w-4"/>
                  <span>Usa lentes de contato no momento?</span>
                </label>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Possui alergia a alguma marca ou componente de maquiagem?</label>
                  <input type="text" placeholder="Ex: Parabenos, marca X..." className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none bg-white"/>
                </div>
              </div>
            </div>
          )}

          {/* MODULO: LIMPEZA DE PELE */}
          {servicoSelecionado === "pele" && (
            <div className="space-y-4 pt-4 border-t border-dashed border-slate-200 animate-fadeIn">
              <h2 className="text-xs font-bold text-teal-600 uppercase tracking-widest flex items-center gap-2"><Droplet className="h-3.5 w-3.5" /> Bloco Limpeza de Pele</h2>
              <div className="space-y-3 bg-teal-50/30 p-4 rounded-xl border border-teal-100/70">
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-teal-600 h-4 w-4"/>
                  <span>Histórico de herpes labial ativo?</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-teal-600 h-4 w-4"/>
                  <span>Teve exposição solar recente (praia/piscina nos últimos 7 dias)?</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-teal-600 h-4 w-4"/>
                  <span>Possui tendência a manchas (Hiperpigmentação Pós-Inflamatória)?</span>
                </label>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Sua sensibilidade a dor é:</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-1.5 text-xs font-medium"><input type="radio" name="dor" className="text-teal-600"/> Baixa</label>
                    <label className="flex items-center gap-1.5 text-xs font-medium"><input type="radio" name="dor" className="text-teal-600"/> Média</label>
                    <label className="flex items-center gap-1.5 text-xs font-medium"><input type="radio" name="dor" className="text-teal-600"/> Alta</label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULO: BOTOX / PREENCHIMENTO */}
          {servicoSelecionado === "botox" && (
            <div className="space-y-4 pt-4 border-t border-dashed border-slate-200 animate-fadeIn">
              <h2 className="text-xs font-bold text-rose-600 uppercase tracking-widest flex items-center gap-2"><Syringe className="h-3.5 w-3.5" /> Bloco Botox & Preenchedores</h2>
              <div className="space-y-3 bg-rose-50/30 p-4 rounded-xl border border-rose-100/70">
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-rose-600 h-4 w-4"/>
                  <span>Já realizou aplicação de Botox ou preenchedores antes?</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-rose-600 h-4 w-4"/>
                  <span>Portador de doenças neuromusculares (ex: Miastenia Gravis)?</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-rose-600 h-4 w-4"/>
                  <span>Possui preenchimento definitivo no local da aplicação (ex: PMMA)?</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-xs font-medium text-slate-700">
                  <input type="checkbox" className="mt-0.5 rounded border-slate-300 text-rose-600 h-4 w-4"/>
                  <span>Tomou alguma vacina nos últimos 15 dias?</span>
                </label>
              </div>
            </div>
          )}

          {/* 3. FECHAMENTO LEGAL & ASSINATURA DIGITAL */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><ShieldAlert className="h-3.5 w-3.5 text-slate-400" /> 3. Fechamento Legal</h2>
            
            <div className="space-y-4">
              {/* Checkbox de Consentimento */}
              <label className="flex items-start gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-100">
                <input required type="checkbox" className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 shrink-0"/>
                <span className="text-xs text-slate-600 font-medium leading-relaxed">
                  Declaro que todas as informações acima são verdadeiras e completas. Estou ciente de que a omissão de dados de saúde pode comprometer a segurança e o resultado final do procedimento estético realizado.
                </span>
              </label>

              {/* Pad de Desenho da Assinatura */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-slate-400" /> Assinatura Digital (Desenhe com o dedo/mouse no quadro)</label>
                  {assinado && (
                    <button type="button" onClick={limparAssinatura} className="text-[10px] font-bold text-rose-600 flex items-center gap-1 hover:underline"><Trash2 className="h-3 w-3" /> Limpar</button>
                  )}
                </div>
                
                <div className="border border-slate-200 bg-slate-50/50 rounded-xl overflow-hidden h-40 relative touch-none">
                  <canvas 
                    ref={canvasRef}
                    width={520}
                    height={160}
                    className="w-full h-full cursor-crosshair bg-slate-50/20"
                    onMouseDown={iniciarDesenho}
                    onMouseMove={desenhar}
                    onMouseUp={pararDesenho}
                    onMouseLeave={pararDesenho}
                    onTouchStart={iniciarDesenho}
                    onTouchMove={desenhar}
                    onTouchEnd={pararDesenho}
                  />
                  {!assinado && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[10px] font-bold text-slate-400/80 uppercase tracking-wider">
                      Espaço para assinatura
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* BOTÃO DE SUBMIT */}
          <button type="submit" className="w-full bg-slate-950 text-white text-xs font-bold py-3.5 rounded-xl shadow-sm hover:bg-slate-800 transition-all active:scale-[0.99]">
            Finalizar e Enviar Anamnese
          </button>

        </form>
      </div>
    </div>
  );
}
