import { useState } from "react";
import NewPasswordToken from "../../components/auth/NewPasswordToken";
import NewPasswordForm from "../../components/auth/NewPasswordForm";
import { Confirmtoken } from "../../types";

export default function NewPasswordView() {
  const [token, setToken] = useState<Confirmtoken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      <p className="text-xl font-mono mt-14 text-center">
        Reestablecer el password ingresando el codigo que recibiste{""}
        <span className=" text-blue-500 font-bold"> por email</span>
      </p>

      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
}
