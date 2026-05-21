"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Users, Settings, Camera, Save, Building2, Briefcase, Info
} from 'lucide-react';

export default function ConfiguracoesPage() {
  const [salvando, setSalvando] = useState(false);
  const [salvoSucesso, setSalvoSucesso] = useState(false);
  
  // Estados do Perfil
  const [nomeNegocio, setNomeNegocio] = useState("");
  const [nicho, setNicho] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profissoesEstetica = [
    "Lash Designer",
    "Micropigmentadora & Designer de Sobrancelhas",
    "Esteticista Facial / Corporal",
    "Biomédica / Injetora Estética",
    "Especialista em Depilação (Laser/Cera)",
    "Nail Designer",
    "Maquiadora Profissional",
    "Cabeleireira / Terapeuta Capilar",
    "Clínica de Estética Integrada"
  ];

  // CARREGAR DADOS AO ABRIR A PÁGINA
  useEffect(() => {
    const savedNome = localStorage.getItem('anamnese_nomeNegocio') || "Meu Negócio";
    const savedNicho = localStorage.getItem('anamnese_nicho') || "Lash Designer";
    const savedDesc = localStorage.getItem('anamnese_descricao') || "";
    const savedFoto = localStorage.getItem('anamnese_fotoPerfil');

    setNomeNegocio(savedNome);
    setNicho(savedNicho);
    setDescricao(savedDesc);
    if (savedFoto) setFotoPerfil(savedFoto);
  }, []);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFotoPerfil(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    
    // SALVAR NO LOCALSTORAGE
    localStorage.setItem('anamnese_nomeNegocio', nomeNegocio);
    localStorage.setItem('anamnese_nicho', nicho);
    localStorage.setItem('anamnese_descricao', descricao);
    if (fotoPerfil) localStorage.setItem('anamnese_fotoPerfil', fotoPerfil);

    setTimeout(() => {
      setSalvando(false);
      setSalvoSucesso(true);
      setTimeout(() => setSalvoSucesso(false), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 px-4 py-4 md:py-6 md:fixed md:inset-y-0 md:z-20 flex md:flex-col justify-between md:justify-start items-center md:items-stretch gap-4">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Anamnese Digital</span>
        </div>
        <nav className="hidden md:flex flex-col mt-10 flex-1 space-y-1">
          <a href="/dashboard" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"><LayoutDashboard className="h-4 w-4" /> Início</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"><FileText className="h-4 w-4" /> Fichas de Anamnese</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"><Users className="h-4 w-4" /> Meus Pacientes</a>
          <a href="/dashboard/configuracoes" className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600"><Settings className="h-4 w-4" /> Configurações</a>
        </nav>
      </aside>

      <div className="flex-1 md:pl-64 flex flex-col">
        <main className="p-4 md:p-8 max-w-2xl w-full mx-auto flex-1">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Personalizar Perfil</h1>
            <p className="text-xs text-slate-500 mt-0.5">Defina a identidade do seu negócio para as fichas dos clientes.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col sm:flex-row items-center gap-4">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="h-24 w-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400">
                  {fotoPerfil ? (
                    <img src={fotoPerfil} alt="Logo" className="h-full w-full object-cover" />
                  ) : (
                    <Camera className="h-8 w-8 text-slate-300" />
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFotoChange} accept="image/*" className="hidden" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Logo do Espaço</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Toque no quadrado para escolher uma foto da galeria.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-500 mb-1.5 block flex items-center gap-1 uppercase tracking-wider">
                  <Building2 className="h-3.5 w-3.5" /> Nome do Negócio
                </label>
                <input type="text" required value={nomeNegocio} onChange={(e) => setNomeNegocio(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"/>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 mb-1.5 block flex items-center gap-1 uppercase tracking-wider">
                  <Briefcase className="h-3.5 w-3.5" /> Seu Nicho / Profissão
                </label>
                <select value={nicho} onChange={(e) => setNicho(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer">
                  {profissoesEstetica.map((prof, index) => (
                    <option key={index} value={prof}>{prof}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 mb-1.5 block flex items-center gap-1 uppercase tracking-wider">
                  <Info className="h-3.5 w-3.5" /> Bio ou Dados Básicos (Opcional)
                </label>
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Especialista em Lash Lifting há 5 anos..." rows={3} className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"/>
              </div>
            </div>

            <button type="submit" disabled={salvando} className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 w-full sm:w-auto justify-center">
              <Save className="h-4 w-4" />
              {salvando ? "Salvando..." : "Salvar Alterações"}
            </button>
            {salvoSucesso && <p className="text-center sm:text-left text-xs font-bold text-emerald-600 animate-bounce">✓ Perfil updated com sucesso!</p>}
          </form>
        </main>
      </div>
    </div>
  );
}
