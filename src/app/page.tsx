import React from 'react';
import { ClipboardCheck, ShieldCheck, Users, ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-blue-500 selection:text-white">
      
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Anamnese Digital
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#recursos" className="hover:text-blue-600 transition-colors">Recursos</a>
            <a href="#beneficios" className="hover:text-blue-600 transition-colors">Benefícios</a>
            <a href="#suporte" className="hover:text-blue-600 transition-colors">Suporte</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Entrar
            </button>
            <button className="group relative flex items-center gap-1 overflow-hidden rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800">
              Acessar Painel
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-20 text-center lg:py-28">
          <div className="mx-auto flex max-w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold text-blue-700 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 fill-blue-200" />
            <span>Nova era na estética profissional</span>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl max-w-3xl mx-auto leading-[1.15]">
            Fichas de anamnese inteligentes para{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              profissionais de estética
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Elimine a papelada. Crie, gerencie e assine fichas de anamnese personalizadas de forma digital, rápida e com total segurança jurídica para a sua clínica.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:opacity-95 hover:shadow-xl hover:shadow-blue-500/20">
              Começar Agora Grátis
            </button>
            <button className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-colors">
              Ver Demonstração
            </button>
          </div>
        </section>

        {/* 3. CARDS DE RECURSOS */}
        <section id="recursos" className="py-16 border-t border-slate-200/60">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Card 1 */}
            <div className="group rounded-2xl border border-slate-200/80 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-md hover:shadow-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <ClipboardCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">Fichas Inteligentes</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Formulários dinâmicos adaptados para procedimentos corporais, faciais e injetáveis, preenchidos em segundos.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl border border-slate-200/80 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-md hover:shadow-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">Segurança e Assinatura</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Assinatura digital na tela do tablet ou celular com armazenamento em nuvem criptografado e em conformidade com a LGPD.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-2xl border border-slate-200/80 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-md hover:shadow-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">Histórico de Pacientes</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Acompanhe a evolução do paciente, visualize termos de consentimento e compare fichas anteriores em um clique.
              </p>
            </div>

          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-8 text-center text-xs font-medium text-slate-500">
        <p>&copy; 2026 Anamnese Digital. Desenvolvido com sofisticação para clínicas e estetas.</p>
      </footer>

    </div>
  );
}
