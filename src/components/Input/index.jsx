import "./index.css"

function Input({ label, id, type="text", disabled=false, required=false, value, onChange, placeholder }) {
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
		</div>
	)
}

export default Input