export default function Field({placeholder, value, disabled, errors= {}, ...props}) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value || ""}
            disabled={disabled}
            className={`appearance-none focus:outline-none leading-tight border rounded-2xl p-2 px-5 
                ${disabled ? 'text-gray-400 bg-gray-50 border-gray-300' : ''}
                ${errors[props.id] ? 'border border-red-500 text-red-500' : ''}`
        }
            {...props}
        />
    )
}