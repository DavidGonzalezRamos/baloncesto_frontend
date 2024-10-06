import api from "../lib/axios";
import { Tournament, TournamentFormData, tournamentListSchema } from "../types";
import { isAxiosError } from "axios";

export async function createTournament(formData: TournamentFormData) {
  try {
    const {data}= await api.post('/tournaments', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function getTournament() {
  try {
    const {data}= await api.get('/tournaments');
    const response = tournamentListSchema.safeParse(data);
    if(response.success){
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function getTournamentById(id: Tournament['_id']) {
  try {
    const {data}= await api.get(`/tournaments/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

type TournamentAPIType = {
  formData: TournamentFormData
  tournamentId: Tournament['_id']
}

export async function updateTournament({formData, tournamentId}: TournamentAPIType) {
  try {
    const {data}= await api.put<string>(`/tournaments/${tournamentId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function deleteTournament(id: Tournament['_id']) {
  try {
    const {data}= await api.delete<string>(`/tournaments/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}