import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Team, TeamFormData, Tournament } from "../types";
import { PlayerAPI } from "./PlayerAPI";


type TeamAPI = {
  formData: TeamFormData
  tournamentId: Tournament["_id"]
  teamId: Team["_id"]
}

export async function createTeam({formData, tournamentId}: Pick<TeamAPI, 'formData'| 'tournamentId' >) {
  try {
    const url = `/tournaments/${tournamentId}/teams`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}  

export async function getTeamById({tournamentId, teamId}: Pick<TeamAPI, 'tournamentId'| 'teamId' >) {
  try {
    const url = `/tournaments/${tournamentId}/teams/${teamId}`
    const { data } = await api(url)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateTeam({tournamentId, teamId, formData}: Pick<TeamAPI, 'tournamentId' | 'teamId' | 'formData'>) {
  try {
    const url = `/tournaments/${tournamentId}/teams/${teamId}`
    const { data } = await api.put<string>(url, formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteTeam({tournamentId, teamId}: Pick<TeamAPI, 'tournamentId'| 'teamId' >) {
  try {
    const url = `/tournaments/${tournamentId}/teams/${teamId}`
    const { data } = await api.delete<string>(url)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function generateTeamPDF({teamId}: Pick<PlayerAPI, 'teamId'>) {
  try {
    const url = `/players/${teamId}/pdf`
    const { data } = await api(url, {
      responseType: "blob",
    })
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}