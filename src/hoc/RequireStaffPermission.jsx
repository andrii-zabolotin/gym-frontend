import {useAuth} from "../hook/useAuth.jsx";
import api from "../../axios.config.js";
import {useEffect, useState} from "react";
import Loader from "../components/Loader.jsx";
import {Navigate} from "react-router-dom";

export default function RequireStaffPermission({ children }) {
    const { token } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log(token)
        api.get('user/me/', {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then(res => {
            setUser(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error:', err);
            setError(true);
            setLoading(false);
        });
    }, [token]);

    if (loading) {
        return <Loader />
    }

    if (error || !user || !(user.is_superuser || user.is_staff || user.is_administrator)) {
        return <Navigate to="/404" replace />;
    }

    return <>{children}</>;
}
