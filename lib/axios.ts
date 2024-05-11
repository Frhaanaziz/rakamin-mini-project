import axios from 'axios';

/**
 * Creates an instance of Axios with the specified configuration.
 * @remarks
 * The `backendApi` instance is configured with the base URL and headers for making HTTP requests to the backend API.
 * The base URL is retrieved from the `API_URL` environment variable, and the authorization header is set using the `API_KEY` environment variable.
 */
export const backendApi = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: 'Bearer ' + process.env.API_KEY,
  },
});
