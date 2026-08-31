import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://above-studio.tekzgguk.chatgpt.site"),
  title: "Above Studio",
  description: "Gestão comercial e operacional da Aboveframe.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Above Studio",
    description: "Gestão comercial e operacional da Aboveframe.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Above Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Above Studio",
    description: "Gestão comercial e operacional da Aboveframe.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
