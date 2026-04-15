import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public", // Dónde se generará el Service Worker
  cacheOnFrontEndNav: true, // Mejora la experiencia offline al navegar
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  // disable: process.env.NODE_ENV === "development", // Desactivar en desarrollo para evitar bugs de caché
  disable: process.env.NODE_ENV === "development",

  disable: false,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-webfonts",
        expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
      },
    },

    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: "StaleWhileRevalidate",
      options: { cacheName: "static-font-assets" },
    },
    {
      urlPattern: /\.(?:css|js)$/i,
      handler: "StaleWhileRevalidate",
      options: { cacheName: "static-resources" },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tus configuraciones normales de Next.js aquí
};

export default withPWA(nextConfig);
