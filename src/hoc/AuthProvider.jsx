import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const saveToken = (userToken, cb) => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
        cb();
    };

    const logout = (cb) => {
        localStorage.removeItem('token');
        setToken(null);
        cb();
    };

    const value = {token, saveToken, logout};

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
