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
      numberIpn: data.numberIpn,
      number: data.number,
      curp: data.curp,
      position: data.position,
      idCard: data.idCard,
      photoPlayer: data.photoPlayer,
      schedulePlayer: data.schedulePlayer,
      examMed: data.examMed,
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
    const formDataToSend = new FormData();

    // Añadir los campos normales
    formDataToSend.append("name", formData.name);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("numberIpn", formData.numberIpn.toString());
    formDataToSend.append("number", formData.number.toString());
    formDataToSend.append("curp", formData.curp);
    formDataToSend.append("position", formData.position);

    // Añadir archivos si existen
    if (
      formData.idCard &&
      formData.idCard instanceof FileList &&
      formData.idCard.length > 0
    ) {
      formDataToSend.append("idCard", formData.idCard[0]); // Acceder al primer archivo del FileList
    }
    if (
      formData.photoPlayer &&
      formData.photoPlayer instanceof FileList &&
      formData.photoPlayer.length > 0
    ) {
      formDataToSend.append("photoPlayer", formData.photoPlayer[0]); // Acceder al primer archivo del FileList
    }
    if (
      formData.schedulePlayer &&
      formData.schedulePlayer instanceof FileList &&
      formData.schedulePlayer.length > 0
    ) {
      formDataToSend.append("schedulePlayer", formData.schedulePlayer[0]); // Acceder al primer archivo del FileList
    }
    if (
      formData.examMed &&
      formData.examMed instanceof FileList &&
      formData.examMed.length > 0
    ) {
      formDataToSend.append("examMed", formData.examMed[0]); // Acceder al primer archivo del FileList
    }

    const data = {
      teamId,
      playerId,
      formData: formDataToSend,
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
                    className="text-black bg-blue-400 font-bold py-3 px-8 rounded-full shadow-md hover:bg-blue-600 transition-all w-full"
                    value="Editar Jugador"
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
