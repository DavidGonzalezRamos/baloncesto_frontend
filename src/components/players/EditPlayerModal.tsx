import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Player, PlayerFormData } from "../../types";
import { useForm } from "react-hook-form";
import PlayerForm from "./PlayerForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlayer } from "../../api/PlayerAPI";
import Swal from "sweetalert2";

type EditPlayerModalProps = {
  data: Player;
  playerId: Player["_id"];
};

export default function EditPlayerModal({
  data,
  playerId,
}: EditPlayerModalProps) {
  const navigate = useNavigate();

  //Obtener teamId
  const params = useParams();
  const teamId = params.teamId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlayerFormData>({
    defaultValues: {
      name: data.name,
      lastName: data.lastName,
      number: data.number,
      curp: data.curp,
      position: data.position,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updatePlayer,
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Continuar",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      queryClient.invalidateQueries({
        queryKey: ["editTeam", teamId],
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

  const handleEditPlayer = (formData: PlayerFormData) => {
    const data = {
      teamId,
      playerId,
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
                  Editar Jugador
                </DialogTitle>

                <p className="text-xl font-bold">
                  Realiza cambios a un jugador en {""}
                  <span className="text-zinc-600">este formulario</span>
                </p>

                <form
                  className="mt-10 space-y-3"
                  noValidate
                  onSubmit={handleSubmit(handleEditPlayer)}
                >
                  <PlayerForm register={register} errors={errors} />
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
