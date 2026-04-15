// app/layout.js

export const metadata = {
  title: "PWA Sellatuparley",
  description: "Sellatuparley",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PWA",
    // startupImage: [] // Opcional: puedes añadir imágenes de carga aquí
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Aunque Next.js maneja el manifest en metadata, 
          algunos navegadores antiguos prefieren el link explícito 
        */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/sellatuparley.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
