const SubscriptionTable = ({user_subscriptions}) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-center">
                <thead>
                <tr className="bg-gray-90">
                    <th className="px-4 py-2 font-normal rounded-tl-2xl">ID Підписки</th>
                    <th className="px-4 py-2 font-normal">Назва</th>
                    <th className="px-4 py-2 font-normal">Тип</th>
                    <th className="px-4 py-2 font-normal">Дійсна до</th>
                    <th className="px-4 py-2 font-normal">Використано</th>
                    <th className="px-4 py-2 rounded-tr-2xl"></th>
                </tr>
                </thead>
                <tbody>
                {user_subscriptions && user_subscriptions.results.map((user_subscription, index) => (
                    <tr key={user_subscription.id}
                        className={`bg-white ${index === user_subscriptions.results.length - 1 ? '' : 'border-b'}`}>
                        <td className={`p-0 ${index === user_subscriptions.results.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                            {user_subscription.id}
                        </td>
                        <td className="px-4 py-2">
                            <a href={`subscriptions?subscription_id=${user_subscription.subscription.id}`}
                               className="text-blue-600 hover:text-blue-800 hover:underline block py-2"
                            >
                                {user_subscription.subscription.name}
                            </a>
                        </td>
                        <td className="px-4 py-2">
                            {user_subscription.subscription.subscription_type}
                        </td>
                        <td className="px-4 py-2">
                            {new Date(user_subscription.expiration_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">
                            {user_subscription.used_visits} / {user_subscription.subscription.available_number_of_visits}
                        </td>
                        <td className={`px-4 py-2 ${index === user_subscriptions.results.length - 1 ? 'rounded-br-2xl' : 'border-b'}`}>
                            Edit
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default SubscriptionTable;
