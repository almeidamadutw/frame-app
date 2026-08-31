import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://above-studio.tekzgguk.chatgpt.site"),
  title: "Above Studio — Operação Aboveframe",
  description: "A operação da Aboveframe, do primeiro oi ao relatório final.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Above Studio — Operação Aboveframe",
    description: "A operação da Aboveframe, do primeiro oi ao relatório final.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Above Studio — Operação Aboveframe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Above Studio — Operação Aboveframe",
    description: "A operação da Aboveframe, do primeiro oi ao relatório final.",
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
