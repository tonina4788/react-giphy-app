import { apiClient } from './axiosHelper';

const API_KEY = 'FPbaTkgB8orkf3dYEnEELRkwIm1ezlLv';

const getTrendinGifs = () => {
    return apiClient.get('/trending?api_key=' + API_KEY);
};

const searchGifs = (searchTerm, searchOffset) => {
    return apiClient.get('/search?api_key=' + API_KEY + '&q=' + searchTerm + "&limit=100");
};

export default {
    getTrendinGifs,
    searchGifs
};

