import axios from "axios";

import { AppError } from "@utils/AppError";

const api = axios.create({
  //baseURL: 'http://localhost:3333'
  baseURL: 'http://192.168.10.120:3333'
});

// Tratando todas as respostas do backend
api.interceptors.response.use((response) => response, (error) => {
    if(error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(error)
    }
})

export { api };

