import { Link } from "react-router-dom";

export default function MenuTournaments() {
  return (
    <>
      <div className=" bg-white shadow-lg rounded-xl border-b-4 fixed top-8 p-4 w-4/5">
        <h1 className="font-mono text-5xl text-black font-extrabold uppercase">
          Torneos
        </h1>
      </div>
      <div>
        <div className="p-6 bg-white rounded-xl shadow-md mb-7">
          <h2 className="font-mono text-3xl  text-black">Torneos anteriores</h2>
          <p className="font-mono text-2xl py-8  text-black">
            No hay torneos anteriores
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md mb-6 text-center ">
          <p className="font-mono text-2xl py-20 text-black">
            Actualmente no hay un torneo en curso
          </p>
          <button className="font-mono text-2xl font-semibold bg-gradient-to-b from-zinc-300 to-zinc-600 text-white py-4 px-12 rounded-full">
            <Link to="/tournaments/new">Crear Nuevo Torneo</Link>
          </button>
        </div>
      </div>
    </>
  );
}
