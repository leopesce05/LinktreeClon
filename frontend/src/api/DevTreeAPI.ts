import api from '../config/axios';
import API_ROUTES from '../config/apiRoutes';
import axios from 'axios'

export const getUser = async () => {
    const token = localStorage.getItem('AUTH_TOKEN');
    try {
        const {data} = await api(API_ROUTES.getUser, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return data
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}