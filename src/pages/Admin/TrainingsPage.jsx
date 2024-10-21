import FilterForm from "../../components/FilterForm.jsx";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import * as apiService from "../../../apiService.js";
import Pagination from "../../components/Pagination.jsx";
import TrainingTable from "../../components/Trainings/TrainingTable.jsx";
import Loader from "../../components/Loader.jsx";

export default function Trainings() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [trainingType, setTrainingType] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingTrainings, setLoadingTrainings] = useState(false);
    const [participantsLoading, setParticipantsLoading] = useState({});
    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState(null);
    const [participantsData, setParticipantsData] = useState({});
    const [openedRows, setOpenedRows] = useState([]);
    const fields = [
        {name: 'training_id', placeholder: 'ID тренування', type: 'text'},
        {name: 'training_type', placeholder: 'Тип тренування', type: 'select', options: trainingType},
        {
            name: 'relevance',
            placeholder: 'Актуальність',
            type: 'select',
            options: [{id: 1, name: "Минулі"}, {id: 2, name: "Майбутні"}]
        },
        {
            name: 'trainer_id', placeholder: 'Тренер', type: 'search', options: trainers && trainers.map(trainer => ({
                id: trainer.id, name: `${trainer.first_name} ${trainer.last_name}`,
            }))
        },
        {name: 'date', placeholder: 'Дата', type: 'date'},
    ];

    const initialFilters = {
        training_id: searchParams.get('training_id') || '',
        training_type: searchParams.get('training_type') || '',
        relevance: searchParams.get('relevance') || '',
        trainer_id: searchParams.get('trainer_id') || '',
        date: searchParams.get('date') || '',
    };

    async function fetchParticipants(trainingId) {
        setParticipantsLoading({id: trainingId, state: true});
        try {
            const response = await apiService.getParticipants(trainingId);
            setParticipantsData(prevState => ({
                ...prevState,
                [trainingId]: response.data
            }));
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching participants:", error);
        }
        setParticipantsLoading({});
    }

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

    async function fetchTrainings(params = initialFilters) {
        setLoadingTrainings(true)

        params.limit = 10
        params.offset = (currentPage - 1) * 10

        try {
            const response = await apiService.getTrainings({
                params: params
            })
            setData(response.data);
            console.log("Trainings", response.data)
        } catch (error) {
            console.error("Error fetching training types:", error)
        }
        setLoadingTrainings(false)
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


    // Инициализация формы и отправка запроса при загрузке страницы
    useEffect(() => {
        const params = {};
        const training_id = searchParams.get('training_id') || '';
        const training_type = searchParams.get('training_type') || '';
        const relevance = searchParams.get('relevance') || '';
        const trainer_id = searchParams.get('trainer_id') || '';
        const date = searchParams.get('date') || '';

        if (training_id) params.training_id = training_id;
        if (training_type) params.training_type = training_type;
        if (relevance) params.relevance = relevance;
        if (trainer_id) params.trainer_id = trainer_id;
        if (date) params.date = date;

        fetchTrainings(params)

    }, [searchParams]);  // Выполняем при изменении query параметров

    useEffect(() => {
        fetchTrainingTypes();
        fetchTrainers();
    }, []);


    useEffect(() => {
        fetchTrainings()
    }, [currentPage]);

    const handleViewParticipants = (trainingId) => {
        if (openedRows.includes(trainingId)) {
            setOpenedRows(openedRows.filter(id => id !== trainingId));
        } else {
            fetchParticipants(trainingId);
            setOpenedRows([...openedRows, trainingId]);
        }
    };

    const handleFilterSubmit = (filters) => {
        const params = {}

        if (filters.training_id) params.training_id = filters.training_id;
        if (filters.training_type) params.training_type = filters.training_type;
        if (filters.relevance) params.relevance = filters.relevance;
        if (filters.trainer_id) params.trainer_id = filters.trainer_id;
        if (filters.date) params.date = filters.date;

        setSearchParams(params);
        setCurrentPage(1)
        setOpenedRows([])
        fetchTrainings(params)
    };

    const handleClearFilters = () => {
        setSearchParams({});  // Очищаем query параметры в URL
        setCurrentPage(1)
        setOpenedRows([])
        fetchTrainings()
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
                        totalPages={Math.ceil(data?.count / 10)}/>
            <TrainingTable loadingTrainings={loadingTrainings} participantsLoading={participantsLoading} trainings={data} onViewParticipants={handleViewParticipants} openedRows={openedRows} participantsData={participantsData}/>
        </>
    );
}