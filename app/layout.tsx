import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Above Studio — Operação Aboveframe",
  description: "A operação da Aboveframe, do primeiro oi ao relatório final.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
