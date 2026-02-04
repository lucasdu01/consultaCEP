import "./App.css"
import "./components/Input"
import Input from "./components/Input"

function App() {
  return (
      <div id="container"> 
	  	<form>
			<h1>Consulta de CEP</h1>

			<Input
				label="CEP"
				input="cep"
				required
			/>

			<Input
				label="Estado"
				input="estado"
				disabled
			/>

			<Input
				label="Cidade"
				input="cidade"
				disabled
			/>

			<Input
				label="Logradouro"
				input="logradouro"
				disabled
			/>

			<Input
				label="Número"
				input="numero"
				required
			/>

			<Input
				label="Complemento"
				input="complemento"
			/>



			<button>Buscar CEP</button>
		</form>
	  </div>
  )
}

export default App
