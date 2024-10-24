import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { deleteTournament, getTournament } from "../../api/TournamentAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function MenuTournaments() {
  const { data, isLoading } = useQuery({
    queryKey: ["tournaments"],
    queryFn: getTournament,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTournament,
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Continuar",
      });
    },
    onSuccess: (data) => {
      Swal.fire({
        title: "Felicidades!",
        text: data,
        icon: "success",
        confirmButtonText: "Continuar",
      });
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
    },
  });

  if (isLoading) return "Cargando...";

  if (data)
    return (
      <>
        <div className="bg-blue-200  rounded-xl  top-8 p-4 mx-auto flex justify-between mt-7">
          <h1 className="font-mono text-5xl text-black font-extrabold uppercase">
            Torneos
          </h1>
        </div>

        {data.length ? (
          <>
            <ul
              role="list"
              className="divide-y divide-blue-100 border border-blue-100 mt-10 bg-blue-200 shadow-lg rounded-xl"
            >
              {data.map((tournament) => (
                <li
                  key={tournament._id}
                  className="flex justify-between gap-x-6 px-5 py-10"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto space-y-2">
                      <Link
                        to={`/tournaments/${tournament._id}`}
                        className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                      >
                        {tournament.tournamentName}
                      </Link>
                      <p className="text-sm text-gray-600">
                        Fecha de inicio:{" "}
                        {new Date(
                          new Date(tournament.dateStart).getTime() +
                            new Date().getTimezoneOffset() * 60000
                        ).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        Fecha de término:{" "}
                        {new Date(
                          new Date(tournament.dateEnd).getTime() +
                            new Date().getTimezoneOffset() * 60000
                        ).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-6">
                    <Menu as="div" className="relative flex-none">
                      <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          className="h-9 w-9"
                          aria-hidden="true"
                        />
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
                              to={`/tournaments/${tournament._id}`}
                              className="block px-3 py-1 text-sm leading-6 text-gray-900"
                            >
                              Ver Torneo
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              to={`/tournaments/${tournament._id}/edit`}
                              className="block px-3 py-1 text-sm leading-6 text-gray-900"
                            >
                              Editar Torneo
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <button
                              type="button"
                              className="block px-3 py-1 text-sm leading-6 text-red-500"
                              onClick={() => mutate(tournament._id)}
                            >
                              Eliminar Torneo
                            </button>
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </li>
              ))}
            </ul>

            {data.length < 50 && (
              <button className="font-mono text-2xl font-semibold bg-gradient-to-b from-blue-300 to-blue-600 text-white py-4 px-12 rounded-full mt-7">
                <Link to="/tournaments/create">Crear Nuevo Torneo</Link>
              </button>
            )}
          </>
        ) : (
          <div className="p-6 bg-blue-200 rounded-lg shadow-md mb-6 text-center ">
            <p className="font-mono text-2xl py-20 text-black">
              Actualmente no hay un torneo en curso
            </p>
            {/* Si no hay torneos, siempre se muestra el botón */}
            <button className="font-mono text-2xl font-semibold bg-gradient-to-b from-blue-300 to-blue-600 text-black py-4 px-12 rounded-full">
              <Link to="/tournaments/create">Crear Nuevo Torneo</Link>
            </button>
          </div>
        )}
      </>
    );
}
