import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTrophy,
  faBasketball,
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom";
export default function AppLayout() {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="bg-blue-700 w-1/5 p-6 flex flex-col justify-between text-white rounded-xl m-4 shadow-lg">
          {/* Perfil */}
          <div className="text-center mb-6">
            <img
              src="https://via.placeholder.com/150" // Reemplaza con la imagen real
              alt="Avatar"
              className="rounded-full w-24 h-24 mx-auto mb-4"
            />
            <p className="font-sans text-lg font-semibold">David Gonzalez</p>
          </div>
          {/* Menú de navegación */}
          <ul className="space-y-6 mt-10 text-left">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-3 font-sans font-medium text-lg bg-blue-400 text-black rounded-l-full -mr-12 transition duration-300 ease-in-out"
                    : "flex items-center p-3 font-sans font-medium text-lg opacity-80 hover:bg-white hover:bg-opacity-20 rounded-lg transition duration-300 ease-in-out"
                }
              >
                <FontAwesomeIcon icon={faHome} className="mr-4" />
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tournaments"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-3 font-sans font-medium text-lg bg-blue-400 text-black rounded-l-full -mr-12 transition duration-300 ease-in-out"
                    : "flex items-center p-3 font-sans font-medium text-lg opacity-80 hover:bg-white hover:bg-opacity-20 rounded-lg transition duration-300 ease-in-out"
                }
              >
                <FontAwesomeIcon icon={faTrophy} className="mr-4" />
                Torneos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/partidos"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-3 font-sans font-medium text-lg bg-blue-400 text-black rounded-l-full -mr-12 transition duration-300 ease-in-out"
                    : "flex items-center p-3 font-sans font-medium text-lg opacity-80 hover:bg-white hover:bg-opacity-20 rounded-lg transition duration-300 ease-in-out"
                }
              >
                <FontAwesomeIcon icon={faBasketball} className="mr-4" />
                Partidos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/equipos"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-3 font-sans font-medium text-lg bg-blue-400 text-black rounded-l-full -mr-12 transition duration-300 ease-in-out"
                    : "flex items-center p-3 font-sans font-medium text-lg opacity-80 hover:bg-white hover:bg-opacity-20 rounded-lg transition duration-300 ease-in-out"
                }
              >
                <FontAwesomeIcon icon={faUsers} className="mr-4" />
                Equipos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/jugador"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-3 font-sans font-medium text-lg bg-blue-400 text-black rounded-l-full -mr-12 transition duration-300 ease-in-out"
                    : "flex items-center p-3 font-sans font-medium text-lg opacity-80 hover:bg-white hover:bg-opacity-20 rounded-lg transition duration-300 ease-in-out"
                }
              >
                <FontAwesomeIcon icon={faUser} className="mr-4" />
                Jugadores
              </NavLink>
            </li>
          </ul>
          {/* Encuentro próximo */}
          <div className="bg-white bg-opacity-10 p-4 rounded-md text-center mt-6">
            <h3 className="text-lg font-sans font-medium">Encuentro Próximo</h3>
            <div className="mt-2">
              <p className="font-bold font-sans">ESCOM vs ESCA</p>
              <p className="font-sans text-sm">A las 18:00 hrs</p>
              <p className="font-sans text-sm">Gimnasio Carrillón</p>
            </div>
          </div>
          {/* Botón de cierre de sesión */}
          <button className="mt-6 bg-opacity-20 hover:bg-opacity-30 bg-white text-lg py-2 rounded-md">
            Cerrar Sesión
          </button>
        </aside>

        {/* Main content */}
        <div className="w-4/5">
          <main className="px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
