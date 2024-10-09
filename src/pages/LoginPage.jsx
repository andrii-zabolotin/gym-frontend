import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../hook/useAuth'

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const {saveToken} = useAuth();

    const fromPage = location.state?.from?.pathname || '/';

    async function fetchToken(phone, password) {
      setLoading(true);
      await axios.post('http://127.0.0.1:8000/api/v1/token/', {
        username: phone,
        password: password
      })
      .then(res => {
          const token = res.data.token;
          saveToken(token, () => navigate(fromPage, {replace: true}));
      })
      .catch(err => {
          console.error("Error:", err);
      })
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
      <h1>Login page</h1>
      <p>From-page: {fromPage}</p>
      {loading && <h3>Loading...</h3>}
      <form onSubmit={handleSubmit}>
       <label>
           Phone: <input name="phone" />
       </label>
       <br />
       <label>
           Password: <input name="password" />
       </label>
       <br />
       <button type="submit">Login</button>
      </form>
    </div>
  )
}
