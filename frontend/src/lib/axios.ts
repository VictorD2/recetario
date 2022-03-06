import axios from 'axios';
import { config } from "../config/config";
const baseURL = config.API;

const request = axios.create({ baseURL });

request.interceptors.request.use(async (config: any) => {
    const token = await localStorage.getItem("token");
    config.headers["Autorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    return config;
});

request.interceptors.response.use(
    async (response: any) => {
        return response;
    },
);

export default request;