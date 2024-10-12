export default function Select({children, value, onChange}) {
    return (
        <select
            value={value}
            onChange={onChange}
            className="leading-tight focus:outline-none border border-gray-300 rounded-3xl p-2 px-5"
        >
            {children}
        </select>
    )
}