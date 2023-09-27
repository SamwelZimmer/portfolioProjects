"use client";

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from "react-icons/fi";

import { getProject } from '../../../lib/firebase';
import BackButton from '../../../components/BackButton';
import { Project } from '../page';
import { convertTimestampToDate, concatenateStringToLength, monthNumberToString, openInNewTab } from '../../../lib/helpers';
import { DefaultSpinner } from '../../../components/Loaders';

export default function ProjectPage() {
    const [content, setContent] = useState<Project | null>(null);

    const pathname = usePathname();

    useEffect(() => {
        const fetchTool = async () => {
          const contentData = await getProject(pathname);
          setContent(contentData);
        };
    
        fetchTool();
    }, []);

    let dateObject;
    if (content?.datetime) {
        dateObject = convertTimestampToDate(content?.datetime);
    };

    return (
        
        <>
            <BackButton />


                {
                    !content ? 
                    
                    <div className='h-screen w-screen flex justify-center items-center'>
                        <div className='w-32'>
                            <DefaultSpinner />
                        </div>
                    </div>

                    :
                
                    <main className='py-24 px-8 sm:px-0 w-full sm:w-[400px] md:w-[600px] mx-auto flex flex-col gap-12'>

                        <div className='w-full flex flex-col gap-4'>
                            <h1 className='font-medium text-4xl'>{content?.title}</h1>
                            <p>{content?.summary}</p>
                        </div>

                        <div className='w-full flex justify-between items-center'>
                            { dateObject && <span className="font-light opacity-50 w-max">{concatenateStringToLength(monthNumberToString(dateObject.month), 3)} {dateObject.year}</span> }  
                            { content?.link && <motion.button onClick={() => openInNewTab(content?.link ? content.link : "")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='opacity-50 hover:opacity-20'><FiExternalLink size={24} /></motion.button> }                          
                        </div>
                    </main>

                }

        </>

    );
};