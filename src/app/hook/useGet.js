import { useState } from "react";
import Swal from "sweetalert2";

const API = "https://dev_s4pwaapil.sellatuparley.com";

export const useGet = () => {
  const [loading, setLoading] = useState(false);
  const getData = async ({ url, api = "API" }) => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/${url}`);

      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data?.message != "Codigo Valido!") {
        setLoading(false);
        // Swal.fire("", data?.error || "CÓDIGO NO VÁLIDO", "error");
        Swal.fire({
          title: "CÓDIGO NO VÁLIDO",
          text: "Este código ya ha sido usado o no es válido",
          icon: "error",
          draggable: true,
        });
        return [];
      }

      if (data?.message == "Codigo Valido!") {
        Swal.fire({
          title: "¡Código válido!",
          text: "Este código es válido para realizar la compra",
          icon: "success",
          draggable: true,
        });
      }
      setLoading(false);

      return data;
    } catch (e) {
      setLoading(false);
      return null;
    }
  };

  return { getData };
};
