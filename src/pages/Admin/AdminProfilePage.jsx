import { useAuth } from '../../hook/useAuth.jsx'
import { useNavigate } from 'react-router-dom';

export default function AdminProfile() {
    const {logout} = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <h1>PROFILE</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded" onClick={() => {
                logout(
                    () => navigate('/', {replace: true})
                )
            }}>Logout</button>
        </>
    )
}
