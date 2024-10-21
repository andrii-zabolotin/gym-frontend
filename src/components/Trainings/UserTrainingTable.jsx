const UserTrainingTable = ({trainings}) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-center">
                <thead>
                <tr className="bg-gray-90">
                    <th className="px-4 py-2 font-normal rounded-tl-2xl">ID Тренування</th>
                    <th className="px-4 py-2 font-normal">ID Підписки</th>
                    <th className="px-4 py-2 font-normal">Тип тренування</th>
                    <th className="px-4 py-2 font-normal">Тренер</th>
                    <th className="px-4 py-2 font-normal">Час проведення</th>
                    <th className="px-4 py-2 font-normal">Дата проведення</th>
                    <th className="px-4 py-2 font-normal">Відвідування</th>
                    <th className="px-4 py-2 rounded-tr-2xl"></th>
                </tr>
                </thead>
                <tbody>
                {trainings && trainings.results.map((training, index) => (
                    <tr key={training.id}
                        className={`bg-white ${index === trainings.results.length - 1 ? '' : 'border-b'}`}>
                        <td className={`p-0 ${index === trainings.results.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                            {training.training.id}
                        </td>
                        <td className="px-4 py-2">
                            <a href={`subscriptions?subscription_id=${training.id}`}
                               className="text-blue-600 hover:text-blue-800 hover:underline block py-2"
                            >
                                {training.user_subscription.id}
                            </a>
                        </td>
                        <td className="px-4 py-2">
                            {training.training.training_type}
                        </td>
                        <td className="px-4 py-2">
                            <span>{training.training.trainer.first_name} {training.training.trainer.last_name}</span>
                        </td>
                        <td className="px-4 py-2">
                            {training.training.start_time}
                        </td>
                        <td className="px-4 py-2">
                            {new Date(training.training.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">
                            {/*Відвідування*/}
                        </td>
                        <td className={`px-4 py-2 ${index === trainings.results.length - 1 ? 'rounded-br-2xl' : 'border-b'}`}>
                            Edit
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default UserTrainingTable;
