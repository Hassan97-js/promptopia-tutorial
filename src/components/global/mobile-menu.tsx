import Image from "next/image";
import Link from "next/link";

import { ClientSafeProvider, signIn, signOut } from "next-auth/react";

type Props = {
  onToggleDropdown: () => void;
  onCloseDropdown: () => void;
  hasToggleDropdown: boolean;
  providers: ClientSafeProvider[] | null;
  user: User;
};

const MobileMenu = ({
  user,
  providers,
  onToggleDropdown,
  onCloseDropdown,
  hasToggleDropdown
}: Props) => {
  const isLoggedIn = !!user;
  const hasProviders = !!providers;

  return (
    <div className="sm:hidden flex items-center relative gap-3">
      {isLoggedIn ? (
        <div className="flex">
          <button type="button" onClick={onToggleDropdown}>
            <Image
              src={`${user?.image}`}
              className="rounded-full"
              width={35}
              height={35}
              alt="Profile Icon"
            />
          </button>

          {hasToggleDropdown ? (
            <div className="dropdown">
              <Link
                href="/profile"
                className="dropdown-link"
                onClick={onCloseDropdown}>
                My Profile
              </Link>
              <Link
                href="/create-prompt"
                className="dropdown-link"
                onClick={() => onCloseDropdown()}>
                Create Prompt
              </Link>
              <button
                className="btn black-btn | mt-5"
                type="button"
                onClick={() => {
                  onCloseDropdown();
                  signOut({ callbackUrl: "/" });
                }}>
                Sign Out
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <button
            className="btn black-btn"
            type="button"
            onClick={() => {
              onToggleDropdown;
            }}>
            Toggle Dropdown
          </button>
          {hasToggleDropdown && hasProviders ? (
            <div className="dropdown">
              {providers.map((p) => {
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => signIn(p.id)}
                    className="btn black-btn">
                    {p.name === "Credentials" ? "Sign in" : `Sign in With ${p.name}`}
                  </button>
                );
              })}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default MobileMenu;
