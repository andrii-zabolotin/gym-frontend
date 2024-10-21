import {useEffect, useState} from "react";
import axios from "axios";
import { useAuth } from "../../hook/useAuth.jsx";
import Loader from "../../components/Loader.jsx";

export default function Subscriptions() {
    const [loading, setLoading] = useState(false)
    const [subscriptions, setSubscriptions] = useState(null)
    const {token} = useAuth();

    async function fetchSubscriptions() {
        setLoading(true);
        await axios.get('http://127.0.0.1:8000/api/v1/subscriptions/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(res => {
            setSubscriptions(res.data);
        })
        .catch(err => {
            console.error("Error fetching subscriptions:", err);
        })
        setLoading(false);
    }

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    return (
        <div>
            <h1>Attendances</h1>
            {loading && <Loader/>}

            {subscriptions && (
                <ul style={{listStyle: "none"}}>
                    {subscriptions.map((subscription) => (
                        <ul key={subscription.id} style={{listStyle: "none"}}>
                            <li>{subscription.name}</li>
                            <li>{subscription.subscription_type}</li>
                            <li>{subscription.validity_period}</li>
                            <li>{subscription.available_number_of_visits}</li>
                            <li>{subscription.price}</li>
                        </ul>
                    ))}
                </ul>
            )}
        </div>
    )
}
