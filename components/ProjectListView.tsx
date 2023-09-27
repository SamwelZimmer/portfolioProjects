"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AiOutlineInfoCircle } from "react-icons/ai";
import SearchBar from "./SearchBar";
import { Project } from "@/app/page";
import { convertTimestampToDate, monthNumberToString, concatenateStringToLength, stringToSlug } from "../lib/helpers";

interface ProjectListViewProps {
    projects: Project[];
}

export default function ProjectListView({ projects }: ProjectListViewProps) {
    return (
        <>
            <section className="w-full h-full pt-4 overflow-y-scroll">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto w-full sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] px-4 pb-20 md:pb-28">
                    {
                        projects.map((project, i) => {
                            return (
                                <ListCard key={i} project={project} />
                            );
                        })
                    }
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

interface ListCardProps {
    project: Project;
};

const ListCard = ({ project }: ListCardProps) => {

    const [showDetails, setShowDetails] = useState(false);

    let dateObject;

    if (project?.datetime) {
        dateObject = convertTimestampToDate(project?.datetime);
    };
    
    return (
        <Link href={`/${stringToSlug(project.id)}`} className="relative cursor-pointer flex flex-col justify-between bg-white border h-32 rounded-md p-4 shadow-md">
            <div className="flex items-center justify-between">
                <span className="text-xl font-medium">{project.title}</span>
                { dateObject && <span className="font-light opacity-50">{concatenateStringToLength(monthNumberToString(dateObject.month), 3)} {dateObject.year}</span> }
                
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
        </Link>
    );
}
