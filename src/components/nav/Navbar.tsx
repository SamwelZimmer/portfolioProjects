"use client";
import Link from "next/link";

import ViewToggle from "../misc/ViewToggle";

import { PORTFOLIO_HOME_URL } from "@/lib/constants";

export default function Navbar() {
  return (
    <nav className="px-4 sm:px-12 w-full flex items-center justify-between z-20">
      <Link
        className="font-medium text-3xl cursor-pointer text-primary"
        href={PORTFOLIO_HOME_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        projects.
      </Link>

      <div className="flex items-center gap-4">
        <ViewToggle />
      </div>
    </nav>
  );
}
