import { DefaultSession } from "next-auth";
import { ClientSafeProvider } from "next-auth/react";

export type NavbarProps = {
  user?: {
    id?: string;
  } & DefaultSession["user"];
  providers: ClientSafeProvider[] | null;
};

export type DesktopMenuProps = {
  user?: {
    id?: string;
  } & DefaultSession["user"];
  providers: ClientSafeProvider[] | null;
};

export type MobileMenuProps = {
  user?: {
    id?: string;
  } & DefaultSession["user"];
  toggleDropdown: boolean;
  providers: ClientSafeProvider[] | null;
  onToggleDropdown: () => void;
  onCloseDropdown: () => void;
};
