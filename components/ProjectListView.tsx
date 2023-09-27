"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineInfoCircle } from "react-icons/ai";
import SearchBar from "./SearchBar";

export default function ProjectListView() {
    return (
        <>
            <section className="w-full h-full pt-4 overflow-y-scroll">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto w-full sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] px-4 pb-20 md:pb-28">
                    <ListCard />
                    <ListCard />
                    <ListCard />
                    <ListCard />                    
                    <ListCard />
                    <ListCard />
                    <ListCard />
                    <ListCard />
                    <ListCard />
                    <ListCard />
                    <ListCard />
                    <ListCard />
                </div>
            </section>
            <div className="absolute bottom-0 py-4 md:py-8 w-full ">
                <div className="mx-auto w-full sm:w-[400px] px-16">
                    <SearchBar />
                </div>
            </div>
        </>
    );
}

const ListCard = () => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="relative flex flex-col justify-between bg-white border h-32 rounded-md p-4 shadow-md">
            <div className="flex items-center justify-between">
                <span className="text-xl font-medium">project title</span>
                <span className="font-light opacity-50">date</span>
            </div>
            
            <div className="flex flex-col font-light pr-8">
                {
                    !showDetails 
                    ?
                    <p>project description Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, blanditiis.</p>
                    :
                    <>
                        <span>the skills required goes here</span>
                        <span>the tags go here</span>
                    </>
                }
            </div>

            <motion.button onClick={() => setShowDetails(!showDetails)} className="absolute right-0 bottom-0 p-4 rounded-md opacity-50 hover:opacity-30" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <AiOutlineInfoCircle size={20} />
            </motion.button>
        </div>
    );
}
