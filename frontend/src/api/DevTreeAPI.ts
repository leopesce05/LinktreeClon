import axios from 'axios'

import api from '../config/axios';
import { User } from '../types';
import API_ROUTES from './apiRoutes';

export const getUser = async () => {
    try {
        const {data} = await api<User>(API_ROUTES.getUser);
        return data
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}