import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PlayerFormData } from "../../types/index";
import ErrorMessage from "../ErrorMessage";

type PlayerFormProps = {
  errors: FieldErrors<PlayerFormData>;
  register: UseFormRegister<PlayerFormData>;
};

export default function PlayerForm({ errors, register }: PlayerFormProps) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="namePlayer">
          Nombre del jugador
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre del jugador"
          className="w-full p-3  border-gray-300 border"
          {...register("name", {
            required: "El nombre del jugador es obligatorio",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="lastName">
          Apellidos del jugador
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="Apellidos del jugador"
          className="w-full p-3  border-gray-300 border"
          {...register("lastName", {
            required: "Los apellidos del jugador son obligatorios",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="curp">
          CURP del jugador
        </label>
        <input
          id="curp"
          type="text"
          placeholder="CURP del jugador"
          className="w-full p-3  border-gray-300 border"
          {...register("curp", {
            required: "El CURP del jugador es obligatorio",
            minLength: {
              value: 18,
              message: "El CURP es de 18 caracteres",
            },
          })}
        />
        {errors.curp && <ErrorMessage>{errors.curp.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="number">
          Número del jugador
        </label>
        <input
          id="numberPlayer"
          type="text"
          placeholder="Número del jugador"
          className="w-full p-3  border-gray-300 border"
          {...register("number", {
            required: "El número del jugador es obligatorio",
          })}
        />
        {errors.number && <ErrorMessage>{errors.number.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="position">
          Posición del jugador
        </label>
        <select
          id="branchTeam"
          className="w-full p-3 border-gray-300 border"
          {...register("position", {
            required: "La rama del equipo es obligatoria",
          })}
        >
          <option value="">Selecciona la posición del jugador</option>
          <option value="Base">Base</option>
          <option value="Escolta">Escolta</option>
          <option value="Alero">Alero</option>
          <option value="Ala-Pivot">Ala-Pivot</option>
          <option value="Pivot">Pivot</option>
        </select>
        {errors.position && (
          <ErrorMessage>{errors.position.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
