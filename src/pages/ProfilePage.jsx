import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const {logout} = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <h1>PROFILE</h1>
            <button onClick={() => {
                logout(
                    navigate('/', {replace: true})
                )
            }}>Logout</button>
        </div>
    )
}
