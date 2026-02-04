// Funcao para mascara de CEP
export function formatarCEP(valor){
  // Remove caracteres (nao numeros)
  valor = valor.replace(/\D/g, '')
  
  // Limita 8 digitos
  valor = valor.slice(0, 8)
  
  // Aplica XXXXX-XXX
  if (valor.length > 5) {
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2')
  }
  
  return valor
}