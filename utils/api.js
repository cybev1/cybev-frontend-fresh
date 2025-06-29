import axios from 'axios';

const token = typeof window !== 'undefined' ? localStorage.getItem('cybev_token') : null;

const api = axios.create({
  baseURL: '/api',
  headers: token ? { Authorization: `Bearer ${token}` } : {}
});

export default api;