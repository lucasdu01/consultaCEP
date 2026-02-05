import { useState, useEffect } from "react"
import { formatarCEP, buscarCEP } from "../utils/utils"

/**
 * Hook customizado para gerenciar o formulário de consulta de CEP
 * 
 * Responsabilidades:
 * - Gerenciar estados do formulário (dados e erros)
 * - Buscar CEP automaticamente quando completo
 * - Validar campos obrigatórios
 * - Aplicar máscara no CEP
 * 
 * @returns {Object} Objeto contendo:
 *   - formData: dados do formulário
 *   - erros: mensagens de erro por campo
 *   - handleChange: função para atualizar campos
 *   - handleSubmit: função para enviar o formulário
 */
export const useFormularioCep = () => {
	// ==================== ESTADOS ====================

	// Estado para armazenar todos os dados
	const [formData, setFormData] = useState({
		cep: "",
		estado:"",
		cidade: "",
		logradouro: "",
		numero: "",
		complemento: "",
	})

	// Estado para armazenar mensagens de erro
	const [erros, setErros] = useState({})

	// ==================== HELPERS ====================

	// Função auxiliar para limpar erro
	const limparErro = (campo) => {
		setErros(prev => {
			const novosErros = { ...prev }
			delete novosErros[campo]
			return novosErros
		})
	}

    // ==================== EFFECTS ====================

    /**
     * Effect que busca automaticamente o CEP quando completo (8 dígitos)
     * Também valida CEP incompleto e limpa campos quando inválido
     */
	useEffect(() => {
  		const buscarCEPAutomatico = async () => {
			// Remove caracteres não numéricos para validação
			const cepLimpo = formData.cep.replace(/\D/g, '')

			// Valida CEP incompleto (enquanto digita)
    		if (cepLimpo.length > 0 && cepLimpo.length < 8) {
      			setErros(prev => ({
        			...prev,
        			cep: "CEP inválido"
      			}))
      			return
    		}

			// Limpa erro se estiver vazio
			if (cepLimpo.length === 0) {
				limparErro('cep')
			}
			
			// Busca endereço quando CEP estiver completo
			if(cepLimpo.length === 8) {
				// Limpa erro temporariamente antes da busca
				limparErro('cep')

				try { 
					// Consulta API ViaCEP
					const dados = await buscarCEP(cepLimpo)

					// Preenche campos de endereço com os dados retornados
					setFormData(prev => ({
						...prev,
						logradouro: dados.logradouro,
						cidade: dados.localidade,
						estado: dados.uf
					}))
				} catch (erro) {
					// Loga erro no console
					console.error(erro.message)
					
					// Mostra mensagem de erro ao usuário
        			setErros(prev => ({
          				...prev,
          				cep: "CEP inválido"
        			}))

					// Limpa campos de endereço se CEP for inválido
					setFormData(prev => ({
						...prev,
						estado: "",
						cidade: "",
						logradouro: "",
					}))
				}
			}
  		}
		buscarCEPAutomatico()
	}, [formData.cep])	// Executa toda vez que o CEP mudar

	// ==================== HANDLERS ====================

	/**
   	* Atualiza os valores dos campos do formulario
   	* Aplica mascara automaticamente no campo CEP
   	*/
	const handleChange = (campo, valor) => {
		// Se campo CEP, aplica mascara
		if(campo === "cep") {
			valor = formatarCEP(valor)
		}

		// Atualiza o estado mantendo os demais campos
		setFormData(prev => ({
			...prev,
			[campo]: valor
		}))
	}

	// ==================== VALIDAÇÃO ====================

    /**
     * Valida todos os campos obrigatórios do formulário
     * 
     * Campos validados:
     * - CEP: obrigatório
     * - Número: obrigatório, mínimo 1 caractere
     * 
     * @returns {boolean} true se todos os campos são válidos, false caso contrário
     */
	const validarFormulario = () => {
		const novosErros = {}
	
		// Valida CEP obrigatório
		if (!formData.cep || formData.cep.trim().length === 0) {
			novosErros.cep = 'Campo obrigatório'
		}
	
		// Valida Número obrigatório (mínimo 1 caractere)
		if (!formData.numero || formData.numero.trim().length === 0) {
			novosErros.numero = 'Campo obrigatório'
		}
	
		// Atualiza o estado de erros
		setErros(novosErros)
	
		// Retorna true se não houver erros
		return Object.keys(novosErros).length === 0
	}

	/**
     * Função chamada ao submeter o formulário
     * Valida todos os campos e processa os dados se válido
     * 
     * @param {Event} e - Evento de submit do formulário
     */
	const handleSubmit = (e) => {
		// Previne o comportamento padrão (reload da página)
		e.preventDefault()
		if(validarFormulario()) {
			console.log(" Formulário válido!")
    		console.log("Dados:", formData)
    
    		alert("Formulário enviado com sucesso!")
		} else {
			console.log("Formulário invalido - verifique os campos")
		}
	}

	// ==================== RETORNO ====================

	/**
     * Retorna os estados e funções para uso no componente
     */
	return {
        formData,      // Dados do formulário
        erros,         // Erros de validação
        handleChange,  // Função para atualizar campos
        handleSubmit   // Função para enviar formulário
  	}
}