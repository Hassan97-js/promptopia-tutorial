import { getServerSession } from "next-auth/next";

import { getProviders } from "next-auth/react";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";

import AuthProvider from "@/context/auth-provider";
import Navbar from "@/components/navbar";

import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts"
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(OPTIONS);
  const providers = await getProviders();
  const providersValues = providers && Object.values(providers);

  // console.log(providersValues);

  return (
    <html lang="en">
      <body className="min-h-screen text-slate-900">
        <div className="gradient-wrapper">
          <div className="gradient" />
        </div>
        <AuthProvider>
          <main className="app">
            <Navbar user={session?.user} providers={providersValues} />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
