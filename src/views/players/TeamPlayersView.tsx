import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getTeamById } from "../../api/TeamAPI";
import PlayerList from "../../components/players/PlayerList";
import AddPlayerModal from "../../components/players/AddPlayerModal";
import EditPlayerData from "../../components/players/EditPlayerData";
import { useAuth } from "../../hooks/useAuth";

export default function TeamPlayersView() {
  const navigate = useNavigate();

  const params = useParams();
  const tournamentId = params.tournamentId!;
  const teamId = params.teamId!;

  const { data: user } = useAuth(); // Obtener los datos del usuario

  const { data, isLoading, isError } = useQuery({
    queryKey: ["team", tournamentId, teamId],
    queryFn: () => getTeamById({ tournamentId, teamId }),
    retry: false,
  });
  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data)
    return (
      <>
        <div className="bg-white shadow-lg rounded-xl  top-8 p-4 mx-auto flex justify-between mt-7">
          <div>
            <h1 className="font-mono text-5xl text-black font-extrabold">
              {data.nameTeam}
            </h1>
            <p className="font-mono text-2xl py-2 text-black mt-2">
              Entrenador: {data.nameCoach} - Rama: {data.branchTeam}
            </p>
          </div>
          <nav className="my-0 gap-3 mt-5">
            {user?.role === "admin" && (
              <button
                type="button"
                className="font-mono text-2xl font-semibold bg-gradient-to-b from-blue-300 to-blue-600 text-white py-2 px-4 rounded-lg"
                onClick={() => navigate(location.pathname + "?newPlayer=true")}
              >
                Agregar jugador
              </button>
            )}
          </nav>
        </div>
        <div>
          {data.players && data.players.length > 0 ? (
            <PlayerList players={data.players} />
          ) : null}
        </div>
        <AddPlayerModal />
        <EditPlayerData />
      </>
    );
}
