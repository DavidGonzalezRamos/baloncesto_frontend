import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTeamModal from "./EditTeamModal";
import useTeamData from "../../queries/useTeamData";

export default function EditTeamData() {
  const params = useParams();
  const tournamentId = params.tournamentId!;

  //Obtener teamId
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get("editTeam")!;

  const { teamData, isError } = useTeamData({ teamId, tournamentId });
  /**  const { data, isError } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getTeamById({ tournamentId, teamId }),
    enabled: !!teamId,
  });
 */
  if (isError) return <Navigate to="/404" />;
  if (teamData) return <EditTeamModal data={teamData} teamId={teamId} />;
}
