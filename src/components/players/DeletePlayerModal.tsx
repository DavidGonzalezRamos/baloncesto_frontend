import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { CheckPasswordForm } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkPassword } from "../../api/AuthAPI";
import Swal from "sweetalert2";
import { deletePlayer } from "../../api/PlayerAPI";

export default function DeletePlayerModal() {
  const initialValues: CheckPasswordForm = {
    password: "",
  };
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const teamId = params.teamId!;

  const queryParams = new URLSearchParams(location.search);
  const deletePlayerId = queryParams.get("deletePlayer")!;
  const show = deletePlayerId ? true : false;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();
  const checkPasswordMutation = useMutation({
    mutationFn: checkPassword,
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Continuar",
      });
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: deletePlayer,
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
      queryClient.invalidateQueries();
      queryClient.invalidateQueries({
        queryKey: ["team", teamId],
      });
      navigate(location.pathname, { replace: true });
      reset();
    },
  });

  const handleForm = async (formData: CheckPasswordForm) => {
    await checkPasswordMutation.mutateAsync(formData);
    await deleteTeamMutation.mutateAsync({ teamId, playerId: deletePlayerId });
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => navigate(location.pathname, { replace: true })}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                <Dialog.Title as="h3" className="font-black text-4xl  my-5">
                  Eliminar Jugador{" "}
                </Dialog.Title>

                <p className="text-xl font-bold">
                  Confirma la eliminación del jugador {""}
                  <span className="text-blue-600">colocando tu contraseña</span>
                </p>

                <form
                  className="mt-10 space-y-5"
                  onSubmit={handleSubmit(handleForm)}
                  noValidate
                >
                  <div className="flex flex-col gap-3">
                    <label className="font-normal text-2xl" htmlFor="password">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Constraseña de usuario"
                      className="w-full p-3  border-gray-300 border"
                      {...register("password", {
                        required: "La constraseña es obligatorio",
                      })}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="text-black bg-blue-400 font-bold py-3 px-8 rounded-full shadow-md hover:bg-blue-600 transition-all w-full"
                    value="Eliminar Jugador"
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
