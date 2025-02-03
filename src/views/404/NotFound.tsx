import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-black mt-10">
        Pagina no encontrada
      </h1>
      <p className="mt-10 text-center text-white">
        La pagina que buscas no existe. Por favor, verifica la URL o regresa a
        la pagina de inicio. {""}
        <Link className="text-black underline" to={"/"}>
          Inicio
        </Link>
      </p>
    </>
  );
}
