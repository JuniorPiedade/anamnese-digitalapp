"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  User, ShieldAlert, Eye, Sparkles, Droplet, Syringe, Check, FileText, Trash2 
} from 'lucide-react';

export default function FormularioComponent() {
  const [servicoSelecionado, setServicoSelecionado] = useState<"lash" | "make" | "pele" | "botox" | "">("");
  const [sucesso, setSucesso] = useState(false);
  const [assinado, setAssinado] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const redimensionarCanvas = () => {
      const ctx = canvas.getContext('2d');
      let desenhoTemporario: ImageData | null = null;
      if (ctx && canvas.width > 0 && canvas.height > 0 && assinado) {
        desenhoTemporario = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#0f172a';
        if (desenhoTemporario) ctx.putImageData(desenhoTemporario, 0, 0);
      }
    };

    const resizeObserver = new ResizeObserver(() => redimensionarCanvas());
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [assinado]);

  const obterCoordenadas = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const iniciarDesenho = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return;
    isDrawing.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const coords = obterCoordenadas(e, canvas);
    if (!coords) return;
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const desenhar = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const coords = obterCoordenadas(e, canvas);
    if (!coords) return;
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setAssinado(true);
  };

  const limparAssinatura = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setAssinado(false);
  };

  if (sucesso) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-800 font-sans antialiased">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="h-16 w-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Ficha Enviada com Sucesso!</h2>
          <p className="text-xs text-slate-500 mt-2">Obrigado por responder. Suas informações já estão salvas na Anamnese Digital.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans py-8 px-4">
      <div className="max-w-xl w-full mx-auto bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Ficha de Anamnese Digital</h1>
          <p className="text-xs text-slate-500 mt-0.5">Por favor, responda com atenção. Seus dados estão protegidos.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); if(!assinado) { alert("Assine o documento."); return; } setSucesso(true); }} className="p-6 space-y-8">
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
            <label className="text-xs font-bold text-blue-900 block mb-2">Selecione o procedimento:</label>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setServicoSelecionado("lash")} className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-semibold transition-all ${servicoSelecionado === 'lash' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}><Eye className="h-3.5 w-3.5" /> Lash Designer</button>
              <button type="button" onClick={() => setServicoSelecionado("make")} className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-semibold transition-all ${servicoSelecionado === 'make' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}><Sparkles className="h-3.5 w-3.5" /> Maquiagem</button>
              <button type="button" onClick={() => setServicoSelecionado("pele")} className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-semibold transition-all ${servicoSelecionado === 'pele' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}><Droplet className="h-3.5 w-3.5" /> Limpeza de Pele</button>
              <button type="button" onClick={() => setServicoSelecionado("botox")} className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-semibold transition-all ${servicoSelecionado === 'botox' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'}`}><Syringe className="h-3.5 w-3.5" /> Botox / Injetáveis</button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><User className="h-3.5 w-3.5" /> 1. Dados Obrigatórios</h2>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Nome Completo</label>
                <input required type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none bg-slate-50/30"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Data de Nascimento</label>
                  <input required type="date" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none bg-slate-50/30"/>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Profissão</label>
                  <input required type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none bg-slate-50/30"/>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">WhatsApp</label>
                <input required type="tel" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none bg-slate-50/30"/>
              </div>
            </div>
          </div>

          {servicoSelecionado === "lash" && (
            <div className="space-y-4 pt-4 border-t border-dashed border-slate-200">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2"><Eye className="h-3.5 w-3.5" /> Bloco Lash Designer</h2>
              <div className="space-y-2 bg-blue-50/30 p-4 rounded-xl border border-blue-100/70 text-xs font-medium text-slate-700">
                <label className="flex items-start gap-3"><input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 h-4 w-4"/> <span>Sofre de claustrofobia?</span></label>
                <label className="flex items-start gap-3"><input type="checkbox" className="mt-0.5 rounded border-slate-300 text-blue-600 h-4 w-4"/> <span>Alergia a cianoacrilato (cola)?</span></label>
              </div>
            </div>
          )}

          {servicoSelecionado === "make" && (
            <div className="space-y-4 pt-4 border-t border-dashed border-slate-200">
              <h2 className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Bloco Maquiagem</h2>
              <div className="space-y-3 bg-purple-50/30 p-4 rounded-xl border border-purple-100/70">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Tipo de pele:</label>
                  <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white"><option>Mista</option><option>Oleosa</option><option>Seca</option><option>Normal</option></select>
                </div>
              </div>
            </div>
          )}

          {servicoSelecionado === "pele" && (
            <div className="space-y-4 pt-4 border-t border-dashed border-slate-200">
              <h2 className="text-xs font-bold text-teal-600 uppercase tracking-widest flex items-center gap-2"><Droplet className="h-3.5 w-3.5" /> Bloco Limpeza de Pele</h2>
              <div className="space-y-2 bg-teal-50/30 p-4 rounded-xl border border-teal-100/70 text-xs font-medium text-slate-700">
                <label className="flex items-start gap-3"><input type="checkbox" className="mt-0.5 rounded border-slate-300 text-teal-600 h-4 w-4"/> <span>Usa Roacutan?</span></label>
                <label className="flex items-start gap-3"><input type="checkbox" className="mt-0.5 rounded border-slate-300 text-teal-600 h-4 w-4"/> <span>Histórico de herpes labial?</span></label>
              </div>
            </div>
          )}

          {servicoSelecionado === "botox" && (
            <div className="space-y-4 pt-4 border-t border-dashed border-slate-200">
              <h2 className="text-xs font-bold text-rose-600 uppercase tracking-widest flex items-center gap-2"><Syringe className="h-3.5 w-3.5" /> Bloco Botox & Injetáveis</h2>
              <div className="space-y-2 bg-rose-50/30 p-4 rounded-xl border border-rose-100/70 text-xs font-medium text-slate-700">
                <label className="flex items-start gap-3"><input type="checkbox" className="mt-0.5 rounded border-slate-300 text-rose-600 h-4 w-4"/> <span>Já realizou aplicação antes?</span></label>
                <label className="flex items-start gap-3"><input type="checkbox" className="mt-0.5 rounded border-slate-300 text-rose-600 h-4 w-4"/> <span>Gestante ou Lactante?</span></label>
              </div>
            </div>
          )}

          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><ShieldAlert className="h-3.5 w-3.5" /> 3. Fechamento Legal</h2>
            <label className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100"><input required type="checkbox" className="mt-1 rounded border-slate-300 text-blue-600 h-4 w-4 shrink-0"/><span className="text-xs text-slate-600 font-medium leading-relaxed">Declaro que as informações são verdadeiras e estou ciente de que a omissão de dados pode comprometer a minha segurança no procedimento.</span></label>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between"><label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-slate-400" /> Assinatura Digital</label>{assinado && ( <button type="button" onClick={limparAssinatura} className="text-[10px] font-bold text-rose-600 flex items-center gap-1 hover:underline"><Trash2 className="h-3 w-3" /> Limpar</button> )}</div>
              <div ref={containerRef} className="border border-slate-200 bg-slate-50/50 rounded-xl overflow-hidden h-32 relative touch-none">
                <canvas ref={canvasRef} className="w-full h-full cursor-crosshair bg-slate-50/20" onMouseDown={iniciarDesenho} onMouseMove={desenhar} onMouseUp={() => isDrawing.current = false} onMouseLeave={() => isDrawing.current = false} onTouchStart={iniciarDesenho} onTouchMove={desenhar} onTouchEnd={() => isDrawing.current = false}/>
                {!assinado && <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[10px] font-bold text-slate-400/80 uppercase tracking-wider">Espaço para assinatura</div>}
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-slate-950 text-white text-xs font-bold py-3.5 rounded-xl shadow-sm hover:bg-slate-800 transition-all">Finalizar e Enviar Anamnese</button>
        </form>
      </div>
    </div>
  );
}
