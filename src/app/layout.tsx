import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";


const poppins =  Geist({
  weight: ["400", "700"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Ecchi",
  description: "Chat with your favorite ecchi AI agents!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}`}
      >
        {children}
      </body>
    </html>
  );
}
