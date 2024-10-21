import { useQuery } from "@tanstack/react-query";
import { getTeamById } from "../api/TeamAPI";
interface TeamData {
  teamId: string;
  tournamentId: string;
}

export const getKeyTeamData = ({teamId, tournamentId}: TeamData) => ["team", teamId, tournamentId];
const useTeamData = ({teamId, tournamentId}: TeamData) => {
  const { data: teamData, ...values } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getTeamById({ tournamentId,teamId }),
    enabled: !!teamId,
  });

  return { teamData, ...values };
}
export default useTeamData;