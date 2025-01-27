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

  const queryClient = useQueryClient();

  // Configuración inicial del formulario con `defaultValues`
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentFormData>({
    defaultValues: {
      dateStart: new Date(data.dateStart).toISOString().split("T")[0], // Formato YYYY-MM-DD
      dateEnd: new Date(data.dateEnd).toISOString().split("T")[0],
      tournamentName: data.tournamentName,
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateTournament,
    onError: (error: any) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Continuar",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
      queryClient.invalidateQueries({
        queryKey: ["editTournament", tournamentId],
      });
      Swal.fire({
        title: "¡Felicidades!",
        text: "El torneo se actualizó correctamente.",
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
        {/* Pasamos register y valores iniciales */}
        <TournamentForm register={register} errors={errors} />

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
