import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function AdminNavigation() {
  const navigate = useNavigate();
  return (
    <>
      <button
        className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
        onClick={() => {
          localStorage.removeItem("AUTH_TOKEN");
          navigate("/");
        }}
      >
        Cerrar Sesión
        <ArrowRightStartOnRectangleIcon className="h-4 w-4 inline-block ml-2" />
      </button>
    </>
  )
}
