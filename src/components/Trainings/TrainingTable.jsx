import Loader from "../Loader.jsx";

const TrainingTable = ({
                           loadingTrainings,
                           participantsLoading,
                           trainings,
                           onViewParticipants,
                           openedRows,
                           participantsData
                       }) => {
    return (
        loadingTrainings ? <div className="flex justify-center"><Loader></Loader></div> : <>
            <div className="overflow-x-auto">
                <table className="min-w-full text-center">
                    <thead>
                    <tr className="bg-gray-90">
                        <th className="px-4 py-2 font-normal rounded-tl-2xl">ID Тренування</th>
                        <th className="px-4 py-2 font-normal">Тип тренування</th>
                        <th className="px-4 py-2 font-normal">Тренер</th>
                        <th className="px-4 py-2 font-normal">Час проведення</th>
                        <th className="px-4 py-2 font-normal">Дата проведення</th>
                        <th className="px-4 py-2 font-normal"></th>
                        <th className="px-4 py-2 rounded-tr-2xl"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {trainings && trainings.results.map((training, index) => (
                        <>
                            <tr key={training.id}
                                className={`bg-white ${index === trainings.results.length - 1 ? '' : 'border-b'}`}>
                                <td className={`p-0 ${index === trainings.results.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                                    {training.id}
                                </td>
                                <td className="px-4 py-2">
                                    <a href={`subscriptions?subscription_id=${training.id}`}
                                       className="text-blue-600 hover:text-blue-800 hover:underline block py-2"
                                    >
                                        {training.training_type}
                                    </a>
                                </td>
                                <td className="px-4 py-2">
                                    <span>{training.trainer.first_name} {training.trainer.last_name}</span>
                                </td>
                                <td className="px-4 py-2">
                                    {training.start_time}
                                </td>
                                <td className="px-4 py-2">
                                    {new Date(training.date).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2">
                                    Edit
                                </td>
                                <td className={`px-4 py-2 ${index === trainings.results.length - 1 ? 'rounded-br-2xl' : 'border-b'}`}>
                                    <button
                                        onClick={() => onViewParticipants(training.id)}
                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        Arrow
                                    </button>
                                </td>
                            </tr>
                            {participantsLoading.id === training.id ?

                                <tr>
                                    <td colSpan="7" className="h-16">
                                        <div className="flex justify-center">
                                            <Loader className="size-10"/>
                                        </div>
                                    </td>
                                </tr>

                                :
                                <>
                                    {openedRows.includes(training.id) && (
                                        <tr key={`${training.id}-participants`} className="bg-gray-100">
                                            <td colSpan="7">
                                                <div className="p-4 border-l-2 border-gray-300">
                                                    <h3 className="text-lg font-semibold mb-2">Учасники</h3>
                                                    {participantsData[training.id] && participantsData[training.id].length > 0 ? (
                                                        <table className="min-w-full text-center">
                                                            <thead>
                                                            <tr className="border-b">
                                                                <th>ID</th>
                                                                <th>{"Ім'я"}</th>
                                                                <th>Телефон</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {participantsData[training.id].map(participant => (
                                                                <tr key={participant.id}>
                                                                    <td>{participant.user_subscription.user.id}</td>
                                                                    <td>{participant.user_subscription.user.first_name} {participant.user_subscription.user.last_name}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    ) : (
                                                        <p>Участнів немає</p>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            }
                        </>
                    ))}
                    </tbody>
                </table>
            </div>
        </>

    )
};

export default TrainingTable;
