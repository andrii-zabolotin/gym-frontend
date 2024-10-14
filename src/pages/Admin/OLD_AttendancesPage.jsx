import {useEffect, useState} from "react";
import {useAuth} from "../../hook/useAuth.jsx";
import api from "../../../axios.config.js";
import Loader from "../../components/Loader.jsx";
import {useLocation} from "react-router-dom";
import Field from "../../components/Inputs/Field.jsx";
import CustomSelect from "../../components/Inputs/CustomSelect.jsx";
import Date from "../../components/Inputs/Date.jsx";
import Button from "../../components/Button.jsx";
import DropdownSearch from "../../components/Inputs/Search.jsx";

export default function Attendances() {
    const [loading, setLoading] = useState(false)
    const [attendances, setAttendances] = useState(null)
    const [trainers, setTrainers] = useState(null)
    const {token} = useAuth();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [userId, setUserId] = useState(params.get("user_id"));
    const [userSubscriptionId, setUserSubscriptionId] = useState(params.get("subscription_id"));
    const [trainingType, setTrainingType] = useState(params.get("training_type"));
    const [trainerId, setTrainerId] = useState(params.get("trainer"));
    const [date, setDate] = useState(params.get("date"));
    const [trainingTypes, setTrainingTypes] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)

    async function fetchTrainingTypes() {
        setLoading(true);
        await api.get('training-types/')
            .then(res => {
                setTrainingTypes(res.data);
            })
            .catch(err => {
                console.error("Error fetching training-types:", err);
            })
        setLoading(false);
    }

    async function fetchTrainers() {
        setLoading(true);
        await api.get('user/list/', {
            params: {
                group: 1
            }
        })
            .then(res => {
                setTrainers(res.data);
            })
            .catch(err => {
                console.error("Error fetching training-types:", err);
            })
        setLoading(false);
    }

    // Функция для обновления query params в URL
    const updateQueryParams = () => {
        if (userId) {
            params.set('user_id', userId);
        } else {
            params.delete('user_id');
        }

        if (userSubscriptionId) {
            params.set('user_subscription_id', userSubscriptionId);
        } else {
            params.delete('user_subscription_id');
        }

        if (trainingType) {
            params.set('training_type', trainingType);
        } else {
            params.delete('training_type');
        }

        if (trainerId) {
            params.set('trainer_id', trainerId);
        } else {
            params.delete('trainer_id');
        }

        if (date) {
            params.set('date', date);
        } else {
            params.delete('date');
        }

        setCurrentPage(1)

        // Обновляем URL без перезагрузки страницы
        window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);

        fetchAttendances();
    };

    const clearQueryParams = () => {
        setUserId(null);
        setUserSubscriptionId(null);
        setTrainingType("");
        setTrainerId(null);
        setDate(null);

        params.delete('user_id');
        params.delete('user_subscription_id');
        params.delete('training_type');
        params.delete('trainer_id');
        params.delete('date');

        window.history.pushState({}, '', `${location.pathname}`);

        async function fetchAttendances() {
            setLoading(true);
            await api.get('attendances/', {
                headers: {
                    Authorization: `Token ${token}`
                },
                params: {
                    limit: 10,
                    offset: 10
                }
            })
                .then(res => {
                    setAttendances(res.data);
                })
                .catch(err => {
                    console.error("Error fetching attendances:", err);
                });
            setLoading(false);
        }

        fetchAttendances();

    };

    async function fetchAttendances() {
        setLoading(true);
        const params = {
            limit: 10,
            offset: (currentPage - 1) * 10
        }

        if (userId) params.user_id = userId;
        if (userSubscriptionId) params.user_subscription_id = userSubscriptionId;
        if (trainingType) params.training_type = trainingType;
        if (trainerId) params.trainer_id = trainerId;
        if (date) params.date = date;

        await api.get('attendances/', {
            headers: {
                Authorization: `Token ${token}`
            },
            params: params
        })
            .then(res => {
                setAttendances(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.error("Error fetching attendances:", err);
            });
        setLoading(false);
    }

    useEffect(() => {
        fetchAttendances();
        fetchTrainingTypes();
        fetchTrainers();
    }, [currentPage]);

    if (loading) {
        return (
            <Loader></Loader>
        )
    }

    return (
        <>
            <div className="flex flex-wrap">
                <div className="flex w-full lg:w-5/6 mb-4 md:mb-0">
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-y-0 lg:gap-x-2 w-full"
                    >
                        <Field placeholder="ID Користувача" value={userId} onChange={(e) => setUserId(e.target.value)}/>
                        <Field placeholder="ID Підписки" value={userSubscriptionId}
                               onChange={(e) => setUserSubscriptionId(e.target.value)}/>
                        <CustomSelect value={trainingType} onChange={(e) => setTrainingType(e.target.value)}>
                            <option value="">Тип тренування</option>
                            {trainingTypes && (
                                <>
                                    {trainingTypes.map((type) => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </>
                            )}
                        </CustomSelect>
                        <DropdownSearch setOption={setTrainerId} options={
                            trainers && trainers.map((trainer) => ({
                                id: trainer.id,
                                name: trainer.first_name + " " + trainer.last_name,
                            }))
                        }/>
                        <Date value={date} onChange={(e) => setDate(e.target.value)}/>
                        <div className="w-full grid grid-cols-2 gap-2 lg:hidden">
                            <Button onClick={() => updateQueryParams()}>Search</Button>
                            <Button onClick={() => clearQueryParams()}>Clear</Button>
                        </div>
                    </div>
                </div>

                <div className="pl-2 hidden lg:flex justify-end w-full lg:w-1/6">
                    <div className="w-full grid grid-cols-2 gap-2">
                        <Button onClick={() => updateQueryParams()}>Search</Button>
                        <Button onClick={() => clearQueryParams()}>Clear</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-end space-x-5">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    {attendances && (`Showing page ${currentPage} of ${Math.ceil(attendances?.count / 10)}`)}
                </span>

                <div className="inline-flex">
                    <button
                        disabled={currentPage === 1}  // Отключаем кнопку на первой странице
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className={`${
                            currentPage === 1
                                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-900 dark:hover:bg-gray-700 dark:text-white"
                        } flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-s dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                    >
                        Prev
                    </button>

                    <button
                        disabled={currentPage === Math.ceil(attendances?.count / 10)}  // Отключаем кнопку на последней странице
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={`${
                            currentPage === Math.ceil(attendances?.count / 10)
                                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-900 dark:hover:bg-gray-700 dark:text-white"
                        } flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-center">
                    <thead>
                    <tr className="bg-gray-90">
                        <th className="px-4 py-2 font-normal rounded-tl-2xl">ID Користувача</th>
                        <th className="px-4 py-2 font-normal">Користувач</th>
                        <th className="px-4 py-2 font-normal">ID Підписки</th>
                        <th className="px-4 py-2 font-normal">Тип тренування</th>
                        <th className="px-4 py-2 font-normal">Тренер</th>
                        <th className="px-4 py-2 font-normal">Час відвідування</th>
                        <th className="px-4 py-2 font-normal">Дата відвідування</th>
                        <th className="px-4 py-2 rounded-tr-2xl"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {attendances && (
                        <>
                            {attendances?.results.map((attendance, index) => (
                                <tr
                                    key={attendance.id}
                                    className={`bg-white ${index === attendances.length - 1 ? '' : 'border-b'}`}
                                >
                                    <td className={`p-0 ${index === attendances.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                                        <a
                                            href={`users?user_id=${attendance.user_subscription.user.id}`}
                                            className={"text-blue-600 hover:text-blue-800 hover:underline block py-2"}
                                        >
                                            {attendance.user_subscription.user.id}
                                        </a>
                                    </td>
                                    <td className={"px-4 py-2"}>
                                        {attendance.user_subscription.user.first_name} {attendance.user_subscription.user.last_name}
                                    </td>
                                    <td className={"px-4 py-2"}>
                                        <a
                                            href={`users?user_subscription_id=${attendance.user_subscription}`}
                                            className={"text-blue-600 hover:text-blue-800 hover:underline block py-2"}
                                        >
                                            {attendance.user_subscription.id}
                                        </a>
                                    </td>
                                    <td className={"px-4 py-2"}>
                                        {attendance.training && attendance.training.training_type}
                                    </td>
                                    <td className={"px-4 py-2"}>
                                        {attendance.training && `${attendance.training.trainer.first_name} ${attendance.training.trainer.last_name}`}
                                    </td>
                                    <td className={"px-4 py-2"}>
                                        {new Date(attendance.attendance_time).toLocaleTimeString()}
                                    </td>
                                    <td className={"px-4 py-2"}>
                                        {new Date(attendance.attendance_time).toLocaleDateString()}
                                    </td>
                                    <td className={`px-4 py-2 ${index === attendances.length - 1 ? 'rounded-br-2xl' : 'border-b'}`}>
                                        Edit
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
