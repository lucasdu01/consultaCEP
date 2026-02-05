import "./index.css"

/**
 * Componente Input reutilizavel
 * Integra label e input com suas propriedades
 * @param {string} label - Texto do label
 * @param {string} id - ID do input
 * @param {string} type - Tipo do input (text, number, etc)
 * @param {boolean} disabled - Se o campo esta desabilitado
 * @param {boolean} required - Se o campo e obrigatorio
 * @param {string} value - Valor atual do input
 * @param {function} onChange - Funçao chamada ao alterar o valor
 * @param {string} placeholder - Texto placeholder
 */

function Input({ label, id, type="text", disabled=false, required=false, value, onChange, placeholder, erro }) {
	return(
		<div className="input-group">
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={type}
				disabled={disabled}
				required={required}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
			{erro && <span className="mensagem-erro">* {erro}</span>}
		</div>
	)
}

export default Input