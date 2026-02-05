import "./App.css"
import Input from "./components/Input"
import { useFormularioCep } from "./hooks/useFormularioCep"

function App() {
	const { formData, erros, handleChange,handleSubmit } = useFormularioCep()	
  	return (
      	<div id="container"> 
	  		<form onSubmit={handleSubmit} noValidate>
				<h1>Consulta de CEP</h1>

				<Input
					label="CEP"
					id="cep"
					required
					value={formData.cep}
					onChange={(e) => handleChange("cep", e.target.value)}
					placeholder="00000-000"
					erro={erros.cep}
				/>

				<Input
					label="Estado"
					id="estado"
					disabled
					value={formData.estado}
				/>

				<Input
					label="Cidade"
					id="cidade"
					disabled
					value={formData.cidade}
				/>

				<Input
					label="Logradouro"
					id="logradouro"
					disabled
					value={formData.logradouro}
				/>

				<Input
					label="Número"
					id="numero"
					required
					value={formData.numero}
					onChange={(e) => handleChange("numero", e.target.value)}
					erro={erros.numero}
				/>

				<Input
					label="Complemento"
					id="complemento"
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