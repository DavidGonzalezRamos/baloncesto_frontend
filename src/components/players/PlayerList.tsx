import {
  Menu,
  Transition,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { Player } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useAuth } from "../../hooks/useAuth";

type PlayerListProps = {
  players: Player[];
};

export default function PlayerList({ players }: PlayerListProps) {
  const navigate = useNavigate();

  const { data: user } = useAuth(); // Obtener los datos del usuario

  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow-md mb-7 mt-8 font-mono">
        <p className="text-3xl"> Jugadores</p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-md mb-7 mt-8 font-mono">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-2xl">Nombre</th>
              <th className="text-left text-2xl">Posición</th>
              <th className="text-left text-2xl">Número</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player._id}>
                <td className="text-black cursor-pointer text-3xl font-bold">
                  <Link to={``} className="hover:underline">
                    {player.name}
                    {"  "}
                    {player.lastName}
                  </Link>
                </td>
                <td className="text-2xl">{player.position}</td>
                <td className="text-2xl">{player.number}</td>
                <td className="text-2xl">
                  <div className="flex shrink-0  gap-x-6">
                    <Menu as="div" className="relative flex-none">
                      <MenuButton className="-m-2.5 block p-2.5 text-blue-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <FontAwesomeIcon
                          icon={faAnglesRight}
                          className="h-9 w-9"
                          aria-hidden="true"
                        />{" "}
                      </MenuButton>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <MenuItem>
                            <Link
                              to={``}
                              type="button"
                              className="block px-3 py-1 text-sm leading-6 text-gray-900"
                            >
                              Ver Jugador
                            </Link>
                          </MenuItem>
                          {user?.role === "admin" && (
                            <MenuItem>
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    location.pathname +
                                      `?editPlayer=${player._id}`
                                  )
                                }
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >
                                Editar Jugador
                              </button>
                            </MenuItem>
                          )}

                          {user?.role === "admin" && (
                            <MenuItem>
                              <button
                                onClick={() =>
                                  navigate(
                                    location.pathname +
                                      `?deletePlayer=${player._id}`
                                  )
                                }
                                type="button"
                                className="block px-3 py-1 text-sm leading-6 text-red-500"
                              >
                                Eliminar Jugador
                              </button>
                            </MenuItem>
                          )}
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
