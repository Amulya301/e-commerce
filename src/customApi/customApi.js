import axios from "axios";

const API_URL = "https://dummyjson.com/";

const api = axios.create({
  baseURL:API_URL
});

// api.interceptors.request.use(
//   // for request headers
//   (request) => {
//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   // Successful response
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


export default api;