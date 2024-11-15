import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner"
import { auth } from "@/auth";



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session=await auth()
  return (
    <SessionProvider session={session}>
     <html lang="en">
      <body
        
      >
         <Toaster/>
        {children}
       
      </body>
     </html>
    </SessionProvider>
  );
}
