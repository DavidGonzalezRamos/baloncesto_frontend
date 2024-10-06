import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getTournamentById } from "../../api/TournamentAPI";
import EditTournamentForm from "../../components/tournaments/EditTournamentForm";

export default function EditTournamentView() {
  const params = useParams();
  const tournamentId = params.tournamentId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editTournament", tournamentId],
    queryFn: () => getTournamentById(tournamentId),
    retry: false,
  });

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data)
    return <EditTournamentForm data={data} tournamentId={tournamentId} />;
}
