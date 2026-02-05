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


  return (
      <div id="container"> 
	  	<form>
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

			<button  type="button">Enviar Formulário</button>
		</form>
	  </div>
  )
}

export default App
