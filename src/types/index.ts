import {date, z} from 'zod'

// Tournament
export const tournamentSchema = z.object({
  _id: z.string(),
  dateStart: date(),
  dateEnd: date(),
  tournamentName: z.string(),
})

export type Tournament = z.infer<typeof tournamentSchema>
export type TournamentFormData = Pick<Tournament, 'dateStart' | 'dateEnd' | 'tournamentName'>