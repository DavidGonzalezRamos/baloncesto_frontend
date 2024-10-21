import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Player, PlayerFormData, Team } from "../types";


type PlayerAPI = {
  formData: PlayerFormData
  teamId: Team["_id"]
  playerId: Player["_id"]
}

export async function createPlayer({formData, teamId}: Pick<PlayerAPI, 'formData'| 'teamId' >) {
  try {
    const url = `/players/${teamId}/players`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function getPlayer({teamId}: Pick<PlayerAPI, 'teamId'>) {
  try {
    const url = `/players/${teamId}/players`
    const { data } = await api(url)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function getPlayerById({teamId, playerId}: Pick<PlayerAPI, 'teamId'| 'playerId' >) {
  try {
    const url = `/players/${teamId}/players/${playerId}`
    const { data } = await api(url)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function updatePlayer({teamId, playerId, formData}: Pick<PlayerAPI, 'teamId' | 'playerId' | 'formData'>) {
  try {
    const url = `/players/${teamId}/players/${playerId}`
    const { data } = await api.put<string>(url, formData)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function deletePlayer({teamId, playerId}: Pick<PlayerAPI, 'teamId'| 'playerId' >) {
  try {
    const url = `/players/${teamId}/players/${playerId}`
    const { data } = await api.delete<string>(url)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}