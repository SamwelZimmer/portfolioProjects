import ViewToggle from "./ViewToggle";

export default function Navbar() {
    return (
        <nav className="px-4 sm:px-12 w-full flex items-center justify-between z-20">
            <span className="font-medium text-3xl">projects.</span>
            <div className="flex items-center gap-4">
                <ViewToggle />
            </div>
        </nav>
    );
}