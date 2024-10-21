import {useEffect, useRef, useState} from "react";
import Field from "./Field.jsx";

export default function DropdownSearch({options, setOption}) {
    const params = new URLSearchParams(location.search);
    const trainer = options?.find(option => option.id.toString() === params.get("trainer_id"));
    const dropdownRef = useRef(null);
    const [searchValue, setSearchValue] = useState(trainer && trainer.name);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        document.addEventListener("mousedown", handleClick, false)
        return () => document.removeEventListener("mousedown", handleClick, false)
    }, []);

    const filterItems = () => {
        return (searchValue ?
                options.filter(option =>
                    option.name.toLowerCase().includes(searchValue.toLowerCase())
                ) : options
        )
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value)
        if (!visible) {
            setVisible(true)
        }
    };

    const handleClick = (e) => {
        if (dropdownRef.current?.contains(e.target)) {
            return null;
        }
        setVisible(false)
    };

    const handleSelect = (item) => {
        setSearchValue(item.name)
        setOption(item.id)
        setVisible(false)
    }

    return (
        <div className="relative w-full">
            <Field
                type="text"
                value={searchValue}
                placeholder="Тренер"
                onChange={handleChange}
                onFocus={() => {
                    setVisible(true)
                }}
                className={`w-full h-full appearance-none leading-tight focus:outline-none border border-gray-300 ${visible ? "rounded-t-2xl" : "rounded-2xl"} p-2 px-5`}
            />
            {visible && (
                <div ref={dropdownRef} className={`dropdown absolute w-full max-w-[sm] max-h-[250px] overflow-x-hidden border border-gray-400 bg-white rounded-b-2xl`}>
                    <ul>
                        {options && (
                            filterItems().map(option => (
                                <li key={option.id} onClick={() => handleSelect(option)} className="w-full p-3 cursor-pointer border-b border-gray-400 last:border-none hover:bg-gray-90">
                                    {option.name}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}
