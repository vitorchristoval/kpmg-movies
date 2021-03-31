
import * as axios from 'axios';

// require('dotenv/config');



let api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

api.interceptors.response.use((response) => response, (error) => {
    // whatever you want to do with the error
   
    if (error.response.status === 401) {
      
        
    }
    throw error;
});

export default api
