"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  User, 
  ShieldCheck, 
  HeartPulse 
} from "lucide-react";
// Importação corrigida subindo os 4 níveis até a raiz do código
import { supabase } from "../../../../supabaseClient";

export default function AnamneseClientePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fichaId = searchParams.get("id");

  // Estados de controle da página
  const [carregando, setCarregando] = useState(true);
  const [fichaEncontrada, setFichaEncontrada] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  // Dados trazidos da triagem inicial
  const [dadosTriagem, setDadosTriagem] = useState({
    nome: "",
    procedimento: "",
  });

  // Respostas extras que o cliente vai preencher na tela
  const [historicoMedico, setHistoricoMedico] = useState("");
  const [gestanteOuLactante, setGestanteOuLactante] = useState("nao");
  const [jaFezProcedimento, setJaFezProcedimento] = useState("nao");
  const [aceitaTermos, setAceitaTermos] = useState(false);

  // 1. Busca os dados iniciais que você gerou lá no Dashboard
  useEffect(() => {
    async function carregarFichaInicial() {
      if (!fichaId) {
        setErro("Código identificador da ficha não foi fornecido.");
        setCarregando(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("cadastros")
          .select("nome, procedimento")
          .eq("id", fichaId)
          .single();

        if (error || !data) {
          setErro("Ficha não localizada ou já expirada.");
        } else {
          setDadosTriagem({
            nome: data.nome,
            procedimento: data.procedimento,
          });
          setFichaEncontrada(true);
        }
      } catch (err) {
        setErro("Erro de conexão ao buscar os dados da ficha.");
      } finally {
        setCarregando(false);
      }
    }

    carregarFichaInicial();
  }, [fichaId]);

  // 2. Atualiza a ficha no banco de dados com as respostas finais do paciente
  const salvarFicha = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!aceitaTermos) {
      setErro("Você precisa aceitar os termos de consentimento e responsabilidade.");
      return;
    }

    setCarregando(true);

    try {
      // Monta as atualizações adicionando as respostas ao prontuário
      const dadosDaAnamnese = {
        status: "Concluído",
        alergias: `Histórico médico/Alergias informado pelo cliente: ${historicoMedico || "Nenhum histórico crítico relatado"}`,
        observacoes: `Gestante/Lactante: ${gestanteOuLactante.toUpperCase()} | Já realizou antes: ${jaFezProcedimento.toUpperCase()}`,
      };

      const { error } = await supabase
        .from("cadastros")
        .update(dadosDaAnamnese)
        .eq("id", fichaId);

      if (error) {
        setErro("Erro ao salvar suas respostas no banco de dados: " + error.message);
      } else {
        setSucesso(true);
      }
    } catch (err) {
      setErro("Ocorreu um erro inesperado ao salvar o formulário.");
    } finally {
      setCarregando(false);
    }
  };

  // Estado de Carregamento Inicial
  if (carregando && !fichaEncontrada && !sucesso) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-slate-500 font-medium">Carregando formulário de anamnese...</p>
        </div>
      </div>
    );
  }

  // Tela de Sucesso após o cliente responder e assinar
  if (sucesso) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-800 antialiased font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm space-y-6">
          <div className="h-16 w-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Ficha Preenchida com Sucesso!
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Obrigada, <strong>{dadosTriagem.nome}</strong>. Seus dados foram enviados com total segurança e o profissional já foi notificado.
            </p>
          </div>
          <p className="text-xs text-slate-400">Você já pode fechar esta aba no seu navegador.</p>
        </div>
      </div>
    );
  }

  // Tela de Erro se o ID for inválido ou não for encontrado
  if (erro && !fichaEncontrada) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-slate-800 antialiased font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm space-y-4">
          <div className="h-12 w-12 bg-red-50 text-red-600 flex items-center justify-center rounded-full mx-auto">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Não foi possível carregar a página</h2>
          <p className="text-sm text-slate-500 leading-relaxed">{erro}</p>
        </div>
      </div>
    );
  }

  // Layout Oficial do Formulário do Cliente
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans py-8 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* CABEÇALHO */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-2xl shrink-0">
            <HeartPulse className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {dadosTriagem.procedimento || "Procedimento"}
            </span>
            <h1 className="text-lg font-bold text-slate-900 mt-1">Ficha de Anamnese Digital</h1>
          </div>
        </div>

        {/* FORMULÁRIO PRINCIPAL */}
        <form onSubmit={salvarFicha} className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 space-y-6">
            
            {erro && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 rounded-2xl p-4">
                <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                <span className="text-sm">{erro}</span>
              </div>
            )}

            {/* IDENTIFICAÇÃO DO PACIENTE */}
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Paciente</label>
              <div className="flex items-center gap-2 text-slate-800 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-semibold">{dadosTriagem.nome}</span>
              </div>
            </div>

            {/* QUESTÕES DE ANAMNESE */}
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Histórico de saúde, alergias a cosméticos/medicamentos ou restrições importantes:
                </label>
                <textarea
                  rows={3}
                  value={historicoMedico}
                  onChange={(e) => setHistoricoMedico(e.target.value)}
                  placeholder="Ex: Alergia a esmalte, restrições com ácidos, uso contínuo de colírios..."
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none resize-none focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Está gestante ou lactante?</label>
                  <select
                    value={gestanteOuLactante}
                    onChange={(e) => setGestanteOuLactante(e.target.value)}
                    className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm bg-white outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="nao">Não</option>
                    <option value="sim">Sim</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Já realizou esse serviço antes?</label>
                  <select
                    value={jaFezProcedimento}
                    onChange={(e) => setJaFezProcedimento(e.target.value)}
                    className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm bg-white outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="nao">Não, primeira vez</option>
                    <option value="sim">Sim, já tenho costume</option>
                  </select>
                </div>
              </div>
            </div>

            {/* TERMO DE RESPONSABILIDADE */}
            <div className="border-t border-slate-100 pt-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-800 mb-1">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Consentimento Informado</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                Declaro para os devidos fins que as informações acima são verdadeiras e completas. Estou ciente de que omitir fatos de saúde pode interferir diretamente no resultado estético e na minha integridade biológica durante e após o procedimento.
              </p>
              <label className="flex items-start gap-3 pt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={aceitaTermos}
                  onChange={(e) => setAceitaTermos(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-600 font-medium leading-relaxed">
                  Confirmo que revisei os dados acima e autorizo a realização do procedimento estético com base nas informações fornecidas.
                </span>
              </label>
            </div>

          </div>

          {/* BOTÃO SUBMIT */}
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <button
              type="submit"
              disabled={carregando}
              className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all disabled:bg-slate-300 flex items-center justify-center gap-2"
            >
              {carregando ? "Salvando informações..." : "Confirmar e Enviar Ficha"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
