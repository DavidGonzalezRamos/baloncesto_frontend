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
          Nombre
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
          Apellidos
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
        {errors.lastName && (
          <ErrorMessage>{errors.lastName.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="curp">
          CURP
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
              message: "El CURP debe tener 18 caracteres",
            },
          })}
        />
        {errors.curp && <ErrorMessage>{errors.curp.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="numberIpn">
          Boleta
        </label>
        <input
          id="numberIpn"
          type="number"
          placeholder="Boleta del jugador"
          className="w-full p-3  border-gray-300 border"
          {...register("numberIpn", {
            required: "La boleta del jugador es obligatorio",
            minLength: {
              value: 10,
              message: "La boleta debe tener 10 caracteres",
            },
          })}
        />
        {errors.numberIpn && (
          <ErrorMessage>{errors.numberIpn.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="number">
          Número
        </label>
        <input
          id="numberPlayer"
          type="number"
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
          Posición
        </label>
        <select
          id="position"
          className="w-full p-3 border-gray-300 border"
          {...register("position", {
            required: "La posición del jugador es obligatoria",
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

      {/* Archivos */}
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="idCard">
          Credencial del IPN (PDF)
        </label>
        <input
          id="idCard"
          type="file"
          className="w-full p-3 border-gray-300 border"
          {...register("idCard", {
            required: "El documento de identificación es obligatorio",
          })}
        />
        {errors.idCard && <ErrorMessage>{errors.idCard.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="schedulePlayer">
          Horario del jugador (PDF)
        </label>
        <input
          id="schedulePlayer"
          type="file"
          className="w-full p-3 border-gray-300 border"
          {...register("schedulePlayer", {
            required: "El horario del jugador es obligatorio",
          })}
        />
        {errors.schedulePlayer && (
          <ErrorMessage>{errors.schedulePlayer.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="photoPlayer">
          Foto del jugador (Imagen)
        </label>
        <input
          id="photoPlayer"
          type="file"
          accept="image/*"
          className="w-full p-3 border-gray-300 border"
          {...register("photoPlayer", {
            required: "La foto del jugador es obligatoria",
          })}
        />
        {errors.photoPlayer && (
          <ErrorMessage>{errors.photoPlayer.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="examMed">
          Examen médico (PDF)
        </label>
        <input
          id="examMed"
          type="file"
          className="w-full p-3 border-gray-300 border"
          {...register("examMed", {
            required: "El examen médico es obligatorio",
          })}
        />
        {errors.examMed && (
          <ErrorMessage>{errors.examMed.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
