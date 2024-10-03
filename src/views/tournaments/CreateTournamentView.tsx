import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
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

  const handleForm = async (formData: TournamentFormData) => {
    const data = await createTournament(formData);
    Swal.fire({
      title: "Felicidades!",
      text: data,
      icon: "success",
      confirmButtonText: "Continuar",
    });
    navigate("/tournaments");
  };

  return (
    <>
      <header className="mb-10 flex justify-between items-center p-5">
        <h1 className="text-4xl text-white font-extrabold uppercase text-center">
          Nuevo Torneo
        </h1>
        <div>
          <Link to="/tournaments">
            <button className="font-mono font-semibold bg-zinc-700 text-white py-2 px-12 rounded-full">
              Regresar a los torneos
            </button>
          </Link>
        </div>
      </header>

      <form
        className="bg-zinc-700 mt-12 shadow-lg p-10 mx-10 rounded-lg"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <TournamentForm register={register} errors={errors} />
        <div className="flex justify-center">
          <input
            type="submit"
            value="Crear Torneo Nuevo"
            className="text-black bg-zinc-400 font-bold py-3 px-8 rounded-full shadow-md hover:bg-white transition-all"
          />
        </div>
      </form>
    </>
  );
}
