import {
  Menu,
  Transition,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import { Team } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeam } from "../../api/TeamAPI";
import Swal from "sweetalert2";

type TeamListProps = {
  teams: Team[];
};

export default function TeamList({ teams }: TeamListProps) {
  const navigate = useNavigate();

  const params = useParams();
  const tournamentId = params.tournamentId!;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTeam,
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
      queryClient.invalidateQueries({
        queryKey: ["tournament", tournamentId],
      });
    },
  });

  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow-md mb-7 mt-8 font-mono">
        <p className="text-3xl"> Equipos</p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-md mb-7 mt-8 font-mono">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-2xl">Nombre</th>
              <th className="text-left text-2xl">Entrenador</th>
              <th className="text-left text-2xl">Rama</th>
              <th className="text-left text-2xl"></th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id}>
                <td className="text-black cursor-pointer hover:underline text-3xl font-bold">
                  <button type="button">{team.nameTeam}</button>
                </td>
                <td className="text-2xl">{team.nameCoach}</td>
                <td className="text-2xl">{team.branchTeam}</td>
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
                            <button
                              type="button"
                              className="block px-3 py-1 text-sm leading-6 text-gray-900"
                            >
                              Ver Equipo
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  location.pathname + `?editTeam=${team._id}`
                                )
                              }
                              className="block px-3 py-1 text-sm leading-6 text-gray-900"
                            >
                              Editar Equipo
                            </button>
                          </MenuItem>

                          <MenuItem>
                            <button
                              onClick={() =>
                                mutate({ tournamentId, teamId: team._id })
                              }
                              type="button"
                              className="block px-3 py-1 text-sm leading-6 text-red-500"
                            >
                              Eliminar Equipo
                            </button>
                          </MenuItem>
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
