import {useEffect, useState} from 'react';
import Field from "./Inputs/Field.jsx";
import CustomDate from "./Inputs/CustomDate.jsx";
import CustomSelect from "./Inputs/CustomSelect.jsx";
import DropdownSearch from "./Inputs/Search.jsx";
import Button from "./Button.jsx";
import Checkmark from "./Inputs/Checkmark.jsx";

export default function FilterForm({fields, initialFilters, onSubmit, onClear}) {
    /*
    At the very beginning, the form does not know what values will be in the fields,
    so the filters state is initialized as an empty object: useState({}).
     */
    const [filters, setFilters] = useState({});

    /*
    When the component is loaded, useEffect checks to see if the initial filters
    are passed through the initialFilters prop. If they are, the form's state is
    updated with these values.
    This allows to fill the form with values from URL or other external data.
     */
    useEffect(() => {
        if (initialFilters) {
            setFilters(initialFilters);
        }
    }, [initialFilters]);

    // Tracks input into a field and updates the corresponding value in the filters state.
    const handleChange = (e) => {
        // Destructuring the event object.
        const {name, value} = e.target;
        // Set new value for field with saving previous data.
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    /*
    For special components (DropdownSearch or Date), which have their own
    selection method, a separate handler is used.

    "name" - is the name of the filter you are updating ('trainer', 'date', etc.).
    "value" - is the new value for this filter (for example, selected coach or selected date).
     */
    const handleCustomChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Processing Form Submissions.
    const handleSubmit = (e) => {
        e.preventDefault();
        // Passes filters back to the outside via the onSubmit function, which comes from props.
        onSubmit(filters);
    };

    // Clearing the form.
    const handleClear = () => {
        // Clearing all form fields.
        setFilters({});
        // Clearing query parameters in the URL via callback:
        if (onClear) onClear();
    };

    const handleCheckmarkChange = (name) => {
        // Switch checkbox state
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: !prevFilters[name],
        }));
    };

    return (
        <div className="flex flex-wrap">
            <div className="flex w-full lg:w-5/6 mb-4 md:mb-0">
                <form onSubmit={handleSubmit}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-y-0 lg:gap-x-2 w-full">
                    {fields.map((field, index) => {
                        switch (field.type) {
                            case 'text':
                                return (
                                    <Field
                                        key={index}
                                        placeholder={field.placeholder}
                                        name={field.name}
                                        value={filters[field.name] || ''}
                                        onChange={handleChange}
                                    />
                                );
                            case 'select':
                                return (
                                    <CustomSelect
                                        key={index}
                                        value={filters[field.name] || ''}
                                        onChange={(e) => handleCustomChange(field.name, e.target.value)}
                                    >
                                        <option value="">{field.placeholder}</option>
                                        {field.options.map(option => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </CustomSelect>
                                );
                            case 'search':
                                return (
                                    <DropdownSearch
                                        key={index}
                                        setOption={(value) => handleCustomChange(field.name, value)}
                                        options={field.options.map(option => ({
                                            id: option.id,
                                            name: option.name,
                                        }))}
                                    />
                                );
                            case 'date':
                                return (
                                    <CustomDate
                                        key={index}
                                        value={filters[field.name] || ''}
                                        onChange={(e) => handleCustomChange(field.name, e.target.value)}
                                    />
                                );
                            case 'checkmark':
                                return (
                                    <Checkmark
                                        key={index}
                                        name={field.name}
                                        checked={!!filters[field.name]}
                                        onChange={() => handleCheckmarkChange(field.name)}
                                        label={field.label} // Предполагаем, что у вас есть поле label для отображения текста чекбокса
                                    />
                                );
                            default:
                                return null;
                        }

                    })}
                    <div className="w-full grid grid-cols-2 gap-2 lg:hidden">
                        <Button onClick={handleSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </Button>
                        <Button onClick={handleClear}>Clear</Button>
                    </div>
                </form>
            </div>
            <div className="pl-2 hidden lg:flex justify-end w-full lg:w-1/6">
                <div className="w-full grid grid-cols-2 gap-2">
                    <Button onClick={handleSubmit}
                            className="flex justify-center items-center bg-white hover:border min-w-[50px] text-black py-1 px-3 rounded-2xl whitespace-nowrap overflow-hidden text-ellipsis">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFC40C"
                             className="bi bi-search size-5" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </Button>
                    <Button onClick={handleClear}
                            className="flex justify-center items-center bg-white hover:border min-w-[50px] text-black py-1 px-3 rounded-2xl whitespace-nowrap overflow-hidden text-ellipsis">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFC40C"
                             className="bi bi-trash-fill size-5" viewBox="0 0 16 16">
                            <path
                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
}
