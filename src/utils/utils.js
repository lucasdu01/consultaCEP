// Funcao para mascara de CEP
export function formatarCEP(valor) {
  // Remove caracteres (nao numeros)
  valor = valor.replace(/\D/g, "")
  
  // Limita 8 digitos
  valor = valor.slice(0, 8)
  
  // Aplica XXXXX-XXX
  if (valor.length > 5) {
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2")
  }
  
  return valor
}

export async function buscarCEP(cep) {
	// Remove hifen
	const cepLimpo = cep.replace(/\D/g, "")

	// Valida se tem 8 digitos
	if(cepLimpo.length != 8) {
		throw new Error("CEP deve ter 8 dígitos")
	}

	const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json`)
	const dados = await response.json()

	// Verifica se o CEP existe
	if(dados.erro) {
		throw new Error("CEP não encontrado")
	}

	return dados
}