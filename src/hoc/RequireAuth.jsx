import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth'

export default function RequireAuth ({children}) {
    const location = useLocation();
    const {token} = useAuth();

    if (!token) {
        return <Navigate to='/login' state={{from: location}} />
    }

  return children;
}
