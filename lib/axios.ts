import axios from 'axios';

export const backendApi = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: 'Bearer ' + process.env.API_KEY,
  },
});
