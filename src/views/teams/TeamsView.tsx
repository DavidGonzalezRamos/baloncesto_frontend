import { useQuery, useQueries } from "@tanstack/react-query";
import { getTeams } from "../../api/TeamAPI";
import { getTournament } from "../../api/TournamentAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function TeamsView() {
  const {
    data: tournaments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tournaments"],
    queryFn: getTournament,
  });

  const teamsQueries = useQueries({
    queries: (tournaments || []).map((tournament) => ({
      queryKey: ["teams", tournament._id],
      queryFn: () => getTeams({ tournamentId: tournament._id }),
      enabled: !!tournament._id,
    })),
  });

  const teams = teamsQueries.flatMap((query) => query.data || []);

  return (
    <>
      <div className="p-8 min-h-screen flex justify-center">
        <div className="max-w-8xl w-full">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Lista de Equipos
          </h1>

          {(isLoading || teamsQueries.some((q) => q.isLoading)) && (
            <p className="text-center text-gray-600 text-lg">
              Cargando equipos...
            </p>
          )}

          {(error || teamsQueries.some((q) => q.error)) && (
            <p className="text-center text-red-500 text-lg">
              Error al cargar datos
            </p>
          )}

          {teams.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-blue-500 text-6xl mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-700">
                No hay equipos registrados
              </h2>
              <p className="text-gray-500 text-lg mt-2">
                Vuelve más tarde para ver actualizaciones.
              </p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left text-xl p-2">Nombre del Equipo</th>
                    <th className="text-left text-xl p-2">Entrenador</th>
                    <th className="text-left text-xl p-2">Rama</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-lg font-medium text-gray-900">
                        <Link
                          to={`/teams/${team.tournament?._id}/${team._id}/players`}
                          className="text-black hover:underline"
                        >
                          {team.nameTeam}
                        </Link>
                      </td>
                      <td className="p-3 text-lg text-gray-700">
                        {team.nameCoach}
                      </td>
                      <td className="p-3 text-lg text-gray-700">
                        {team.branchTeam}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
