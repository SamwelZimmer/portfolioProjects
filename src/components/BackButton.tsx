import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function BackButton() {
    const router = useRouter();

    return (
        <nav className="z-50 bottom-0 left-0 fixed flex flex-row font-sans justify-end items-center my-6 px-8 gap-4">
            <motion.button onClick={() => router.back()} className="h-10 bg-slate-200 text-black flex justify-center items-center aspect-square shadow-xl border rounded-full" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
                <AiOutlineArrowLeft size={24} />
            </motion.button>
        </nav>
    );
}