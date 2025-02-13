import { z } from 'zod'


//Auth & Users
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  old_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth,'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth,'email'>
export type ForgotPasswordForm = Pick<Auth,'email'>
export type NewPasswordForm = Pick<Auth,'password' | 'password_confirmation'>
export type UpdateCurrentUserPassword = Pick<Auth,'old_password' | 'password' | 'password_confirmation'>
export type Confirmtoken = Pick<Auth, 'token'>
export type CheckPasswordForm = Pick<Auth, 'password'>

//Users
export const userSchema = authSchema.pick({
  name: true,
  email: true
}).extend({
  _id: z.string(),
  role: z.string(), // Agregar el campo 'role'
})
export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name' | 'email'>


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

//Players
export const playerSchema = z.object({
  _id: z.string(),
  name: z.string(),
  lastName: z.string(),
  numberIpn: z.number(),
  number: z.number(),
  curp: z.string(),
  position: z.string(),
  idCard: z.union([z.string(), z.instanceof(File), z.null()]), // Acepta string, File o null
  schedulePlayer: z.union([z.string(), z.instanceof(File), z.null()]), // Acepta string, File o null
  photoPlayer: z.union([z.string(), z.instanceof(File), z.null()]), // Acepta string, File o null
  examMed: z.union([z.string(), z.instanceof(File), z.null()]), // Acepta string, File o null
})
export type Player = z.infer<typeof playerSchema>
export type PlayerFormData = Pick<Player, 'name' | 'lastName' | 'numberIpn' |'number' | 'curp' | 'position' |'idCard' | 'schedulePlayer' | 'photoPlayer' | 'examMed' >

//Matches
export const matchSatusSchema = z.enum(["inProgress", "finished"])
export const matchSchema = z.object({
  _id: z.string(),
  teamLocal: z.string(),
  teamVisitor: z.string(),
  scoreLocal: z.number(),
  scoreVisitor: z.number(),
  teamWinner: z.string(),
  date: z.union([z.date(), z.string()]),
  place: z.string(),
  branchMatch: z.string(),
  tournament: z.string(),
  status: matchSatusSchema
})
export type Match = z.infer<typeof matchSchema>
export type MatchFormData = Pick<Match, 'teamLocal' | 'teamVisitor' | 'scoreLocal' | 'scoreVisitor' | 'teamWinner' | 'date' | 'place' | 'branchMatch' >

