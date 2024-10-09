import {useEffect, useState} from "react";
import axios from "axios";
import { useAuth } from "../hook/useAuth";

export default function Attendances() {
    const [loading, setLoading] = useState(false)
    const [attendances, setAttendances] = useState(null)
    const {token} = useAuth();

    async function fetchAttendances() {
        setLoading(true);
        await axios.get('http://127.0.0.1:8000/api/v1/attendances/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(res => {
            setAttendances(res.data);
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
        <div>
            <h1>Attendances</h1>
            {loading && <h3>Loading...</h3>}

            {attendances && (
                <ul style={{listStyle: "none"}}>
                    {attendances.map((attendance) => (
                        <ul key={attendance.id} style={{listStyle: "none"}}>
                            <li>{attendance.id}</li>
                        </ul>
                    ))}
                </ul>
            )}
        </div>
    )
}
