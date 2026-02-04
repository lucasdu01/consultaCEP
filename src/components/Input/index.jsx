import "./index.css"

function Input({ label, id, type="text", disabled=false, required=false, value, onChange }) {
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
			/>
		</div>
	)
}

export default Input