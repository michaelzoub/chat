import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const preview = true


const poppins =  Geist({
  weight: ["400", "700"],
  subsets: ["latin"]
})

const hentaiObj = {
  title: "Ecchi",
  description: "Chat with your favorite ecchi AI agents!",
}

const spaceObj = {
  title: "Space",
  description: "Chat with your favorite space AI agents!",
}

export const metadata: Metadata = {
  
    ...preview ? hentaiObj : spaceObj
  
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
