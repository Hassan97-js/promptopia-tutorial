import { getServerSession } from "next-auth/next";

import { getProviders } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import AuthProvider from "@/context/auth-provider";
import Navbar from "@/components/navbar";

import { Poppins } from "next/font/google";

import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts"
};

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap"
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();
  const providersValues = providers && Object.values(providers);

  return (
    <html lang="en">
      <body className={`min-h-screen text-slate-900 ${poppins.className}`}>
        <div className="gradient-wrapper">
          <div className="gradient" />
        </div>
        <AuthProvider>
          <main className="app | container">
            <Navbar user={session?.user} providers={providersValues} />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
