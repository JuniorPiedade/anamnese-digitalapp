import { supabase } from "../../../../supabaseClient";

// Dentro do seu componente, na função de salvar a ficha:
const salvarFicha = async (dadosDaAnamnese: any) => {
  const { data, error } = await supabase
    .from('anamneses') // Nome da tabela que você criou no painel do Supabase
    .insert([dadosDaAnamnese])

  if (error) {
    alert('Erro ao salvar no banco de dados: ' + error.message)
  } else {
    alert('Ficha salva com sucesso no Supabase!')
  }
}
