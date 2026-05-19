"use client";

import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Camera, 
  Save, 
  Building2, 
  Briefcase,
  Check
} from 'lucide-react';

export default function ConfiguracoesPage() {
  const [salvando, setSalvando] = useState(false);
  const [salvoSucesso, setSalvoSucesso] = useState(false);
  
  // Estados do Perfil
  const [nomeNegocio, setNomeNegocio] = useState("Meu Espaço de Beleza");
  const [nicho, setNicho] = useState("Lash Designer");
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lista de profissões mapeadas
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

  // Simula o upload da foto e transforma em Base64 para visualização local
  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    
    // Simula salvamento por 1.5 segundos
    setTimeout(() => {
      setSalvando(false);
      setSalvoSucesso(true);
      setTimeout(() => setSalvoSucesso(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR (DESKTOP) */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 px-4 py-4 md:py-6 md:fixed md:inset-y-0 md:z-20 flex md:flex-col justify-between md:justify-start items-center md:items-stretch gap-4">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Anamnese Digital</span>
        </div>
        
        <nav className="hidden md:flex flex-col mt-10 flex-1 space-y-1">
          <a href="/dashboard" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <LayoutDashboard className="h-4 w-4" /> Início
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <FileText className="h-4 w-4" /> Fichas de Anamnese
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Users className="h-4 w-4" /> Meus Pacientes
          </a>
          <a href="/dashboard/configuracoes" className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600">
            <Settings className="h-4 w-4" /> Configurações
          </a>
        </nav>
      </aside>

      {/* ÁREA CENTRAL */}
      <div className="flex-1 md:pl-64 flex flex-col">
        <main className="p-4 md:p-8 max-w-2xl w-full mx-auto flex-1">
          
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Personalizar Perfil</h1>
            <p className="text-xs text-slate-500 mt-0.5">Defina a identidade do seu negócio para exibir nas fichas enviadas aos clientes.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* SEÇÃO DA FOTO */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col sm:flex-row items-center gap-4">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="h-20 w-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:opacity-80">
                  {fotoPerfil ? (
                    <img src={fotoPerfil} alt="Logo" className="h-full w-full object-cover" />
                  ) : (
                    <Building2 className="h-8 w-8 text-slate-400" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-lg p-1.5 shadow-md border border-white">
                  <Camera className="h-3.5 w-3.5" />
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFotoChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-xs font-bold text-slate-900">Logo ou Foto do Negócio</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Formatos PNG ou JPG. Aparecerá no topo da anamnese do seu cliente.</p>
              </div>
            </div>

            {/* FORMULÁRIO DE INFOS */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
              
              {/* Nome do Negócio */}
              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1 block flex items-center gap-1">
                  <Building2 className="h-3 w-3" /> Nome da Empresa / Espaço
                </label>
                <input 
                  type="text" 
                  required
                  value={nomeNegocio} 
                  onChange={(e) => setNomeNegocio(e.target.value)}
                  placeholder="Ex: Studio VIP Aesthetics" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Nicho / Profissão */}
              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1 block flex items-center gap-1">
                  <Briefcase className="h-3 w-3" /> Seu Nicho de Atuação
                </label>
                <div className="relative">
                  <select 
                    value={nicho} 
                    onChange={(e) => setNicho(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    {profissoesEstetica.map((prof, index) => (
                      <option key={index} value={prof}>{prof}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

            </div>

            {/* BOTÃO SALVAR */}
            <div className="flex items-center justify-end gap-3">
              {salvoSucesso && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 animate-in fade-in duration-200">
                  <Check className="h-4 w-4 stroke-[3]" /> Alterações salvas!
                </span>
              )}
              <button 
                type="submit" 
                disabled={salvando}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-98 transition-all disabled:opacity-50 w-full sm:w-auto justify-center"
              >
                <Save className="h-3.5 w-3.5" />
                {salvando ? "Salvando..." : "Salvar Configurações"}
              </button>
            </div>

          </form>
        </main>

        {/* MENU INFERIOR MOBILE */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30 px-6 py-2 flex items-center justify-around shadow-lg">
          <a href="/dashboard" className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600">
            <LayoutDashboard className="h-4 w-4" />
            <span className="text-[9px] font-medium uppercase tracking-tight">Início</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600">
            <FileText className="h-4 w-4" />
            <span className="text-[9px] font-medium uppercase tracking-tight">Fichas</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600">
            <Users className="h-4 w-4" />
            <span className="text-[9px] font-medium uppercase tracking-tight">Pacientes</span>
          </a>
          <a href="/dashboard/configuracoes" className="flex flex-col items-center gap-0.5 text-blue-600">
            <Settings className="h-4 w-4" />
            <span className="text-[9px] font-bold uppercase tracking-tight">Ajustes</span>
          </a>
        </nav>

        <div className="h-16 md:hidden" />
      </div>
    </div>
  );
}
