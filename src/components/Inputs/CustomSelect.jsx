export default function CustomSelect({children, value, onChange, disabled,...props}) {
    return (
        <select
            value={value || ""}
            onChange={onChange}
            disabled={disabled}
            className={`appearance-none focus:outline-none leading-tight border rounded-2xl p-2 px-5 
            ${disabled ? 'text-gray-400 bg-gray-50 border-gray-300' : ''}`}
            {...props}
        >
            {children}
        </select>
    )
}