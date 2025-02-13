import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getTournamentById } from "../../api/TournamentAPI";
import AddTeamModal from "../../components/teams/AddTeamModal";
import TeamList from "../../components/teams/TeamList";
import EditTeamData from "../../components/teams/EditTeamData";
import { useAuth } from "../../hooks/useAuth";
import DeleteTeamModal from "../../components/teams/DeleteTeamModal";
import AddMatchModal from "../../components/matches/AddMatchModal";

export default function TournamentTeamsView() {
  const navigate = useNavigate();

  const params = useParams();
  const tournamentId = params.tournamentId!;

  const { data: user } = useAuth(); // Obtener los datos del usuario
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tournament", tournamentId],
    queryFn: () => getTournamentById(tournamentId),
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
              {data.tournamentName}
            </h1>
            <p className="font-mono text-2xl py-2 text-black mt-2">
              Inicia:{" "}
              {new Date(data.dateStart).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              - Finaliza:{" "}
              {new Date(data.dateEnd).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </div>
          <nav className="my-0 gap-3 mt-5">
            {user?.role === "admin" && (
              <>
                <button
                  type="button"
                  className="mr-7 font-mono text-2xl font-semibold bg-gradient-to-b from-blue-300 to-blue-600 text-white py-2 px-4 rounded-lg"
                  onClick={() => navigate(location.pathname + "?newTeam=true")}
                >
                  Agregar equipo
                </button>
                {data.teams.length > 1 && (
                  <button
                    type="button"
                    className="font-mono text-2xl font-semibold bg-gradient-to-b from-blue-300 to-blue-600 text-white py-2 px-4 rounded-lg"
                    onClick={() =>
                      navigate(location.pathname + "?newMatch=true")
                    }
                  >
                    Generar partido
                  </button>
                )}
              </>
            )}
          </nav>
        </div>
        <div>
          {data.teams && data.teams.length > 0 ? (
            <TeamList teams={data.teams} />
          ) : null}
        </div>
        <AddTeamModal />
        <EditTeamData />
        <DeleteTeamModal />
        <AddMatchModal />
      </>
    );
}
