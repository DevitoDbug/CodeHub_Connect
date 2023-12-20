


import axios from "axios";
const REACT_APP_BASE_URL=`https://api.github.com/users`
// Axios config
export const httpClient = axios.create({
    baseURL: REACT_APP_BASE_URL,
});



