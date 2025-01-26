import { Link, useLocation,useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner'
import axios from 'axios';


import type { RegisterForm } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import api from '../config/axios';
import API_ROUTES from '../api/apiRoutes';

export default function RegisterView(){
    const navigate = useNavigate();
    const location = useLocation();

    const initialValues : RegisterForm = {
        name: '',
        email: '',
        handle: location?.state?.handle || '',
        password: '',
        password_confirmation: ''
    }

    const {register, watch,reset, handleSubmit, formState : {errors}} = useForm({defaultValues: initialValues});

    const password = watch('password');

    const handleRegister =  async (formData : RegisterForm ) => {
        try {
            const {data} = await api.post(API_ROUTES.registro, formData);
            toast.success(data.message);
            reset();
            navigate('/auth/login');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.error);
            }
        }
    }

    return(
        <>
            <h1 className='text-4xl text-white font-bold text-center'>Registrate</h1>
        
            <form 
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('name', {
                            required: "El nombre es obligatorio"
                        })}
                    />
                    {errors.name && <ErrorMessage> {errors.name.message} </ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (<ErrorMessage> {errors.email.message} </ErrorMessage>)}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('handle', {
                            required: "El handle es obligatorio"
                        })}
                    />
                    {errors.handle && <ErrorMessage> {errors.handle.message} </ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: "La contraseña es obligatorio",
                            minLength: {value:8, message: "La contraseña debe tener al menos 8 caracteres"}
                        })}
                    />
                    {errors.password && <ErrorMessage> {errors.password.message} </ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation', {
                            required: "La contraseña es obligatorio",
                            minLength: {value:8, message: "La contraseña debe tener al menos 8 caracteres"},
                            validate: (value) => value === password || "Las contraseñas no coinciden"
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage> {errors.password_confirmation.message} </ErrorMessage>}
                </div>
                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />  
            </form>
            
            <nav className='mt-10'>
                <Link 
                    to="/auth/login" 
                    className='text-center text-white text-lg block'
                >Ya tienes Cuenta? Inicia sesion
                </Link>
            </nav>
        </>
    )
}