import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { MatchFormData, Team } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { getTeams } from "../../api/TeamAPI";
import { useParams } from "react-router-dom";

type MatchFormProps = {
  register: UseFormRegister<MatchFormData>;
  watch: UseFormWatch<MatchFormData>;
  errors: FieldErrors<MatchFormData>;
};

export default function MatchForm({ register, watch, errors }: MatchFormProps) {
  const selectedBranch = watch("branchMatch"); // Obtener la rama seleccionada
  const selectedLocalTeam = watch("teamLocal"); // Equipo local seleccionado
  const selectedVisitorTeam = watch("teamVisitor"); // Equipo visitante seleccionado
  // Obtener el id del torneo de los parámetros de la URL
  const { tournamentId } = useParams();
  // Obtener equipos del torneo usando getTeams
  const {
    data: teams,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["teams", tournamentId],
    queryFn: () =>
      tournamentId ? getTeams({ tournamentId }) : Promise.resolve([]),
    enabled: !!tournamentId,
  });

  // Filtrar equipos según la rama seleccionada
  const filteredTeams =
    teams?.filter((team: Team) => team.branchTeam === selectedBranch) || [];

  return (
    <>
      {/* Selección de rama */}
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="branchMatch">
          Rama del equipo
        </label>
        <select
          id="branchMatch"
          className="w-full p-3 border-gray-300 border"
          {...register("branchMatch", {
            required: "La rama del equipo es obligatoria",
          })}
        >
          <option value="">Selecciona la rama del equipo</option>
          <option value="Varonil">Varonil</option>
          <option value="Femenil">Femenil</option>
        </select>
        {errors.branchMatch && (
          <ErrorMessage>{errors.branchMatch.message}</ErrorMessage>
        )}
      </div>

      {/* Mostrar mensaje de carga o error */}
      {isLoading && <p>Cargando equipos...</p>}
      {isError && <p className="text-red-500">{(error as Error).message}</p>}

      {/* Selección de equipo local */}
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="teamLocal">
          Nombre del equipo Local
        </label>
        <select
          id="teamLocal"
          className="w-full p-3 border-gray-300 border"
          {...register("teamLocal", {
            required: "El nombre del equipo local es obligatorio",
          })}
          disabled={!selectedBranch || isLoading}
        >
          <option value="">Selecciona un equipo</option>
          {filteredTeams.map((team: Team) => (
            <option key={team._id} value={team.nameTeam}>
              {team.nameTeam}
            </option>
          ))}
        </select>
        {errors.teamLocal && (
          <ErrorMessage>{errors.teamLocal.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="teamVisitor">
          Nombre del equipo Visitante
        </label>
        <select
          id="teamVisitor"
          className="w-full p-3 border-gray-300 border"
          {...register("teamVisitor", {
            required: "El nombre del equipo visitante es obligatorio",
          })}
          disabled={!selectedBranch || isLoading}
        >
          <option value="">Selecciona un equipo</option>
          {filteredTeams.map((team: Team) => (
            <option key={team._id} value={team.nameTeam}>
              {team.nameTeam}
            </option>
          ))}
        </select>
        {errors.teamVisitor && (
          <ErrorMessage>{errors.teamVisitor.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="date">
          Fecha del partido
        </label>
        <input
          id="date"
          type="date"
          placeholder="Fecha del partido"
          className="w-full p-3  border-gray-300 border"
          {...register("date", {
            required: "La fecha del partido es obligatoria",
          })}
        />
        {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="place">
          Lugar del partido
        </label>
        <input
          id="place"
          type="place"
          placeholder="Fecha del partido"
          className="w-full p-3  border-gray-300 border"
          {...register("place", {
            required: "La fecha del partido es obligatoria",
          })}
        />
        {errors.place && <ErrorMessage>{errors.place.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="scoreLocal">
          Puntuación del equipo Local
        </label>
        <input
          id="scoreLocal"
          type="number"
          placeholder="Puntuación del equipo"
          className="w-full p-3  border-gray-300 border"
          defaultValue={0}
          readOnly
          {...register("scoreLocal", {
            required: "La puntuación del equipo local es obligatoria",
            value: 0,
          })}
        />
        {errors.scoreLocal && (
          <ErrorMessage>{errors.scoreLocal.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="scoreVisitor">
          Puntuación del equipo Visitante
        </label>
        <input
          id="scoreVisitor"
          type="number"
          placeholder="Puntuación del equipo"
          className="w-full p-3  border-gray-300 border"
          defaultValue={0}
          readOnly
          {...register("scoreVisitor", {
            required: "La puntuación del equipo visitante es obligatoria",
            value: 0,
          })}
        />
        {errors.scoreVisitor && (
          <ErrorMessage>{errors.scoreVisitor.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="teamWinner">
          Equipo Ganador
        </label>
        <select
          id="teamWinner"
          className="w-full p-3 border-gray-300 border"
          {...register("teamWinner", {
            required: "El nombre del equipo ganador es obligatorio",
          })}
          disabled={!selectedLocalTeam || !selectedVisitorTeam} // Deshabilita si no se seleccionan los equipos
        >
          <option value="">Selecciona el equipo ganador</option>
          <option value="Por definirse">Por definirse</option>
          {selectedLocalTeam && (
            <option value={selectedLocalTeam}>{selectedLocalTeam}</option>
          )}
          {selectedVisitorTeam && (
            <option value={selectedVisitorTeam}>{selectedVisitorTeam}</option>
          )}
        </select>
        {errors.teamWinner && (
          <ErrorMessage>{errors.teamWinner.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
