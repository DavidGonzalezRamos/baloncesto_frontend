import { z} from 'zod'

//Teams
export const teamSchema = z.object({
  _id: z.string(),
  nameTeam: z.string(),
  nameCoach: z.string(),
  branchTeam: z.string(),
  tournament: z.string(), 
})

export type Team = z.infer<typeof teamSchema>
export type TeamFormData = Pick<Team, 'nameTeam' | 'nameCoach' | 'branchTeam' >

// Tournament
export const tournamentSchema = z.object({
  _id: z.string(),
  dateStart: z.union([z.date(), z.string()]), // Aceptar tanto Date como string
  dateEnd: z.union([z.date(), z.string()]),
  tournamentName: z.string(),
});


export const tournamentListSchema = z.array(
  tournamentSchema.pick({
    _id: true,
    dateStart: true,
    dateEnd: true,
    tournamentName: true,
  })
)
export type Tournament = z.infer<typeof tournamentSchema>
export type TournamentFormData = Pick<Tournament, 'dateStart' | 'dateEnd' | 'tournamentName'>