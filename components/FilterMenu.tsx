"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FilterMenu() {

    const [open, setOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timerId = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timerId); // Clear the timeout if the component unmounts
    }, []);

    const variants = {
        enter: { opacity: 1, y: "0%" },
        exit: { opacity: 1, y: "100%" },
    };

    return (
        <motion.div 
            animate={isVisible ? "enter" : "exit"}
            variants={variants}             
            className={`fixed ${isVisible ? "flex" : "hidden"} flex-col bottom-0 left-0 w-full z-50`}
        >

            <motion.div
                animate={open ? "enter" : "exit"}
                variants={variants}  
                className="bg-white border-t" 
                onMouseEnter={() => setOpen(true)}  
                onMouseLeave={() => setOpen(false)}       
            >
                <div  onClick={() => setOpen(!open)} className='absolute -top-10 left-1/2 -translate-x-1/2 border border-b-white bg-white w-32 rounded-t-lg flex justify-center items-center p-2 text-gray-400 font-light cursor-pointer'>
                    filter
                </div>

                <div className='flex flex-col p-4'>
                    <span>a bunch of tags and stuff go here</span>
                    <span>some congent eith go</span>
                    <span>some congent eith go</span>
                </div>
            </motion.div>



        </motion.div>
    );
};