import ErrorMessage from "../ErrorMessage";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { TournamentFormData } from "../../types";

type TournamentFormProps = {
  register: UseFormRegister<TournamentFormData>;
  errors: FieldErrors<TournamentFormData>;
};

export default function TournamentForm({
  register,
  errors,
}: TournamentFormProps) {
  {
    return (
      <>
        <div className="mb-5 space-y-3">
          <label
            htmlFor="dateStart"
            className="text-white text-sm uppercase font-bold"
          >
            Fecha de Inicio
          </label>
          <input
            id="dateStart"
            className="w-full p-3  border border-gray-200"
            type="date"
            placeholder="Fecha de inicio del Torneo"
            {...register("dateStart", {
              required: "La fecha de inicio es obligatoria",
            })}
          />

          {errors.dateStart && (
            <ErrorMessage>{errors.dateStart.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5 space-y-3">
          <label
            htmlFor="dateEnd"
            className="text-white text-sm uppercase font-bold"
          >
            Fecha de Fin
          </label>
          <input
            id="dateEnd"
            className="w-full p-3  border border-gray-200"
            type="date"
            placeholder="Fecha de fin del Torneo"
            {...register("dateEnd", {
              required: "La fecha de finalización es obligatoria",
            })}
          />

          {errors.dateEnd && (
            <ErrorMessage>{errors.dateEnd.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5 space-y-3">
          <label
            htmlFor="tournamentName"
            className="text-white  text-sm uppercase font-bold"
          >
            Nombre del Torneo
          </label>
          <textarea
            id="tournamentName"
            className="w-full p-3  border border-gray-200"
            placeholder="Nombre del Torneo"
            {...register("tournamentName", {
              required: "El nombre del torneo es obligatorio",
            })}
          />

          {errors.tournamentName && (
            <ErrorMessage>{errors.tournamentName.message}</ErrorMessage>
          )}
        </div>
      </>
    );
  }
}
