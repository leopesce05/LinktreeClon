import {useForm} from 'react-hook-form';
import {useQueryClient, useMutation} from '@tanstack/react-query';

import { ProfileForm, User } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import { updateProfile, uploadImage } from '../api/DevTreeAPI';
import {toast} from 'sonner';


export default function ProfileView() {

    const queryClient = useQueryClient();
    const data : User = queryClient.getQueryData(['user'])!

    const {register, handleSubmit, formState : {errors}} = useForm<ProfileForm>({defaultValues : {
        handle: data.handle, 
        description: data.description
    }});
    
    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: () => {
            toast.success("Perfil actualizado correctamente")
            queryClient.invalidateQueries({queryKey:['user']})
        }
    })

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], (oldData : User) => {
                if(data && data.image){
                    return {
                        ...oldData,
                        image: data.image
                    }
                }else{
                    return oldData
                }
                
            })
        }
    })

    const handleUserProfileForm = async (formData : ProfileForm)=>{
        const usuario : User = {
            ...queryClient.getQueryData(['user'])!,
            handle: formData.handle,
            description: formData.description
        }

        updateProfileMutation.mutate(usuario)
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
            uploadImageMutation.mutate(e.target.files[0])
        }
    }
    
    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register("handle", {
                        required: "El handle es obligatorio",
                    })}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage> }
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register("description",{
                        required: "La descripción es obligatoria"
                    })}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage> }
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="image"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}