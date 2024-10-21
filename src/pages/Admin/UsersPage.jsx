import {useEffect, useState} from "react";
import Button from "../../components/Button.jsx";
import spinner from "../../icegif-1258.gif"
import Field from "../../components/Inputs/Field.jsx";
import CustomSelect from "../../components/Inputs/CustomSelect.jsx";
import CustomDate from "../../components/Inputs/CustomDate.jsx";
import * as apiService from "../../../apiService.js";
import AttendanceTable from "../../components/Attendances/AttendanceTable.jsx";
import SubscriptionTable from "../../components/Subscriptions/SubscriptionTable.jsx";
import {useSearchParams} from "react-router-dom";
import FilterForm from "../../components/FilterForm.jsx";
import Modal from "../../components/Modal.jsx";
import UserTrainingTable from "../../components/Trainings/UserTrainingTable.jsx";


export default function Users() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [date, setDate] = useState("");
    const [sex, setSex] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("attendances");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Состояние для ошибки
    const [errors, setErrors] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        date: '',
        sex: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
    const [tabData, setTabData] = useState({
        attendances: null,
        subscriptions: null,
        trainings: null,
    });

    const fields = [
        {name: 'user_id', placeholder: 'ID користувача', type: 'text'},
        {name: 'email', placeholder: 'Email', type: 'text'},
        {name: 'phone', placeholder: 'Номер телефону', type: 'text'},
    ];

    async function fetchUserData(params) {
        setLoading(true);

        try {
            const response = await apiService.getUser({
                params: params
            })
            setUserData(response.data);
            setName(response.data.first_name)
            setLastName(response.data.last_name)
            setPhone(response.data.phone)
            setEmail(response.data.email)
            setDate(response.data.birth_date)
            setSex(response.data.sex)
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching userData:", error)
        }
        setLoading(false);
    }

    const fetchTabData = async (tab) => {
        setLoading(true)
        if (!tabData[tab] && userData) {
            try {
                let response;
                switch (tab) {
                    case "attendances":
                        response = await apiService.getAttendances({
                            params: {
                                limit: 5,
                                offset: 0,
                            }
                        }, userData.id);
                        break;
                    case "subscriptions":
                        response = await apiService.getUserSubscriptions({
                            params: {
                                limit: 5,
                                offset: 0,
                            }
                        }, userData.id);
                        break;
                    case "trainings":
                        response = await apiService.getUserTrainings({
                            params: {
                                limit: 5,
                                offset: 0,
                            }
                        }, userData.id);
                        break;
                    default:
                        break;
                }
                console.log(response.data)
                setTabData((prevData) => ({
                    ...prevData,
                    [tab]: response.data,
                }));
            } catch (error) {
                console.error(`Error fetching ${tab} data:`, error);
            }
        }
        setLoading(false)
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setName(userData.first_name)
        setLastName(userData.last_name)
        setPhone(userData.phone)
        setEmail(userData.email)
        setDate(userData.birth_date)
        setSex(userData.sex)
        setErrors({})
        setIsModalOpen(false)
    }

    async function handleEditing() {
        try {
            const response = await apiService.patchUser(userData.id, {
                first_name: name,
                last_name: lastName,
                phone: phone,
                email: email,
                birth_date: date,
                sex: sex,
            })
            console.log(response)
            setError(null);
            fetchUserData(initialFilters)
            cancelEditing()
        } catch (error) {
            console.error("Error fetching data:", error)
            if (error.response && error.response.data) {
                const {first_name, last_name, phone, email, birth_date, sex} = error.response.data;

                // Обновляем состояние ошибок по каждому полю
                setErrors({
                    name: first_name || '',
                    lastName: last_name || '',
                    phone: phone || '',
                    email: email || '',
                    date: birth_date || '',
                    sex: sex || ''
                });
                console.log(
                    {
                        name: first_name || '',
                        lastName: last_name || '',
                        phone: phone || '',
                        email: email || '',
                        date: birth_date || '',
                        sex: sex || ''
                    }
                )
            } else {
                setError("Неизвестная ошибка при редактировании данных пользователя.");
            }
        }
        setIsModalOpen(false)
    }

    const initialFilters = {
        user_id: searchParams.get('user_id') || '',
        email: searchParams.get('email') || '',
        phone: searchParams.get('phone') || '',
    };

    // Инициализация формы и отправка запроса при загрузке страницы
    useEffect(() => {
        const params = {};
        const user_id = searchParams.get('user_id') || '';
        const email = searchParams.get('email') || '';
        const phone = searchParams.get('phone') || '';

        // Если есть параметры в URL, отправляем запрос на сервер
        if (user_id || email || phone) {
            if (user_id) params.user_id = user_id;
            if (email) params.email = email;
            if (phone) params.phone = phone;

            // Отправляем запрос с параметрами
            fetchUserData(params);
        }
    }, [searchParams]);  // Выполняем при изменении query параметров


    useEffect(() => {
        // Загружаем данные для активной вкладки при изменении userData или activeTab
        if (userData) {
            fetchTabData(activeTab);
        }
    }, [userData, activeTab]);

    const handleFilterSubmit = (filters) => {
        const params = {}

        if (filters.user_id) params.user_id = filters.user_id
        if (filters.email) params.email = filters.email
        if (filters.phone) params.phone = filters.phone

        setTabData({
            attendances: null,
            subscriptions: null,
            trainings: null,
        })
        setSearchParams(params);

        fetchUserData(params);
    };

    const handleClearFilters = () => {
        setSearchParams({});  // Очищаем query параметры в URL
        setUserData(null);  // Очищаем данные
    };


    return (
        <>
            <FilterForm fields={fields} onSubmit={handleFilterSubmit} onClear={handleClearFilters}
                        initialFilters={initialFilters}/>
            {userData && (
                <>
                    <div className="flex flex-col sm:flex-row sm:space-x-5  space-y-3 sm:space-y-0">
                        <span className="font-bold text-2xl">{`Користувач #${userData.id}`}</span>
                        <div className={`grid grid-cols-2 gap-5 ${isEditing === true ? "hidden" : ""}`}>
                            <Button onClick={() => setIsEditing(true)}>Редагувати</Button>
                            <Button>Додати відвідування</Button>
                        </div>
                        <div className={`grid grid-cols-2 gap-5 ${isEditing === true ? "" : "hidden"}`}>
                            <Button onClick={() => setIsModalOpen(true)}>Зберегти</Button>
                            <Button onClick={cancelEditing}>Скасувати</Button>
                        </div>
                    </div>
                    {isModalOpen && (
                        <Modal
                            question={`Редагувати дані?`}
                            message={`Редагувати дані Користувача #${userData.id}`}
                            onAccept={handleEditing}
                            onDiscard={cancelEditing}
                        />
                    )}

                    <div className="flex flex-col sm:flex-row bg-white rounded-2xl pt-3 pb-5 px-5">
                        <div className="flex flex-col sm:w-2/6 md:w-1/4 justify-center items-center pb-5 sm:pb-0">
                            <img src={spinner} alt="" width="150" height="150" className="mb-3"/>
                            <span>{userData.first_name} {userData.last_name}</span>
                        </div>
                        <div className="flex flex-col sm:w-4/6 md:w-3/4 space-y-5">
                            <span className="font-bold text-1xl text-center sm:text-start">Персональна інформація</span>
                            <div className="flex flex-col">
                                <form className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-5">
                                    <div className="flex flex-col">
                                        <label htmlFor="name"
                                               className={`font-semibold text-gray-500 ${errors.name ? 'text-red-500' : ''}`}>Ім`я</label>
                                        <Field
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            id="name"
                                            placeholder="Ім'я"
                                            disabled={!isEditing}  // Поле заблокировано, если isEditing = false
                                            errors={errors}
                                        />
                                        <span className="font-light text-red-500">{errors.name}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="lastName"
                                               className={`font-semibold text-gray-500 ${errors.lastName ? 'text-red-500' : ''}`}>Фамілія</label>
                                        <Field
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            id="lastName"
                                            placeholder="Фамілія"
                                            disabled={!isEditing}
                                            errors={errors}
                                        />
                                        <span className="font-light text-red-500">{errors.lastName}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="phone"
                                               className={`font-semibold text-gray-500 ${errors.phone ? 'text-red-500' : ''}`}>Номер
                                            телефону</label>
                                        <Field
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            id="phone"
                                            placeholder="Номер телефону"
                                            disabled={!isEditing}
                                            errors={errors}
                                        />
                                        <span className="font-light text-red-500">{errors.phone}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="email"
                                               className={`font-semibold text-gray-500 ${errors.email ? 'text-red-500' : ''}`}>Email</label>
                                        <Field
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            id="email"
                                            placeholder="Email"
                                            disabled={!isEditing}
                                            errors={errors}
                                        />
                                        <span className="font-light text-red-500">{errors.email}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="date"
                                               className={`font-semibold text-gray-500 ${errors.date ? 'text-red-500' : ''}`}>Дата
                                            народження</label>

                                        <CustomDate
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            id="date"
                                            placeholder="Дата народження"
                                            disabled={!isEditing}
                                        />
                                        <span className="font-light text-red-500">{errors.date}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="sex"
                                               className={`font-semibold text-gray-500 ${errors.sex ? 'text-red-500' : ''}`}>Стать</label>
                                        <CustomSelect
                                            value={sex}
                                            onChange={(e) => setSex(e.target.value)}
                                            id="sex"
                                            disabled={!isEditing}
                                        >
                                            <option value="">Стать</option>
                                            <option value="F">Жінка</option>
                                            <option value="M">Чоловік</option>
                                        </CustomSelect>
                                        <span className="font-light text-red-500">{errors.sex}</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <div
                            className="flex flex-row space-x-5 rounded-none border-b border-blue-gray-50 bg-transparent p-0">
                            {/*<Link to={`/admin/attendances?user_id=${userData.id}`}> Відвідування </Link>*/}
                            <Button
                                className={`bg-transparent ${activeTab === "attendances" ? "border-b-2" : ""} border-gray-900 shadow-none rounded-none`}
                                onClick={() => setActiveTab("attendances")}>Відвідування</Button>
                            <Button
                                className={`bg-transparent ${activeTab === "subscriptions" ? "border-b-2" : ""} border-gray-900 shadow-none rounded-none`}
                                onClick={() => setActiveTab("subscriptions")}>Підписки</Button>
                            <Button
                                className={`bg-transparent ${activeTab === "trainings" ? "border-b-2" : ""} border-gray-900 shadow-none rounded-none`}
                                onClick={() => setActiveTab("trainings")}>Тренування</Button>
                        </div>

                        <div className="tab-content">
                            {activeTab === "attendances" &&
                                <>
                                    <AttendanceTable attendances={tabData.attendances}/>
                                    {tabData.attendances && tabData.attendances?.count > 5 && (
                                        <div className="flex w-full justify-center pt-2 pb-5">
                                            <a href={`attendances?user_id=${userData.id}`}
                                               className="text-blue-600 hover:text-blue-800 hover:underline block py-2"
                                            >
                                                Більше
                                            </a>
                                        </div>
                                    )}
                                </>
                            }
                            {activeTab === "subscriptions" &&
                                <SubscriptionTable user_subscriptions={tabData.subscriptions}/>}
                            {activeTab === "trainings" && <UserTrainingTable trainings={tabData.trainings}/>}
                        </div>
                    </div>
                </>
            )}

        </>
    )
}
