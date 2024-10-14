import Button from "./Button.jsx";

const FiltersBase = ({children, updateQueryParams, clearQueryParams}) => {
    return (
        <div className="flex flex-wrap">
            <div className="flex w-full lg:w-5/6 mb-4 md:mb-0">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-y-0 lg:gap-x-2 w-full"
                >

                    {children}

                    <div className="w-full grid grid-cols-2 gap-2 lg:hidden">
                        <Button onClick={updateQueryParams}>Search</Button>
                        <Button onClick={clearQueryParams}>Clear</Button>
                    </div>
                </div>
            </div>

            <div className="pl-2 hidden lg:flex justify-end w-full lg:w-1/6">
                <div className="w-full grid grid-cols-2 gap-2">
                    <Button onClick={updateQueryParams}>Search</Button>
                    <Button onClick={clearQueryParams}>Clear</Button>
                </div>
            </div>
        </div>
    )
}

export default FiltersBase;
