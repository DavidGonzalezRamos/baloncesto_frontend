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
        <div className="mx-auto w-[550px]">
          <Outlet />{" "}
        </div>
      </div>

      {/* Columna derecha: Imagen e información */}
      <div className="bg-blue-800 flex-1 flex p-5 flex-col items-center ">
        {/* Contenedor de imágenes superiores */}
        <div className="w-full flex justify-between items-center ">
          <img
            src="../../public/logotipo_ipn.webp"
            alt="Logotipo IPN"
            className="w-1/2 max-h-40 object-contain rounded-lg mr-72 "
          />
          <img
            src="../../public/logoESCOM.png"
            alt="Logotipo ESCOM"
            className="w-1/2 max-h-40 object-contain rounded-lg ml-80 "
          />
        </div>

        <img
          src="../../public/fotoBasket.JPG"
          alt="Equipo de baloncesto IPN"
          className="rounded-lg max-h-96 object-cover shadow-md border-4 border-white"
        />

        <div className="font-mono text-white space-y-3 mt-9">
          <h2 className="font-extrabold text-3xl  text-center">
            Tu pasión en la cancha y tu entrega en cada partido
          </h2>
          <h3 className="font-mono font-semibold text-2xl  text-center">
            Visualízalo aquí!!
          </h3>
          <p className="text-lg leading-relaxed   text-center">
            Con esta aplicación, podrás seguir de cerca cada detalle de tus
            partidos, desde estadísticas hasta el rendimiento de equipo.
            <br />
            Todo en un solo lugar, para que puedas: analizar, mejorar y llevar
            tu juego al siguiente nivel.
          </p>
        </div>

        <p className="italic text-white text-right w-full max-w-lg mt-20 text-sm ml-80">
          Hecho por: Ángel David González Ramos
        </p>
      </div>
    </div>
  );
}
