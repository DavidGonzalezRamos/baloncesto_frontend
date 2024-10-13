import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex h-screen bg-white">
      {/* Columna izquierda: Formulario de autenticación */}
      <div className="flex-1 p-5 flex flex-col items-center mt-6">
        <h2 className="font-mono font-bold text-4xl">Bienvenido de nuevo</h2>
        <h3 className="font-mono font-bold text-4xl">
          Estadísticas Baloncesto IPN
        </h3>
        <p className="font-mono font-semibold">
          Ingresa tu usuario y contraseña para continuar
        </p>
        <div className="mx-auto w-[550px]">
          <Outlet />{" "}
        </div>
      </div>

      {/* Columna derecha: Imagen e información */}
      <div className="bg-gradient-to-b from-blue-300 to-blue-600 flex-1 flex justify-center  p-5">
        <div className="text-center text-black">
          <img
            src="../../public/marcoIPN.jpg"
            alt="Equipo de baloncesto IPN"
            className="w-full max-h-40 opacity-20 mb-5 mt-0"
          />
          <img
            src="../../public/fotoBasket.JPG"
            alt="Equipo de baloncesto IPN"
            className="opacity-60 rounded-lg mb-5 max-h-96"
          />
          <div className="font-mono">
            <h2 className="font-mono font-bold text-2xl">
              Tu pasión en la cancha y tu entrega en cada partido
            </h2>
            <h3 className="font-mono font-bold text-2xl">Visualízalo aquí!!</h3>
            <p className="font-mono">
              Con esta aplicación, podrás seguir de cerca cada detalle de tus
              partidos, desde estadísticas hasta el rendimiento de equipo.
              <br />
              Todo en un solo lugar, para que puedas: analizar, mejorar y llevar
              tu juego al siguiente nivel.
            </p>
          </div>
          <p className="italic mt-8">Hecho por: Ángel David González Ramos</p>
        </div>
      </div>
    </div>
  );
}
