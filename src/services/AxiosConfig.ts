import axios from 'axios';

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axios.defaults.baseURL = 'https://opham414-001-site1.jtempurl.com/api';
// axios.defaults.withCredentials = true;

export default axios;
