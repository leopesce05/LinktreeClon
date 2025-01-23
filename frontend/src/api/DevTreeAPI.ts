import axios from 'axios'

import api from '../config/axios';
import { ProfileForm, User } from '../types';
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

export const updateProfile = async (formData : ProfileForm) => {
    try {
        const {data} = await api.patch<User>(API_ROUTES.updateUser,formData);
        return data
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const uploadImage = async (image : File) => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        const {data} = await api.post<User>(API_ROUTES.uploadImage, formData);
        return data;
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}