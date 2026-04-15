import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public", // Dónde se generará el Service Worker
  cacheOnFrontEndNav: true, // Mejora la experiencia offline al navegar
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development", // Desactivar en desarrollo para evitar bugs de caché
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tus configuraciones normales de Next.js aquí
};

export default withPWA(nextConfig);