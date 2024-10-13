import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { Confirmtoken } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "../../api/AuthAPI";
import Swal from "sweetalert2";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<Confirmtoken["token"]>("");

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
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

  const handleChange = (token: Confirmtoken["token"]) => {
    setToken(token);
  };

  const handleComplete = (token: Confirmtoken["token"]) => {
    mutate({ token });
  };

  return (
    <>
      <h1 className=" mt-16 text-5xl font-black font-mono">
        Confirma tu Cuenta
      </h1>
      <p className="text-2xl font-light mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-blue-500 font-bold"> por e-mail</span>
      </p>

      <form className="space-y-8 p-10 bg-blue-600 mt-10">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-black font-normal underline"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
