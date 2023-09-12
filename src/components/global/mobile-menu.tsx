import Image from "next/image";
import Link from "next/link";

import { signIn, signOut } from "next-auth/react";
import type { MobileMenuProps } from "@/types/navbar.types";

const MobileMenu = ({
  user,
  providers,
  onToggleDropdown,
  onCloseDropdown,
  toggleDropdown
}: MobileMenuProps) => {
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

          {toggleDropdown ? (
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
                className="btn btn-black | mt-5"
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
            className="btn btn-black"
            type="button"
            onClick={() => onToggleDropdown()}>
            Toggle Dropdown
          </button>
          {toggleDropdown && hasProviders ? (
            <div className="dropdown">
              {providers.map((p) => {
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => signIn(p.id)}
                    className="btn btn-black">
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
