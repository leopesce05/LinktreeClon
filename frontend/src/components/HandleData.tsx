import { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
    data: UserHandle;
}

export default function HandleData({ data }: HandleDataProps) {

    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)

    return (
        <div className="space-y-6 text-white">
            <p className="text-5xl font-black text-center">
                {data.handle}
            </p>

            {data.image && <img src={data.image} className="max-w-[250px] mx-auto" />}

            <p className="text-lg text-center">
                {data.description}
            </p>
            <div className="mt-20 flex flex-col gap-6">
                {links.length ?
                    links.map((link: SocialNetwork) => {
                        return (
                            <a key={link.name}
                                href={link.url} target="_blank" rel="noreferrer noopener" className="bg-white px-5 py-2 flex items-center gap-3 rounded-lg">
                                <img src={`/social/icon_${link.name}.svg`} alt="Imagen red social" className="w-12" />

                                <p className="text-gray-800 capitalize font-bold text-lg">Visita Mi: <span className="font-black">{link.name}</span></p>
                            </a>
                        )
                    })
                    : <p className="text-center">No links available</p>}
            </div>
        </div>
    )
}