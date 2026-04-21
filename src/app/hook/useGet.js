import { useState } from "react";
import Swal from "sweetalert2";

// const API = "https://dev_s4pwaapil.sellatuparley.com";
const API = "https://s4pwaapi.sellatuparley.com";

export const usePost = () => {
  const [loading, setLoading] = useState(false);

  const onPost = async ({ url, obj }) => {
    try {
      setLoading(true);

      const response = await fetch(`${API}/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (response.status === 200 || response.status === 400) {
        const data = await response.json();
        // console.log(data);
        return data;
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      return { success: false, message: error.message || "Error desconocido" };
    } finally {
      setLoading(false);
    }
  };

  // const postData = async ({ url, data }) => {
  //   setLoading(true);

  //   try {
  //     const response = await fetch(`${API}/${url}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     console.log(response);
  //     // const responseData = await response.json();

  //     // if (!response.ok) {
  //     //   return {
  //     //     success: false,
  //     //     status: response.status,
  //     //     message: response?.error || "Error en la petición",
  //     //     data: null,
  //     //   };
  //     // }

  //     // console.log(response);

  //     // if (response?.message !== "Codigo Valido!") {
  //     //   return {
  //     //     success: false,
  //     //     status: response.status,
  //     //     message:
  //     //       response?.message || "Este código ya ha sido usado o no es válido",
  //     //     data: response,
  //     //   };
  //     // }

  //     // return {
  //     //   success: true,
  //     //   status: response.status,
  //     //   message: response?.message || "¡Código válido!",
  //     //   data: response,
  //     // };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       status: null,
  //       message: error?.message || "Error de red",
  //       data: null,
  //     };
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return { onPost, loading };
};
