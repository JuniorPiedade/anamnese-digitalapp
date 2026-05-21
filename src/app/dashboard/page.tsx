"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Users, Plus, Search, Copy, Share2, Check, Settings, Calendar, Clock, X
} from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<any | null>(null);
  const [primeiroNome, setPrimeiroNome] = useState("Profissional");
  
  const [perfil, setPerfil] = useState({
    nome: "Anamnese Digital",
    nicho: "Gestão Estética",
    foto: ""
  });

  useEffect(() => {
    const nome = localStorage.getItem('anamnese_nomeNegocio') || "Anamnese Digital";
    const nicho = localStorage.getItem('anamnese_nicho') || "Gestão Estética";
    const foto = localStorage.getItem('anamnese_fotoPerfil') || "";
    
    setPerfil({ nome, nicho, foto });
    setPrimeiroNome(nome.trim().split(' ')[0]);
  }, []);

  const LINK_ANAMNESE = "https://anamnese-digitalapp.vercel.app/anamnese/cliente";
  const MENSAGEM_WHATSAPP = encodeURIComponent(`Olá! Por favor, preencha sua ficha digital:\n${LINK_ANAMNESE}`);

  const copiarLink = () => {
    navigator.clipboard.writeText(LINK_ANAMNESE);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const fichasExemplo = [
    { 
      id: "1", 
      paciente: "Mariana Silva", 
      procedimento: "Toxina Botulínica", 
      data: "19/05/2026", 
      status: "Assinado",
      historico: [
        { data: "19/05/2026", evento: "Retorno e aplicação de reforço em região de glabela." },
        { data: "05/05/2026", evento: "Primeira Anamnese Digital preenchida via WhatsApp." }
      ]
    },
    { 
      id: "2", 
      paciente: "Beatriz Costa", 
      procedimento: "Preenchimento Labial", 
      data: "18/05/2026", 
      status: "Assinado",
      historico: [
        { data: "18/05/2026", evento: "Preenchimento Labial com 1ml de Ácido Hialurônico." }
      ]
    },
  ];

  const fichasFiltradas = fichasExemplo.filter(ficha => 
    ficha.paciente.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ficha.procedimento.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // DIV PAI: Controla a direção global (coluna no celular, linha no PC)
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-slate-50 text-slate-800 antialiased font-sans">
      
      {/* 1. SIDEBAR / TOPO COMPARTILHADO */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 px-5 py-4 md:py-6 flex md:flex-col justify-between md:justify-start items-center md:items-stretch gap-4 shrink-0">
        {/* Identificação do Usuário */}
        <div className="flex items-center gap-3 w-full px-1">
          <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
            {perfil.foto ? <img src={perfil.foto} className="h-full w-full object-cover" alt="Perfil" /> : <FileText className="text-blue-600 h-5 w-5" />}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-bold text-slate-900 truncate block w-full">{perfil.nome}</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight truncate block w-full mt-0.5">{perfil.nicho}</span>
          </div>
        </div>
        
        {/* Menu de Navegação - Visível APENAS no PC */}
        <nav className="hidden md:flex flex-col mt-8 space-y-1 w-full">
          <a href="#" className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600"><LayoutDashboard className="h-4 w-4 shrink-0" /> Início</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"><FileText className="h-4 w-4 shrink-0" /> Fichas</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm
