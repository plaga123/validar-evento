import { useState } from "react";

const API = "https://dev_s4pwaapil.sellatuparley.com";

export const useGet = () => {
  const [loading, setLoading] = useState(false);

  const getData = async ({ url }) => {
    setLoading(true);

    try {
      const response = await fetch(`${API}/${url}`);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          status: response.status,
          message: data?.error || "Error en la petición",
          data: null,
        };
      }

      console.log(data);

      if (data?.message !== "Codigo Valido!") {
        return {
          success: false,
          status: response.status,
          message:
            data?.message || "Este código ya ha sido usado o no es válido",
          data,
        };
      }

      return {
        success: true,
        status: response.status,
        message: data?.message || "¡Código válido!",
        data,
      };
    } catch (error) {
      return {
        success: false,
        status: null,
        message: error?.message || "Error de red",
        data: null,
      };
    } finally {
      setLoading(false);
    }
  };

  return { getData, loading };
};
