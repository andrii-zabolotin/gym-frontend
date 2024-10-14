import Field from "../Inputs/Field.jsx";
import CustomSelect from "../Inputs/CustomSelect.jsx";
import Date from "../Inputs/Date.jsx";
import DropdownSearch from "../Inputs/Search.jsx";
import Button from "../Button.jsx";

const OLD_AttendanceFilters = ({
    userId, setUserId, userSubscriptionId, setUserSubscriptionId, 
    trainingType, setTrainingType, trainingTypes, setTrainerId, 
    trainers, date, setDate, updateQueryParams, clearQueryParams 
}) => (
    <div className="flex flex-wrap">
        <div className="flex w-full lg:w-5/6 mb-4 md:mb-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-y-0 lg:gap-x-2 w-full">
                <Field placeholder="ID Користувача" value={userId} onChange={(e) => setUserId(e.target.value)} />
                <Field placeholder="ID Підписки" value={userSubscriptionId} onChange={(e) => setUserSubscriptionId(e.target.value)} />
                
                <CustomSelect value={trainingType} onChange={(e) => setTrainingType(e.target.value)}>
                    <option value="">Тип тренування</option>
                    {trainingTypes && trainingTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </CustomSelect>

                <DropdownSearch setOption={setTrainerId} options={trainers && trainers.map(trainer => ({
                    id: trainer.id, name: `${trainer.first_name} ${trainer.last_name}`,
                }))} />

                <Date value={date} onChange={(e) => setDate(e.target.value)} />

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
);

export default OLD_AttendanceFilters;
