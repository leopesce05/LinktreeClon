import axios from 'axios'

import api from '../config/axios';
import { User, UserHandle } from '../types';
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

export const updateProfile = async (formData : User) => {
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

export const getUserByHandle = async (handle: string) => {
    try {
        const url = `/${handle}`
        const {data} = await api<UserHandle>(url);
        return data
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const searchHandle = async (handle: string) => {
    try {
        const url = `${API_ROUTES.searchHandle}`
        const {data} = await api.post<string>(url,{
            handle
        });
        return data
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}