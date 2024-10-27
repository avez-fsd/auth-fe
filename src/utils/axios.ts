import axios from 'axios';

const currentHost = window.location.hostname || "";
let baseURL = "http://localhost:3000"
if (currentHost.indexOf("127.0.0.1") > -1) {
    baseURL = "http://localhost:3000"
}

const axiosInstance = axios.create({
    baseURL,
    timeout:30000
});


export default axiosInstance;