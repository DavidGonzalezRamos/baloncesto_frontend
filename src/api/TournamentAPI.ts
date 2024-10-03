import api from "../lib/axios";
import { TournamentFormData } from "../types";

export async function createTournament(formData: TournamentFormData) {
  try {
    const {data}= await api.post('/tournaments', formData);
    return data;
  } catch (error) {
    console.error(error);
  }
}