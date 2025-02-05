import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { generateTeamPDF } from "../../api/TeamAPI";

export default function CreateInfoTeams() {
  const { data: user } = useAuth(); // Obtener los datos del usuario
  const params = useParams();
  const teamId = params.teamId!;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: generateTeamPDF,
    onError: (error: any) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Continuar",
      });
    },
    onSuccess: (data: Blob) => {
      queryClient.invalidateQueries({
        queryKey: ["team", teamId],
      });

      // Crear un enlace para descargar el archivo PDF
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Team_${teamId}.pdf`); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove();

      Swal.fire({
        title: "¡Felicidades!",
        text: "El PDF se generó correctamente y está listo para descargar.",
        icon: "success",
        confirmButtonText: "Continuar",
      });
    },
  });

  const handleGeneratePDF = () => {
    mutate({ teamId }); // Llamar a la función de generación de PDF
  };

  return (
    <>
      {user?.role === "admin" && (
        <button
          type="button"
          className="mt-5 font-mono text-2xl font-semibold bg-gradient-to-b from-teal-300 to-teal-600 text-white py-2 px-4 rounded-lg ml-2"
          onClick={handleGeneratePDF}
        >
          Generar cédula de jugadores
        </button>
      )}
    </>
  );
}
