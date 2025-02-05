import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Match, MatchFormData, Tournament } from "../types";

type MatchAPI = {
  formData: MatchFormData
  tournamentId: Tournament["_id"]
  matchId: Match["_id"]
}

export async function createMatch({formData, tournamentId}: Pick<MatchAPI, 'formData'| 'tournamentId' >) {
  try {
    const url = `/matches/${tournamentId}/matches`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}