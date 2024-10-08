import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { getTeamById } from "../../api/TeamAPI";
import EditTeamModal from "./EditTeamModal";

export default function EditTeamData() {
  const params = useParams();
  const tournamentId = params.tournamentId!;

  //Obtener teamId
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get("editTeam")!;

  const { data, isError } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getTeamById({ tournamentId, teamId }),
    enabled: !!teamId,
  });

  if (isError) return <Navigate to="/404" />;
  if (data) return <EditTeamModal data={data} teamId={teamId} />;
}
