import DevTreeInput from "../components/DevTreeInput"
import { social } from "../data/social"
import { useEffect, useState } from 'react'
import { isValidUrl } from "../utils"
import { toast } from 'sonner'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../api/DevTreeAPI"
import { DevTreeLink, User } from "../types"

export default function LinkTreeView() {

    const queryClient = useQueryClient()
    const user : User = queryClient.getQueryData(['user'])!

    const [devTreeLinks, setDevTreeLinks] = useState(social)


    const {mutate} = useMutation({
        mutationFn : updateProfile,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: () => {
            toast.success("Perfil actualizado correctamente")
            
        }
    })

    useEffect(() => {
        const userLinks = JSON.parse(user.links)
        const updatedData = devTreeLinks.map(item => {
            const link : DevTreeLink = userLinks.find((link:DevTreeLink) => link.name === item.name)
            if(link){
                return {...item, url : link.url, enabled : link.enabled}
            }
            return item
        })
        setDevTreeLinks(updatedData)
    }, [])

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = devTreeLinks.map(link => {
            if (link.name === e.target.name) {
                if(isValidUrl(e.target.value)){
                    return { ...link, url: e.target.value}
                }else{
                    return { ...link, url: e.target.value, enabled: false }
                }
            }
            return link
        })
        setDevTreeLinks(updatedLinks)
        queryClient.setQueryData(['user'], (prevData : User) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedLinks)
            }
        })
    }

    const handleEnableLink = (socialNetwork: string) => {
        const updatedLinks = devTreeLinks.map(link => {
            if (link.name === socialNetwork) {
                if(isValidUrl(link.url)){
                    return { ...link, enabled: !link.enabled }
                }
                toast.error('La URL no es valida')
            }
            return link
        })
        setDevTreeLinks(updatedLinks)
        queryClient.setQueryData(['user'], (prevData : User) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedLinks)
            }
        })
    }

    return (
        <>
            <div className="space-y-5">
                {devTreeLinks.map(item => (
                    <DevTreeInput
                        key={item.name}
                        item={item}
                        handleUrlChange={handleUrlChange}
                        handleEnableLink={handleEnableLink}
                    />
                ))}
                <button 
                    className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold"
                    onClick={() => {
                        mutate(user)
                    }}
                    >
                    Guardar Cambios
                </button>
            </div>
        </>
    )
}
