"use client";

import { useSearchParams } from "next/navigation";

const AuthError = () => {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");
  return <div>Auth Error page: {error}</div>;
};

export default AuthError;
