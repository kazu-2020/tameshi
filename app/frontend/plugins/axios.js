import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'api',
});

let token = document.getElementsByName('csrf-token')[0].content;
axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = token;

export default axiosInstance;
