import {useState} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../hook/useAuth'
import api from "../../axios.config.js";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const {token, saveToken} = useAuth();
    const fromPage = location.state?.from?.pathname || '/';

    if (token) {
        return <Navigate to='/profile' />
    }

    async function fetchToken(phone, password) {
        setLoading(true);
        await api.post('token/', {
            username: phone,
            password: password
        })
            .then(res => {
                const token = res.data.token;
                saveToken(token, () => navigate(fromPage, {replace: true}));
            })
            .catch(err => {
                console.error("Error:", err);
            });
        setLoading(false);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const phone = form.phone.value;
        const password = form.password.value;
        fetchToken(phone, password);
    }

    return (
        <div>
            {loading && <h3>Loading...</h3>}
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-6 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone" type="text" placeholder="Phone"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="******************"/>
                    </div>
                    <div className="flex flex-col space-y-5 items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                            type="submit">
                            Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                           href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2024 K4 Club. All rights reserved.
                </p>
            </div>
        </div>
    )
}
