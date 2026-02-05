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

	useEffect(() => {
		// Busca automaticamente quando o CEP tiver 8 dígitos
  		const buscarCEPAutomatico = async () => {
			if(formData.cep.replace(/\D/g, '').length === 8) {
				try { 
					const dados = await buscarCEP(formData.cep)
					setFormData(prev => ({
						...prev,
						logradouro: dados.logradouro,
						cidade: dados.localidade,
						estado: dados.uf
					}))
				} catch (erro) {
					console.error(erro.message)
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
		setFormData({
			...formData, // Mantem o valor dos demais campos
			[campo]: valor // Atualiza o campo especifico
		})
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
			/>

			<Input
				label="Complemento"
				input="complemento"
				value={formData.complemento}
				onChange={(e) => handleChange("complemento", e.target.value)}
				placeholder="Ex.: Ao lado do posto."
			/>

			<button  type="button">Buscar CEP</button>
		</form>
	  </div>
  )
}

export default App
