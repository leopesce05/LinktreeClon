import { SocialNetwork } from "../types"

type DevTreeLinkProps = {
    link: SocialNetwork
}

export default function DevTreeLink({ link }: DevTreeLinkProps) {
    return (
        <a href={link.url} target="_blank" rel="noreferrer" className="hover:shadow-lg">
            <li className="bg-white px-5 py-2 flex items-center gap-3 rounded-lg">
                <div className="w-12 h-12 bg-cover" style={{ backgroundImage: `url(/social/icon_${link.name}.svg)` }}>

                </div>
                <p className="capitalize">Visita Mi: <span className="font-black">{link.name}</span></p>
            </li>
        </a>


    )
}
