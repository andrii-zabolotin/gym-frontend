export default function Button({children, onClick, ...props}) {
    return (
        <button className="flex justify-center items-center bg-yellow-300 min-w-[50px] hover:bg-white border border-yellow-300 text-black py-1 px-3 rounded-2xl whitespace-nowrap overflow-hidden text-ellipsis"
                onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}