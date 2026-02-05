/**
 * Formata CEP no padrao (00000-000)
 * Remove caracteres nao numericos e adiciona hifen automaticamente
 * @param {string} valor - CEP digitado pelo usuario
 * @returns {string} CEP formatado (ex: "12345-678")
 */
export function formatarCEP(valor) {
  // Remove caracteres nao numeros
  valor = valor.replace(/\D/g, "")
  
  // Limita 8 digitos
  valor = valor.slice(0, 8)
  
  // Aplica XXXXX-XXX quando mais de 5 digitos
  if (valor.length > 5) {
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2")
  }
  
  // Retorna o CEP formatado
  return valor
}

/**
 * Busca informacoes de endereco com a API ViaCEP
 * @param {string} cep - CEP a ser consultado
 * @returns {Promise<Object>} Objeto com dados do endereço (logradouro, localidade, uf, etc)
 */
export async function buscarCEP(cep) {

	// Valida se tem 8 digitos
	if(cep.length != 8) {
		throw new Error("CEP deve ter 8 dígitos")
	}

	// Faz a requisicao para a API e armazena a resposta
	const response = await fetch(`https://viacep.com.br/ws/${cep}/json`)
	// Converte a resposta em um objeto e armazena os dados
	const dados = await response.json()

	 // Verifica se a API retornou erro
	if(dados.erro) {
		throw new Error("CEP nao encontrado")
	}

	// Retorna o objeto de resposta
	return dados
}