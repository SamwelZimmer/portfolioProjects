"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

import { projectCategoriesAtom } from "../atoms/projectCategoriesAtom";
import { FilterChip, AppliedFiltersChip } from "./Chips";

export default function FilterMenu() {

    const [open, setOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [projectCategories, setProjectCategories] = useRecoilState(projectCategoriesAtom);

    useEffect(() => {
        const timerId = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timerId); // clear the timeout if the component unmounts
    }, []);

    const variants = {
        enter: { opacity: 1, y: "0%" },
        exit: { opacity: 1, y: "100%" },
    };

    const handleClose = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    return (
        <motion.div 
            animate={isVisible ? "enter" : "exit"}
            variants={variants}             
            className={`fixed ${isVisible ? "flex" : "hidden"} flex-col bottom-0 left-0 w-full pointer-events-none`}
        >

            <motion.div
                animate={open ? "enter" : "exit"}
                variants={variants}  
                className="bg-white border-t pointer-events-auto" 
                onMouseEnter={() => setOpen(true)}  
                onMouseLeave={() => setOpen(false)}       
            >
                <div onClick={handleClose} className='absolute -top-10 left-1/2 -translate-x-1/2 border border-b-white bg-white w-32 rounded-t-lg flex justify-center items-center p-2 text-gray-400 font-light cursor-pointer'>
                    filter
                </div>

                <div className="flex flex-col p-4 gap-4">

                    <div className='flex flex-col'>
                        <span className="font-light opacity-50">project type:</span>
                        <div className="flex flex-row overflow-scroll w-full scrollable-but-hidden-scrollbar">
                            { categories.projectTypes.map((tag, index) => (
                                <div key={index} className="w-max">
                                    <FilterChip text={tag} index={index} />
                                </div>
                            )) }
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <span className="font-light opacity-50">technologies:</span>
                        <div className="flex flex-row overflow-scroll w-full scrollable-but-hidden-scrollbar">
                            { categories.technologies.map((tag, index) => (
                                <div key={index} className="w-max">
                                    <FilterChip text={tag} index={index} />
                                </div>
                            )) }
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <span className="font-light opacity-50">purpose:</span>
                        <div className="flex flex-row overflow-scroll w-full scrollable-but-hidden-scrollbar">
                            { categories.purposes.map((tag, index) => (
                                <div key={index} className="w-max">
                                    <FilterChip text={tag} index={index} />
                                </div>
                            )) }
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <span className="font-light opacity-50">applied filters:</span>
                        <div className="flex flex-row overflow-scroll w-full scrollable-but-hidden-scrollbar">
                            { projectCategories.length === 0 ? <div className="opacity-30 font-light text-sm py-1">{"("}no filters applied{")"}</div> :
                                projectCategories.map((tag, index) => (
                                <div key={index} className="w-max">
                                    <AppliedFiltersChip text={tag} index={index} />
                                </div>
                            )) }
                        </div>
                    </div>
                </div>
                <div className='absolute top-full w-full bg-white h-32' />
            </motion.div>
        </motion.div>
    );
};

const categories = {
    "projectTypes": ["data science", "visualisation", "analytics", "data engineering", "software development", "game", "web", "frontend", "full-stack"],
    "purposes": ["university", "competition", "tutorial", "venture"],
    "technologies": ["python", "cloud", "MERN", "vector database", "AI", "machine learning", "3D", "blockchain"],
};