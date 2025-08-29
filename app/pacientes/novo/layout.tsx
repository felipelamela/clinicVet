import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "black" },

    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
};

export default function NovoPacienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      {children}
    </Providers>
  );
}
