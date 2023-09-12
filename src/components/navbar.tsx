"use client";

import { useState } from "react";
import Link from "next/link";

import DesktopMenu from "@/components/global/desktop-menu";
import MobileMenu from "@/components/global/mobile-menu";

import type { NavbarProps } from "@/types/navbar.types";

const Navbar = ({ user, providers }: NavbarProps) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setToggleDropdown((prevState) => !prevState);
  };

  const handleDropdownClose = () => {
    setToggleDropdown(false);
  };

  return (
    <nav className="flex-between | w-full mb-24 pt-6">
      <Link href="/" className="flex-center | flex gap-2">
        {/* <Image
          className="object-contain"
          src="/assets/images/logo.svg"
          width={35}
          height={35}
          alt=""
        /> */}
        <span className="max-sm:hidden tracking-tight text-slate-800 font-semibold text-2xl ml-3">
          Promptopia
        </span>
      </Link>

      <DesktopMenu providers={providers} user={user} />

      <MobileMenu
        user={user}
        onCloseDropdown={handleDropdownClose}
        onToggleDropdown={handleDropdownToggle}
        providers={providers}
        toggleDropdown={toggleDropdown}
      />
    </nav>
  );
};

export default Navbar;
