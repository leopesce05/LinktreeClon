
import {Link} from 'react-router-dom'

type NotFoundViewProps = {
    message?: string; 
};

export default function NotFoundView({ message = "Página no encontrada" }: NotFoundViewProps) {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-800 text-gray-100">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="mt-2 text-xl">{message}</p>
            <Link
                to="/"
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
                Volver al inicio
            </Link>
        </div>
    )
}
