import { useForm } from "react-hook-form";
import { UserLoginForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/AuthAPI";
import Swal from "sweetalert2";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Continuar",
      });
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      <p className="font-mono font-semibold mt-6 text-center">
        Ingresa tu usuario y contraseña para continuar
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-20 bg-white font-mono"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Ingresa tu correo electrónico"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="text-2xl">Contraseña</label>

          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-blue-600 hover:bg-blue-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="flex-col flex space-y-4 text-center font-mono">
        <p>
          ¿No tienes Cuenta? {""}
          <Link
            to={"/auth/register"}
            className="text-blue-500 font-bold underline"
          >
            Registrate aquí
          </Link>
        </p>

        <p>
          ¿Olvidaste tu contraseña? {""}
          <Link
            to={"/auth/forgot-password"}
            className="text-blue-500 font-bold underline"
          >
            Reestablecer aquí
          </Link>
        </p>
      </nav>
    </>
  );
}
