"use client";
import Link from "next/link";

import ViewToggle from "../misc/ViewToggle";

import { PORTFOLIO_HOME_URL } from "@/lib/constants";

export default function Navbar() {
  return (
    <nav className="px-4 sm:px-12 xl:px-0 w-full max-w-5xl mx-auto flex items-center justify-between z-20">
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
