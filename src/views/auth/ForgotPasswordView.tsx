import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { forgotPassword } from "../../api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
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
      reset();
    },
  });

  const handleForgotPassword = (formData: ForgotPasswordForm) => {
    mutate(formData);
  };

  return (
    <>
      <p className="text-xl font-mono mt-14 text-center">
        Inserte su email de registro para {""}
        <span className=" text-blue-500 font-bold">
          {" "}
          reestablecer tu constraseña
        </span>
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10  bg-gray-300 mt-10 font-mono"
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
            className="w-full p-3  border-gray-300 border"
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
          value="Enviar Instrucciones"
          className="bg-blue-600 hover:bg-blue-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="flex-col flex space-y-4 text-center font-mono mt-8">
        <p>
          ¿Ya tienes cuenta? {""}
          <Link
            to={"/auth/login"}
            className="text-blue-500 font-bold underline"
          >
            Inicia sesión aquí
          </Link>
        </p>

        <p>
          ¿No tienes Cuenta? {""}
          <Link
            to={"/auth/register"}
            className="text-blue-500 font-bold underline"
          >
            Registrate aquí
          </Link>
        </p>
      </nav>
    </>
  );
}
