"use client"

import ViewToggle from "./ViewToggle";

import { openInNewTab } from "../lib/helpers";

export default function Navbar() {
    return (
        <nav className="px-4 sm:px-12 w-full flex items-center justify-between z-20">
            <span onClick={() => openInNewTab("https://www.samwelzimmer.com/")} className="font-medium text-3xl cursor-pointer">projects.</span>
            <div className="flex items-center gap-4">
                <ViewToggle />
            </div>
        </nav>
    );
}