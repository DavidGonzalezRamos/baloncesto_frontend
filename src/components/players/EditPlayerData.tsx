import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { getPlayerById } from "../../api/PlayerAPI";
import EditPlayerModal from "./EditPlayerModal";

export default function EditPlayerData() {
  const params = useParams();
  const teamId = params.teamId!;

  //Obtener playerId
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const playerId = queryParams.get("editPlayer")!;

  const { data, isError } = useQuery({
    queryKey: ["player", playerId],
    queryFn: () => getPlayerById({ teamId, playerId }),
    enabled: !!playerId,
  });

  if (isError) return <Navigate to="/404" />;
  if (data) return <EditPlayerModal data={data} playerId={playerId} />;
}
