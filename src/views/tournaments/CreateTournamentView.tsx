import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import TournamentForm from "../../components/tournaments/TournamentForm";
import { TournamentFormData } from "../../types";
import { createTournament } from "../../api/TournamentAPI";
export default function CreateTournament() {
  const navigate = useNavigate();
  const initialValues: TournamentFormData = {
    dateStart: new Date(),
    dateEnd: new Date(),
    tournamentName: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const mutation = useMutation({
    mutationFn: createTournament,
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Continuar",
      });
    },
    onSuccess: (data) => {
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
    mutation.mutate(formData);
  };

  return (
    <>
      <header className="mb-10 flex justify-between items-center p-5">
        <h1 className="text-4xl text-white font-extrabold uppercase text-center">
          Nuevo Torneo
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
        className="bg-gradient-to-b from-blue-300 to-blue-600 mt-12 shadow-lg p-10 mx-10 rounded-lg"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <TournamentForm register={register} errors={errors} />
        <div className="flex justify-center">
          <input
            type="submit"
            value="Crear Torneo Nuevo"
            className="cursor-pointer text-black bg-gradient-to-b from-blue-300 to-blue-600 font-bold py-3 px-8 rounded-full shadow-md hover:bg-white transition-all"
          />
        </div>
      </form>
    </>
  );
}
