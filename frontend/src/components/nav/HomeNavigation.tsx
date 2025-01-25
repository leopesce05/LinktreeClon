import {Link} from 'react-router-dom';

export default function HomeNavigation() {
  return (
    <>
      <Link 
        to="/auth/login" 
        className="text-white p-2 uppercase font-black cursor-pointer text-xs">
      Iniciar Sesion
      </Link>

      <Link 
        to="/auth/register" 
        className="bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer">
      Registrarme
      </Link>
    </>
  )
}
