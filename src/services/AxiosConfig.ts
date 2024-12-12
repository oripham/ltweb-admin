import axios from 'axios';

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axios.defaults.baseURL = 'http://localhost:5289/api';
// axios.defaults.withCredentials = true;

export default axios;