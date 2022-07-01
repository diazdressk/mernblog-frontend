import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

instance.interceptors.request.use((config) => {
  /* в каждый запрос вшиваю Authorization, токен из локалСтоража */
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
