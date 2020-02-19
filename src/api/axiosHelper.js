import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://api.giphy.com/v1/gifs',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});