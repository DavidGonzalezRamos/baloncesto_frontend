import { useQuery, useQueries } from "@tanstack/react-query";
import { getTeams } from "../../api/TeamAPI";
import { getPlayer } from "../../api/PlayerAPI";
import { getTournament } from "../../api/TournamentAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Player, Team } from "../../types";
import { Link } from "react-router-dom";

export default function PlayersView() {
  const {
    data: tournaments,
    isLoading: loadingTournaments,
    error: errorTournaments,
  } = useQuery({
    queryKey: ["tournaments"],
    queryFn: getTournament,
  });

  const teamsQueries = useQueries({
    queries: (tournaments || []).map((tournament) => ({
      queryKey: ["teams", tournament._id],
      queryFn: () => getTeams({ tournamentId: tournament._id }),
      enabled: !!tournament._id, // Solo ejecutar si hay torneos
    })),
  });

  const teams = teamsQueries.flatMap((query, index) =>
    query.data
      ? query.data.map((team: Team) => ({
          ...team,
          tournamentName: tournaments?.[index]?.tournamentName || "Sin torneo",
        }))
      : []
  );

  const playersQueries = useQueries({
    queries: teams.map((team) => ({
      queryKey: ["players", team._id],
      queryFn: () => getPlayer({ teamId: team._id }),
      enabled: !!team._id, // Solo ejecutar si hay equipos
    })),
  });

  const players = playersQueries.flatMap((query, index) =>
    query.data
      ? query.data.map((player: Player) => ({
          ...player,
          teamName: teams[index]?.nameTeam || "Sin equipo",
          teamId: teams[index]?._id || null,
          tournamentName: teams[index]?.tournamentName || "Sin torneo",
          tournamentId: teams[index]?.tournament?._id,
        }))
      : []
  );

  console.log("Equipos cargados:", teams);

  return (
    <div className="p-8 min-h-screen flex justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Lista de Jugadores
        </h1>

        {(loadingTournaments ||
          teamsQueries.some((q) => q.isLoading) ||
          playersQueries.some((q) => q.isLoading)) && (
          <p className="text-center text-gray-600 text-lg">
            Cargando jugadores...
          </p>
        )}

        {(errorTournaments ||
          teamsQueries.some((q) => q.error) ||
          playersQueries.some((q) => q.error)) && (
          <p className="text-center text-red-500 text-lg">
            Error al cargar datos
          </p>
        )}

        {players.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md">
            <FontAwesomeIcon
              icon={faUsers}
              className="text-blue-500 text-6xl mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-700">
              No hay jugadores registrados
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
                  <th className="text-left text-xl p-2">Nombre</th>
                  <th className="text-left text-xl p-2">Equipo</th>
                  <th className="text-left text-xl p-2">Torneo</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-lg font-medium text-gray-900">
                      {player.name} {player.lastName}
                    </td>
                    <Link
                      to={`/teams/${player.tournamentId}/${player.teamId}/players`}
                      className="text-gray-600 cursor-pointer hover:underline text-lg font-medium"
                    >
                      <td className="p-3 text-lg text-gray-700">
                        {player?.teamName}
                      </td>
                    </Link>
                    <td className="p-3 text-lg text-gray-700">
                      {player.tournamentId ? (
                        <Link
                          to={`/tournaments/${player.tournamentId}`}
                          className="text-gray-600 cursor-pointer hover:underline text-lg font-medium"
                        >
                          {player.tournamentName}
                        </Link>
                      ) : (
                        "Sin torneo"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
