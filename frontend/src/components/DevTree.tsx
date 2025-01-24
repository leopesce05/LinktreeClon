import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/20/solid';
import NavigationTabs from "../components/NavigationTabs";
import { SocialNetwork, User } from "../types";
import { useEffect, useState } from 'react'
import DevTreeLink from "./DevTreeLink";
import { useQueryClient } from "@tanstack/react-query";

type DevTreeProps = {
    data: User
}

export default function DevTree({ data }: DevTreeProps) {
    
    const queryClient = useQueryClient()
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled))

    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled))
    }, [data])

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        const prevIndex = enabledLinks.findIndex(link => link.id === active.id)
        const nextIndex = enabledLinks.findIndex(link => link.id === over?.id)

        const updatedLinks = arrayMove(enabledLinks, prevIndex, nextIndex)
        const orderLinks  = updatedLinks.map((link, index) => ({ ...link, id: index }))
        setEnabledLinks(orderLinks)

        queryClient.setQueryData(['user'], (prev: User) => {
            return { ...prev, links: JSON.stringify([...orderLinks]) }
        })
    }

    return (
        <>
            <header className="bg-slate-800 py-5">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <img src="/logo.svg" className="w-full block" />
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end">
                        <button
                            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                            onClick={() => { }}
                        >
                            Cerrar Sesión
                            <ArrowRightStartOnRectangleIcon className="h-4 w-4 inline-block ml-2" />
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    <NavigationTabs />
                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={''}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil:  /{data.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6 rounded-2xl">
                            <p className="text-4xl text-center text-white">{data.handle}</p>
                            {data.image &&
                                <img src={data.image} alt="Imagen de perfil" className="mx-auto max-w-[250px]" />
                            }
                            <p className="text-center text-lg font-black text-white">{data.description}</p>

                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}>

                                <div className="mt-20 flex flex-col gap-5">
                                    <SortableContext
                                        items={enabledLinks}
                                        strategy={verticalListSortingStrategy}
                                    >

                                        {enabledLinks.map((link) => (
                                            <DevTreeLink key={link.name} link={link} />
                                        ))}
                                    </SortableContext>
                                </div>

                            </DndContext>

                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" richColors />
        </>
    )
}
