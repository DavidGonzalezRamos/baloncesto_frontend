import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTrophy,
  faBasketball,
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
export default function AppLayout() {
  const { data, isLoading, isError } = useAuth();
  if (isLoading) return <p>Cargando...</p>;
  if (isError) {
    return <Navigate to="/auth/login" />;
  }
  const queryClient = useQueryClient();
  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  if (data)
    return (
      <>
        <div className="flex h-screen font-mono">
          {/* Sidebar */}
          <aside className="bg-blue-700 w-1/5 p-6 flex flex-col justify-between text-white rounded-xl m-4 shadow-lg">
            {/* Perfil */}
            <div className="mb-6">
              <p className="font-sans text-lg font-semibold">
                Bienvenido: {data.name}
              </p>
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
                  to="/teams"
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
                  to="/players"
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
              <h3 className="text-lg font-sans font-medium">
                Encuentro Próximo
              </h3>
              <div className="mt-2">
                <p className="font-bold font-sans">ESCOM vs ESCA</p>
                <p className="font-sans text-sm">A las 18:00 hrs</p>
                <p className="font-sans text-sm">Gimnasio Carrillón</p>
              </div>
            </div>
            {/* Botón de cierre de sesión */}
            <button
              onClick={logout}
              type="button"
              className="mt-6 bg-opacity-20 hover:bg-opacity-30 bg-white text-lg py-2 rounded-md"
            >
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
