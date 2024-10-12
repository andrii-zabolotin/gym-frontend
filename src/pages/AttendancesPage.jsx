import {useEffect, useState} from "react";
import {useAuth} from "../hook/useAuth";
import api from "../../axios.config.js";
import FilterComponent from "../components/Filter.jsx";
import Loader from "../components/Loader.jsx";

export default function Attendances() {
    const [loading, setLoading] = useState(false)
    const [attendances, setAttendances] = useState(null)
    const {token} = useAuth();

    async function fetchAttendances() {
        setLoading(true);
        await api.get('attendances/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(res => {
                setAttendances(res.data);
                console.log(res.data)
            })
            .catch(err => {
                console.error("Error fetching attendances:", err);
            })
        setLoading(false);
    }

    useEffect(() => {
        fetchAttendances();
    }, []);

    return (
        <>
            {loading && <Loader></Loader>}

            <FilterComponent></FilterComponent>

            <table className="text-center min-w-full">
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
                        {attendances.map((attendance, index) => (
                            <tr
                                key={attendance.id}
                                className={`bg-white ${index === attendances.length - 1 ? '' : 'border-b'}`}
                            >
                                <td className={`p-0 ${index === attendances.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                                    <a
                                        href={`users?user_id=${attendance.id}`}
                                        className={"text-blue-600 hover:text-blue-800 hover:underline block py-2"}
                                    >
                                        {attendance.id}
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
                                <td
                                    className={`px-4 py-2 ${index === attendances.length - 1 ? 'rounded-br-2xl' : 'border-b'}`}
                                >
                                    Edit
                                </td>
                            </tr>
                        ))
                        }
                    </>
                )}
                </tbody>
            </table>
        </>
    )
}
