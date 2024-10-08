import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TeamFormData } from "../../types/index";
import ErrorMessage from "../ErrorMessage";

type TeamFormProps = {
  errors: FieldErrors<TeamFormData>;
  register: UseFormRegister<TeamFormData>;
};

export default function TeamForm({ errors, register }: TeamFormProps) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="nameTeam">
          Nombre del equipo
        </label>
        <input
          id="nameTeam"
          type="text"
          placeholder="Nombre del equipo"
          className="w-full p-3  border-gray-300 border"
          {...register("nameTeam", {
            required: "El nombre del equipo es obligatorio",
          })}
        />
        {errors.nameTeam && (
          <ErrorMessage>{errors.nameTeam.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="nameCoach">
          Nombre del entrenador
        </label>
        <textarea
          id="nameCoach"
          placeholder="Nombre del entrenador"
          className="w-full p-3  border-gray-300 border"
          {...register("nameCoach", {
            required: "El nombre del entrenador es obligatorio",
          })}
        />
        {errors.nameCoach && (
          <ErrorMessage>{errors.nameCoach.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="branchTeam">
          Rama del equipo
        </label>
        <select
          id="branchTeam"
          className="w-full p-3 border-gray-300 border"
          {...register("branchTeam", {
            required: "La rama del equipo es obligatoria",
          })}
        >
          <option value="">Selecciona la rama del equipo</option>
          <option value="Varonil">Varonil</option>
          <option value="Femenil">Femenil</option>
        </select>
        {errors.branchTeam && (
          <ErrorMessage>{errors.branchTeam.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
