import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
  config => {
    // Add authorization token to every request
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// api.interceptors.response.use(
//   response => response,
//   error => {
//     console.error('API call failed:', error);
//     // Handle specific error cases
//     if (error.response.status === 401) {
//       // Unauthorized
//     } else if (error.response.status === 404) {
//       // Not found
//     }
//     return Promise.reject(error);
//   }
// );

export default api;