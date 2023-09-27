"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

import SearchBar from "./SearchBar";
import { Project } from "@/app/page";
import { convertTimestampToDate, monthNumberToString, concatenateStringToLength, stringToSlug, openInNewTab } from "../lib/helpers";
import { DefaultChip } from "./Chips";
import { DefaultSpinner } from "./Loaders";

interface ProjectListViewProps {
    projects: Project[];
}

export default function ProjectListView({ projects }: ProjectListViewProps) {
    return (
        <>
            <section className="w-full h-full pt-4 overflow-scroll">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mx-auto w-full sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] px-4 pb-20 md:pb-28">
                    {
                        projects.map((project, i) => {
                            return (
                                <ListCard key={i} project={project} />
                            );
                        })
                    }
                </div>


            </section>
            {/* <div className="absolute left-0 bottom-0 py-4 md:py-8 w-full ">
                <div className="mx-auto w-full sm:w-[400px] px-16">
                    <SearchBar />
                </div>
            </div> */}
        </>
    );
}

interface ListCardProps {
    project: Project;
};

const ListCard = ({ project }: ListCardProps) => {

    const [showDetails, setShowDetails] = useState(false);

    let dateObject;
    if (project?.datetime) {
        dateObject = convertTimestampToDate(project?.datetime);
    };

    const handleInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // stop event bubbling
        setShowDetails(!showDetails);
    };

    let brief = "";
    if (project?.summary) {
        brief = concatenateStringToLength(project.summary, 80) + "...";
    }
     
    return (
        <div className="relative h-40 cursor-pointer flex gap-4 overflow-hidden bg-white border rounded-md p-4 shadow-md">

            <Link href={`/${stringToSlug(project.id)}`} className="flex gap-4 w-full pr-8">

                <div className="flex flex-col w-full justify-between">
                    <div className="flex w-full items-center justify-between">
                        <span className="text-lg sm:text-xl font-medium">{project.title}</span>
                    </div>
                    
                    <div className="flex flex-col font-light w-full h-full justify-between items-stretch">
                        {
                            !showDetails 
                            ?
                            <div className="flex flex-col h-full justify-between">
                                <p className="text-sm md:text-base h-full">{brief}</p>
                                { dateObject && <span className="font-light opacity-50 text-sm">{concatenateStringToLength(monthNumberToString(dateObject.month), 3)} {dateObject.year}</span> }                            
                            </div>
                            :
                            <>
                                <span className="text-sm">the skills required goes here</span>
                                <div className="flex items-center w-max overflow-scroll">
                                    { project?.categories?.map((tag, index) => (
                                        <div key={index} className="">
                                            <DefaultChip text={tag} index={index} />
                                        </div>
                                    )) }
                                    
                                </div>
                            </>
                        }
                    </div>

                </div>
            </Link>
            
            {
                project.link &&

                <motion.button 
                    onClick={() => openInNewTab(project?.link ? project?.link : "")} 
                    className="absolute right-8 bottom-0 p-4 rounded-md opacity-50 hover:opacity-30" 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                >
                    <FiExternalLink size={20} />
                </motion.button>

            }

            <motion.button 
                onClick={handleInfoClick} 
                className="absolute right-0 bottom-0 p-4 rounded-md opacity-50 hover:opacity-30" 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
            >
                <AiOutlineInfoCircle size={20} />
            </motion.button>
        </div>

    );
}
