"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider
        // Re-fetch session every 5 minutes
        refetchInterval={5 * 60}
        // refetchOnWindowFocus={true}
        refetchWhenOffline={false}>
        {children}
      </SessionProvider>
    </>
  );
};

export default AuthProvider;
