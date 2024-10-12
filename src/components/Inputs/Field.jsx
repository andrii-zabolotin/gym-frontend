export default function Field({placeholder, value, onChange}) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="appearance-none leading-tight focus:outline-none border border-gray-300 rounded-3xl p-2 px-5"
        />
    )
}