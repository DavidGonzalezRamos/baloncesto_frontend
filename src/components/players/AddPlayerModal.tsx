import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PlayerForm from "./PlayerForm";
import { PlayerFormData } from "../../types/index";
import { useForm } from "react-hook-form";
import { createPlayer } from "../../api/PlayerAPI";
import Swal from "sweetalert2";

export default function AddPlayerModal() {
  const navigate = useNavigate();
  // Leer si modal existe
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalPlayer = queryParams.get("newPlayer");
  const show = modalPlayer ? true : false;

  //Obtener teamId
  const params = useParams();
  const teamId = params.teamId!;

  const initialValues: PlayerFormData = {
    name: "",
    lastName: "",
    number: 0,
    curp: "",
    position: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createPlayer,
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
        queryKey: ["player", teamId],
      });
      Swal.fire({
        title: "Felicidades!",
        text: data,
        icon: "success",
      });
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleCreatePlayer = (formData: PlayerFormData) => {
    const data = {
      formData,
      teamId,
    };
    mutate(data);
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
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

          <div className="fixed inset-0 overflow-y-auto font-mono">
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
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-12">
                  <DialogTitle as="h3" className="font-black text-4xl  my-5">
                    Nuevo Jugador
                  </DialogTitle>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-zinc-700">un Jugador</span>
                  </p>

                  <form
                    className="mt-10 space-y-3"
                    noValidate
                    onSubmit={handleSubmit(handleCreatePlayer)}
                  >
                    <PlayerForm register={register} errors={errors} />
                    <input
                      type="submit"
                      value="Guardar Equipo"
                      className="text-black bg-blue-400 font-bold py-3 px-8 rounded-full shadow-md hover:bg-blue-600 transition-all w-full"
                    />
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
