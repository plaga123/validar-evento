"use client";

import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { CiBarcode } from "react-icons/ci";
import { useState } from "react";
import { useGet } from "@/app/hook/useGet";
import Swal from "sweetalert2";

export const Buscar = ({ landing_id }) => {
  const { getData, loading } = useGet();
  const [inputCode, setInputCode] = useState("");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const code = inputCode.trim();
    if (!code) return;

    const response = await getData({
      url: `api/v1/verificarCodigo?landing_id=${landing_id}&codigo=${code}`,
    });

    if (!response) {
      Swal.fire({
        title: "Error",
        text: "No se pudo procesar la solicitud",
        icon: "error",
        draggable: true,
      });
      return;
    }

    if (!response.success) {
      Swal.fire({
        title: "ERROR",
        text: response.message,
        icon: "error",
        draggable: true,
      });
      return;
    }

    Swal.fire({
      title: "¡Código válido para descuento!",
      text: response.message,
      icon: "success",
      draggable: true,
    });
  };
  return (
    <>
      <main>
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,51,153,0.08)] border border-slate-100 p-6 sm:p-8 transition-all">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
            <div className="space-y-3">
              <label className="text-[11px] uppercase tracking-widest text-slate-400 ml-1">
                Ingresar el código
              </label>
              <div className="grid gap-3 justify-items-center">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <CiBarcode size={28} />
                  </div>
                  <input
                    type="number"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    name="codigo"
                    placeholder="Código de descuento"
                    className="w-full pl-12 pr-6 py-2 placeholder:text-gray-400/80 rounded-2xl bg-slate-100 border-2 border-transparent focus:border-[#003399] focus:bg-white outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !inputCode}
                  className="w-40 py-2 bg-[#003399] hover:bg-[#002673] text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-100 active:scale-95 flex items-center justify-center gap-2"
                >
                  <MdOutlineScreenSearchDesktop size={20} />
                  VERIFICAR
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
