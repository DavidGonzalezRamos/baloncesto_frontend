import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTournament } from "../../api/TournamentAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketballBall } from "@fortawesome/free-solid-svg-icons";

export default function TeamsView() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tournamentsView"],
    queryFn: getTournament,
  });

  const handleSelectTournament = (tournamentId: string) => {
    navigate(`/tournaments/${tournamentId}`);
  };

  return (
    <div className="p-8 min-h-screen flex  justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Selecciona un Torneo
        </h1>

        {isLoading && (
          <p className="text-center text-gray-600 text-lg">
            Cargando torneos...
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 text-lg">
            Error al cargar torneos
          </p>
        )}

        {data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md">
            <FontAwesomeIcon
              icon={faBasketballBall}
              className="text-orange-500 text-6xl mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-700">
              No hay torneos en curso
            </h2>
            <p className="text-gray-500 text-lg mt-2">
              Vuelve más tarde para ver actualizaciones.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.map(
              (tournament: { _id: string; tournamentName: string }) => (
                <div
                  key={tournament._id}
                  className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
                  onClick={() => handleSelectTournament(tournament._id)}
                >
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {tournament.tournamentName}
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Haz clic para ver los equipos
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
