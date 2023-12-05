import NavBar from "@/components/Navbar";
import { Container } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";

import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adopt A Pet",
  description:
    "A website for matching potential pet owners and animals for adoption.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />

      <body className={inter.className}>
        <Providers>
          <NavBar />
          <Container maxW={"8xl"} py={"4"} px={"8"}>
            {children}
          </Container>
          <ToastContainer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
