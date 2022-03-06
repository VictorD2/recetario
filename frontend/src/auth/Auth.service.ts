import { AxiosResponse } from 'axios';
import { config } from '../config/config';
import axios from '../lib/axios';
import { UserRequest } from './Usuario.interfaces';
const api = `${config.API}/api/v0/auth`;

// LOGIN
export const logIn = async (username: string, password: string): Promise<AxiosResponse<UserRequest, any>> => {
    return await axios.post(`${api}/login`, { username, password });
}

// WHOAMI
export const whoAmI = async (): Promise<AxiosResponse<UserRequest, any>> => {
    return await axios.post(`${api}/whoami`);
}

// REGISTER
export const register = async (username: string, password: string): Promise<AxiosResponse<UserRequest, any>> => {
    return await axios.post(`${api}/register`, { username, password });
}

// PUBLIC FOR TOKEN
export const publico = async (): Promise<AxiosResponse<UserRequest, any>> => {
    return await axios.post(`${api}/public`, {});
}