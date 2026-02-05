import { useState, useEffect } from "react"
import { formatarCEP, buscarCEP } from "./utils/utils"
import "./App.css"
import Input from "./components/Input"

function App() {
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

	// Função auxiliar para limpar erro
	const limparErro = (campo) => {
		setErros(prev => {
			const novosErros = { ...prev }
			delete novosErros[campo]
			return novosErros
		})
	}

	useEffect(() => {
		// Busca automaticamente quando o CEP tiver 8 dígitos
  		const buscarCEPAutomatico = async () => {
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
			
			if(cepLimpo.length === 8) {
				// Limpa erro temporariamente
				limparErro('cep')

				try { 
					const dados = await buscarCEP(cepLimpo)
					setFormData(prev => ({
						...prev,
						logradouro: dados.logradouro,
						cidade: dados.localidade,
						estado: dados.uf
					}))
				} catch (erro) {
					console.error(erro.message)

        			setErros(prev => ({
          				...prev,
          				cep: "CEP inválido"
        			}))

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
	}, [formData.cep])

	/**
   	* Atualiza os valores dos campos do formulario
   	* Aplica mascara automaticamente no campo CEP
   	*/
	const handleChange = (campo, valor) => {
		// Se campo CEP, aplica mascara
		if(campo === "cep") {
			valor = formatarCEP(valor)
		}
		setFormData(prev => ({
			...prev, // Mantem o valor dos demais campos
			[campo]: valor // Atualiza o campo especifico
		}))
	}

	/**
	 * Valida todos os campos obrigatórios do formulário
	 * @returns {boolean} true se válido, false se houver erros
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
 	* Função chamada ao clicar em "Enviar Formulário"
 	* Valida e processa os dados do formulário
 	*/
	const handleSubmit = (e) => {
		e.preventDefault()
		if(validarFormulario()) {
			console.log(" Formulário válido!")
    		console.log("Dados:", formData)
    
    		alert("Formulário enviado com sucesso!")
		} else {
			console.log("Formulário invalido - verifique os campos")
		}
	}
  return (
      <div id="container"> 
	  	<form onSubmit={handleSubmit} noValidate>
			<h1>Consulta de CEP</h1>

			<Input
				label="CEP"
				input="cep"
				required
				value={formData.cep}
				onChange={(e) => handleChange("cep", e.target.value)}
				placeholder="00000-000"
				erro={erros.cep}
			/>

			<Input
				label="Estado"
				input="estado"
				disabled
				value={formData.estado}
			/>

			<Input
				label="Cidade"
				input="cidade"
				disabled
				value={formData.cidade}
			/>

			<Input
				label="Logradouro"
				input="logradouro"
				disabled
				value={formData.logradouro}
			/>

			<Input
				label="Número"
				input="numero"
				required
				value={formData.numero}
				onChange={(e) => handleChange("numero", e.target.value)}
				erro={erros.numero}
			/>

			<Input
				label="Complemento"
				input="complemento"
				value={formData.complemento}
				onChange={(e) => handleChange("complemento", e.target.value)}
				placeholder="Ex.: Ao lado do posto."
			/>

			<button  type="submit">Enviar Formulário</button>
		</form>
	  </div>
  )
}

export default App