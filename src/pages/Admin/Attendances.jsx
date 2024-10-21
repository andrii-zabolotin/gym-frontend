import FilterForm from "../../components/FilterForm.jsx";
import {useEffect, useState} from "react";
import * as apiService from "../../../apiService.js";
import Loader from "../../components/Loader.jsx";
import {useSearchParams} from "react-router-dom";
import Pagination from "../../components/Pagination.jsx";
import AttendanceTable from "../../components/Attendances/AttendanceTable.jsx";

export default function Attendances() {
    const [attendances, setAttendances] = useState(null)
    const [trainingType, setTrainingType] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const fields = [
        {name: 'user_id', placeholder: 'ID користувача', type: 'text'},
        {name: 'user_subscription_id', placeholder: 'ID Підписки', type: 'text'},
        {name: 'training_type', placeholder: 'Тип тренування', type: 'select', options: trainingType},
        {
            name: 'trainer_id', placeholder: 'Тренер', type: 'search', options: trainers && trainers.map(trainer => ({
                id: trainer.id, name: `${trainer.first_name} ${trainer.last_name}`,
            }))
        },
        {name: 'date', placeholder: 'Дата', type: 'date'},
    ];
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const initialFilters = {
        user_id: searchParams.get('user_id') || '',
        user_subscription_id: searchParams.get('user_subscription_id') || '',
        training_type: searchParams.get('training_type') || '',
        trainer_id: searchParams.get('trainer_id') || '',
        date: searchParams.get('date') || '',
    };
    const [currentPage, setCurrentPage] = useState(1)

    async function fetchTrainingTypes() {
        setLoading(true)
        try {
            const response = await apiService.getTrainingTypes()
            setTrainingType(response.data);
            console.log("Training types", response.data)
        } catch (error) {
            console.error("Error fetching training types:", error)
        }
        setLoading(false)
    }

    async function fetchTrainers() {
        setLoading(true)
        try {
            const response = await apiService.getTrainers()
            setTrainers(response.data);
            console.log("Trainers", response.data)
        } catch (error) {
            console.error("Error fetching training types:", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchTrainingTypes();
        fetchTrainers();
    }, []);

        useEffect(() => {
        fetchAttendances();
    }, [currentPage]);

    const fetchAttendances = async (params = initialFilters) => {
        setLoading(true);

        params.limit = 10
        params.offset = (currentPage - 1) * 10

        try {
            const response = await apiService.getAttendances({
                params: params
            })
            setAttendances(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching attendances:", error)
        }

        setLoading(false);
    }

    const handleFilterSubmit = (filters) => {
        const params = {}

        if (filters.user_id) params.user_id = filters.user_id
        if (filters.user_subscription_id) params.user_subscription_id = filters.user_subscription_id
        if (filters.training_type) params.training_type = filters.training_type
        if (filters.trainer_id) params.trainer_id = filters.trainer_id
        if (filters.date) params.date = filters.date

        setSearchParams(params);
        setCurrentPage(1)
        fetchAttendances(params);
    };

    const handleClearFilters = () => {
        setSearchParams({});  // Очищаем query параметры в URL
        setAttendances([]);  // Очищаем данные
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Loader></Loader>
            </div>
        )
    }

    return (
        <>
            <FilterForm fields={fields} onSubmit={handleFilterSubmit} onClear={handleClearFilters}
                        initialFilters={initialFilters}/>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                        totalPages={Math.ceil(attendances?.count / 10)}/>
            <AttendanceTable attendances={attendances} />
        </>
    )
}
