import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";

export default function HomeButton() {
    const router = useRouter();

    return (
        <Link href={"/"} className="z-50 bottom-0 right-0 fixed flex flex-row font-sans justify-end items-center my-6 px-8 gap-4">
            <motion.button className="h-10 bg-white text-black flex justify-center items-center aspect-square shadow-xl border border-slate-200 rounded-full" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                <AiOutlineHome size={24} />
            </motion.button>
        </Link>
    );
}