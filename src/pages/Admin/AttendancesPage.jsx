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
import AttendanceTable from "../../components/Attendances/AttendanceTable.jsx";
import Pagination from "../../components/Pagination.jsx";
import OLD_AttendanceFilters from "../../components/Attendances/OLD_AttendanceFilters.jsx";
import * as apiService from "../../../apiService.js";

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

        fetchData();
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

        async function fetchData() {
            setLoading(true);
            try {
                const response = await apiService.getAttendances({
                    params: {
                        limit: 10,
                        offset: 10
                    }
                })
                setAttendances(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error)
            }
            setLoading(false);
        }

        fetchData();

    };

    const fetchData = async () => {
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

        try {
            const response = await apiService.getAttendances({
                params: params
            })
            setAttendances(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error)
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchData();
        fetchTrainingTypes();
        fetchTrainers();
    }, [currentPage]);

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Loader></Loader>
            </div>
        )
    }

    return (
        <>
            <OLD_AttendanceFilters userId={userId} setUserId={setUserId} userSubscriptionId={userSubscriptionId}
                                   setUserSubscriptionId={setUserSubscriptionId} trainingType={trainingType}
                                   setTrainingType={setTrainingType} trainingTypes={trainingTypes}
                                   setTrainerId={setTrainerId} trainers={trainers} date={date} setDate={setDate}
                                   updateQueryParams={updateQueryParams} clearQueryParams={clearQueryParams}/>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                        totalPages={Math.ceil(attendances?.count / 10)}/>
            <AttendanceTable attendances={attendances}/>
        </>
    )
}
