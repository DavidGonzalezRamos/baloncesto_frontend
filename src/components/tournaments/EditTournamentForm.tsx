import { Link, useNavigate } from "react-router-dom";
import TournamentForm from "./TournamentForm";
import { Tournament, TournamentFormData } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTournament } from "../../api/TournamentAPI";
import Swal from "sweetalert2";

type EditTournamentFormProps = {
  data: TournamentFormData;
  tournamentId: Tournament["_id"];
};

export default function EditTournamentForm({
  data,
  tournamentId,
}: EditTournamentFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
      tournamentName: data.tournamentName,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTournament,
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Continuar",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
      queryClient.invalidateQueries({
        queryKey: ["editTournament", tournamentId],
      });
      Swal.fire({
        title: "Felicidades!",
        text: data,
        icon: "success",
        confirmButtonText: "Continuar",
      });
      navigate("/tournaments");
    },
  });

  const handleForm = (formData: TournamentFormData) => {
    const data = {
      formData,
      tournamentId,
    };
    mutate(data);
  };

  return (
    <>
      <header className="mb-10 flex justify-between items-center p-5">
        <h1 className="text-4xl text-white font-extrabold uppercase text-center">
          Editar Torneo
        </h1>
        <div>
          <Link to="/tournaments">
            <button className="font-mono font-semibold bg-blue-700 text-white py-2 px-12 rounded-full">
              Regresar a los torneos
            </button>
          </Link>
        </div>
      </header>

      <form
        className="bg-blue-700 mt-12 shadow-lg p-10 mx-10 rounded-lg"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <TournamentForm register={register} errors={errors} />
        <div className="p-6 bg-white rounded-xl shadow-md mb-7">
          <p className="font-mono py-8  text-black">
            Estas son las fechas registradas si no deseas hacerle algún cambio
            ingresalas nuevamente:
          </p>
          <p className="font-mono py-8  text-black">
            Fecha de inicio:{" "}
            {new Date(data.dateStart).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}{" "}
            - Fecha de fin:{" "}
            {new Date(data.dateEnd).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            value="Editar Torneo"
            className="text-black bg-blue-400 font-bold py-3 px-8 rounded-full shadow-md hover:bg-white transition-all"
          />
        </div>
      </form>
    </>
  );
}
