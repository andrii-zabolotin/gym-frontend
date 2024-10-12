export default function Data({value, onChange}) {
    return (
        <input
            type="date"
            value={value}
            onChange={onChange}
            className="appearance-none leading-tight focus:outline-none border border-gray-300 rounded-3xl p-2 px-5"
        />
    )
}