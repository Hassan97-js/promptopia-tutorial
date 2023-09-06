"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import type { ClientSafeProvider } from "next-auth/react";

import DesktopMenu from "@/components/global/desktop-menu";
import MobileMenu from "@/components/global/mobile-menu";

type Props = {
  user: User;
  providers: ClientSafeProvider[] | null;
};

const Navbar = ({ user, providers }: Props) => {
  const [hasToggleDropdown, setHasToggleDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setHasToggleDropdown((prevState) => !prevState);
  };

  const handleCloseDropdown = () => {
    setHasToggleDropdown(false);
  };

  return (
    <nav className="flex-between | w-full mb-16 pt-6">
      <Link href="/" className="flex-center | flex gap-2">
        <Image
          className="object-contain"
          src="/assets/images/logo.svg"
          width={35}
          height={35}
          alt=""
        />
        <span className="logo-text">Promptopia</span>
      </Link>

      {/* Desktop Navigation */}
      <DesktopMenu providers={providers} user={user} />

      {/* Mobile Navigation */}
      <MobileMenu
        user={user}
        onCloseDropdown={handleCloseDropdown}
        onToggleDropdown={handleToggleDropdown}
        providers={providers}
        hasToggleDropdown={hasToggleDropdown}
      />
    </nav>
  );
};

export default Navbar;
