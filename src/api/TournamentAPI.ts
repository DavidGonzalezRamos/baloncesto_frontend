import api from "../lib/axios";
import { TournamentFormData } from "../types";
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