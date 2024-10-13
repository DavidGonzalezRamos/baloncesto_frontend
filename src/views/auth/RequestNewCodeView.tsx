import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCode } from "../../api/AuthAPI";
import Swal from "sweetalert2";

export default function RequestNewCodeView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,
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
    },
  });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
    mutate(formData);
    reset();
  };

  return (
    <>
      <h1 className="text-4xl font-black mt-14 font-mono">
        Solicitar Código de Confirmación
      </h1>
      <p className="text-2xl font-light  mt-5 font-mono">
        Coloca tu e-mail para recibir {""}
        <span className=" text-blue-500 font-bold"> un nuevo código</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-8 p-10 rounded-lg bg-gray-300 mt-10 font-mono"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 rounded-lg border-gray-300 border"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Enviar Código"
          className="bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4 font-mono">
        <p className="text-center">
          {" "}
          ¿Ya tienes cuenta?{" "}
          <Link to="/auth/login" className="underline">
            Iniciar Sesión
          </Link>
        </p>

        <p className="text-center">
          ¿Olvidaste tu contraseña?{" "}
          <Link to="/auth/forgot-password" className="underline">
            Reestablecer
          </Link>
        </p>
      </nav>
    </>
  );
}
