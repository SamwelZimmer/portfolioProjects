"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { Project } from "@/app/page";
import StatusIndicator from "./StatusIndicator";
import { convertTimestampToDate, monthNumberToString, concatenateStringToLength, stringToSlug, openInNewTab } from "../lib/helpers";
import { CategoryChip } from "./Chips";

interface ListCardProps {
    project: Project;
};

export const ListCard = ({ project }: ListCardProps) => {

    const [showDetails, setShowDetails] = useState(false);

    const router = useRouter();

    let dateObject;
    if (project?.datetime) {
        dateObject = convertTimestampToDate(project?.datetime);
    };

    const handleInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // stop event bubbling
        setShowDetails(!showDetails);
    };

    let brief = "I haven't written anything about this project yet. Don't hold your breath.";
    if (project?.summary) {
        brief = concatenateStringToLength(project.summary, 80) + "...";
    }
     
    return (
        <div className="relative h-full cursor-pointer flex gap-4 overflow-hidden bg-white border rounded-md p-4 shadow-md">

            <div onClick={() => router.push(`/${stringToSlug(project.id)}`)} className="flex gap-4 w-full">

                <div className="flex flex-col w-full justify-between">
                    <div className="flex w-full items-center justify-between">
                        <span className="text-lg sm:text-xl font-medium mr-8">{project.title}</span>
                    </div>
                    
                    <div className="flex flex-col font-light w-full h-full justify-between items-stretch">
                        {
                            !showDetails 
                            ?
                            <div className="flex flex-col h-full justify-between">
                                <p className="text-sm md:text-base h-full">{brief}</p>
                                { dateObject && <span className="font-light opacity-50 text-sm">{(concatenateStringToLength(monthNumberToString(dateObject.month), 3)).toLowerCase()} {dateObject.year}</span> }                            
                            </div>
                            :
                            <>
                                { project?.status && <div className="my-auto flex gap-2"><span className="opacity-50 font-light">status:</span><StatusIndicator status={project?.status} /></div> }
                                <div className="scrollable-but-hidden-scrollbar flex items-center overflow-scroll mr-8">
                                    { project?.categories?.map((tag, index) => (
                                        <div key={index} className="">
                                            <CategoryChip text={tag} index={index} />
                                        </div>
                                    )) }
                                    
                                </div>
                            </>
                        }
                    </div>

                </div>
            </div>
            
            {
                project.link &&

                <motion.button 
                    onClick={() => openInNewTab(project?.link ? project?.link : "")} 
                    className="absolute right-0 top-0 p-4 rounded-md opacity-50 hover:opacity-30" 
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

export interface GalleryCardProps {
    project: Project;
    details?: string;
}

export function GalleryCard({ project, details }: GalleryCardProps) {

    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [seedValue, setSeedValue] = useState(0);
    let intervalRef = useRef<number | null>(null);

    const router = useRouter();

    const handleMouseEnter = () => {
        setShouldAnimate(true);
        
        setTimeout(() => {
            setShouldAnimate(false);
        }, 800);
    };

    const handleClick = () => {
        router.push(project.id);
    };

    useEffect(() => {
        if (shouldAnimate) {
            // if shouldAnimate is true, start an interval to update the seed value
            intervalRef.current = window.setInterval(() => {
                setSeedValue(prevSeed => (prevSeed + 1) % 100); 
            }, 10); 
        } else {
            // if shouldAnimate is false, clear the interval
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        // clean up on component unmount
        return () => {
            if (intervalRef.current !== null) {
                window.clearInterval(intervalRef.current);
            }
        };
    }, [shouldAnimate]);

    let brief = "I haven't written anything about this project yet. Don't hold your breath.";
    if (project?.summary) {
        brief = concatenateStringToLength(project.summary, 60) + "...";
    }

    return (
        <>
        
        <svg style={{ display: "none" }} key={seedValue}>
            <defs>
                <filter id="noise">
                <feTurbulence
                    baseFrequency="0.7,0.8"
                    seed={seedValue}
                    type="fractalNoise"
                    result="static"
                >
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="static" scale={20}>
                    <animate
                        attributeName="scale"
                        values="0;40;0"
                        dur="800ms"
                        repeatCount="1" 
                        onAnimationStart={handleMouseEnter}                              
                    />
                </feDisplacementMap>
                </filter>  
            </defs>
            </svg>

            <div onClick={handleClick} onMouseEnter={handleMouseEnter} id="card" className="relative border-2 border-slate-200 rounded-md bg-slate-400 h-full aspect-[3/2] shadow-md box-border my-auto">
  
                {
                    project.coverPhoto ? 
                    <Image src={project.coverPhoto} alt="project cover photo" width={1000} height={700} />
                    :
                    <img 
                        src="https://images.unsplash.com/photo-1679626951853-60e909d288ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" 
                        alt="Neon sign in woods" 
                    />     
                }     
                <div className="absolute bottom-3 left-6 z-10 text-white">
                    { details != "small" && <span className="">{project.title}</span>}
                    { details == "large" && <p className="opacity-50 font-light">{brief}</p>}
                </div>
                
                {
                    details != "small" &&

                    <div className={`absolute flex flex-col bottom-0 left-0 w-full ${details == "large" ? "h-28" : "h-16"}`}>
                        <div className="w-full h-1/4 bg-gradient-to-t from-black/30 to-black/0" />
                        <div className="w-full h-3/4 bg-gradient-to-t from-black to-black/30" />
                    </div>
                }

            </div>
        </>

    );
};