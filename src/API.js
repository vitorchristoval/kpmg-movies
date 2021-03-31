
import * as axios from 'axios';

let api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

api.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
      console.log('Sem autorização')
        
    }
    throw error;
});

export default api
