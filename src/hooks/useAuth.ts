import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/AuthAPI";

export const useAuth = () => {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: 1000, // Intenta refetch cada 1 segundo (quitar en producción)
  });
  return {data, isLoading, isError};
}