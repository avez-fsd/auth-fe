import axios from 'axios';

const baseURL = "https://34.30.13.203";

const axiosInstance = axios.create({
    baseURL,
    timeout:30000
});


export default axiosInstance;