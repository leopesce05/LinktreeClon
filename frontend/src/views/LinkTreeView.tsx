import DevTreeInput from "../components/DevTreeInput"
import { social } from "../data/social"
import { useEffect, useState } from 'react'
import { isValidUrl } from "../utils"
import { toast } from 'sonner'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../api/DevTreeAPI"
import { SocialNetwork, User } from "../types"

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
            const link : SocialNetwork = userLinks.find((link:SocialNetwork) => link.name === item.name)
            if(link){
                return {...item, url : link.url, enabled : link.enabled}
            }
            return item
        })
        setDevTreeLinks(updatedData)
    }, [])

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = devTreeLinks.map(link => 
            link.name === e.target.name 
                ? { ...link, url: e.target.value} 
                : {...link}
            )
        setDevTreeLinks(updatedLinks)
    }

    const links : SocialNetwork[] = JSON.parse(user.links)

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

        let updatedItems : SocialNetwork[] = []

        const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork)
        if(selectedSocialNetwork?.enabled){
            const newItem : SocialNetwork = {
                ...selectedSocialNetwork,
                id: links.length
            }
            updatedItems = [...links, newItem]
        }else{
            updatedItems = links
            .filter(link => link.name !== socialNetwork)
            .map((item, index) => ({
                ...item,
                id: index,
            }));
        }
        queryClient.setQueryData(['user'], (prevData : User) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedItems)
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
