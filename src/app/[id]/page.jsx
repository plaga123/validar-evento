"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { Buscar } from "../components/ui/Buscar";
import { Header } from "../components/ui/Header";

const APICMS = "https://s4pwaapi.sellatuparley.com";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("No se pudo obtener la landing");
  }
  return response.json();
};

export default function Page() {
  const params = useParams();
  const id = params?.id ?? "";

  const { data: landing, error } = useSWR(
    id ? `${APICMS}/api/v1/landing/find_landing?id=${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  if (!landing?.activo) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <p className="bg-black/50 text-white text-center p-4 rounded-md">
          Esta landing no está disponible en este momento.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white text-slate-900 p-4 sm:p-8 md:p-12">
        <div className="max-w-2xl mx-auto">
          <Header />

          <Buscar landing_id={id} />
        </div>
      </div>
    </>
  );
}
