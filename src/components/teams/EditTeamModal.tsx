import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Team, TeamFormData } from "../../types";
import { useForm } from "react-hook-form";
import TeamForm from "./TeamForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeam } from "../../api/TeamAPI";
import Swal from "sweetalert2";

type EditTeamModalProps = {
  data: Team;
  teamId: Team["_id"];
};

export default function EditTeamModal({ data, teamId }: EditTeamModalProps) {
  const navigate = useNavigate();

  //Obtener tournamentId
  const params = useParams();
  const tournamentId = params.tournamentId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamFormData>({
    defaultValues: {
      nameTeam: data.nameTeam,
      nameCoach: data.nameCoach,
      branchTeam: data.branchTeam,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTeam,
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Continuar",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["editTournament", tournamentId],
      });
      Swal.fire({
        title: "Felicidades!",
        text: data,
        icon: "success",
        confirmButtonText: "Continuar",
      });
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleEditTeam = (formData: TeamFormData) => {
    const data = {
      tournamentId,
      teamId,
      formData,
    };
    mutate(data);
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => navigate(location.pathname, { replace: true })}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                <DialogTitle as="h3" className="font-black text-4xl  my-5">
                  Editar Equipo
                </DialogTitle>

                <p className="text-xl font-bold">
                  Realiza cambios a un equipo en {""}
                  <span className="text-zinc-600">este formulario</span>
                </p>

                <form
                  className="mt-10 space-y-3"
                  noValidate
                  onSubmit={handleSubmit(handleEditTeam)}
                >
                  <TeamForm register={register} errors={errors} />
                  <input
                    type="submit"
                    className=" bg-blue-600 hover:bg-blue-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value="Guardar Equipo"
                  />
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
