import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ClientSafeProvider, signIn, signOut } from "next-auth/react";

type Props = {
  providers: ClientSafeProvider[] | null;
  user: User;
};

const DesktopMenu = ({ providers, user }: Props) => {
  const [signinResponseError, setSigninResponseError] = useState<
    string | null | undefined
  >();

  const hasProviders = !!providers;
  const isLoggedIn = !!user;

  signinResponseError && alert(signinResponseError);

  return (
    <div className="sm:flex hidden">
      <div className="flex items-center gap-3 md:gap-5">
        {hasProviders && !isLoggedIn ? (
          providers.map((p) => {
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  signIn(p.id);
                }}
                className="btn btn-black">
                {p.name === "Credentials" ? "Sign in" : `Sign in With ${p.name}`}
              </button>
            );
          })
        ) : (
          <>
            <Link href="/create-prompt" className="btn btn-black">
              Create Prompt
            </Link>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="btn btn-outline">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={`${user?.image}`}
                className="rounded-full"
                width={35}
                height={35}
                alt="Profile Icon"
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default DesktopMenu;
