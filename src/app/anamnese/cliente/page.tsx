"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  User, ShieldAlert, Eye, Sparkles, Droplet, Syringe, Check, FileText, Trash2 
} from 'lucide-react';

export default function FormularioAnamneseClientePage() {
  const [servicoSelecionado, setServicoSelecionado] = useState<"lash" | "make" | "pele" | "botox" | "">("");
  const [sucesso, setSucesso] = useState(false);
  const [assinado, setAssinado] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawing = useRef(false);

  // --- AJUSTE DINÂMICO DE RESOLUÇÃO DO CANVAS ---
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    const redimensionarCanvas = () => {
      // Guarda o desenho atual antes de redimensionar (opcional)
      const ctx = canvas.getContext('2d');
      let desenhoTemporario: ImageData | null = null;
      if (ctx && canvas.width > 0 && canvas.height > 0 && assinado) {
        desenhoTemporario = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }

      // Define a resolução interna baseada no tamanho real do container na tela
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      // Restaura o desenho e reconfigura o estilo do traço
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#0f172a';
        if (desenhoTemporario) {
          ctx.putImageData(desenhoTemporario, 0, 0);
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => redimensionarCanvas());
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [assinado]);

  // --- AUXILIAR PARA CAPTURAR COORDENADAS (MOUSE OU TOUCH) ---
  const obterCoordenadas = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    
    // Verifica se é um evento de Touch (Mobile) ou Mouse (Desktop)
    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  // --- LÓGICA DO CANVAS DE ASSINATURA ---
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
          
          {/* SELETOR DINÂMICO DE PROCEDIMENTO */}
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
              <textarea placeholder="Liste allergies a medicamentos, cosméticos, látex, iodo ou metais..." rows={2} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500 bg-slate-50/30 transition-all resize-none"/>
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

          {/* 2. BLOCOS MODULARES DINÂMICOS */}
          
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
                  <label className="text-
