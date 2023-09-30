"use client";

import { useState, useEffect } from "react";

import { similarProjects, getProject } from "../lib/firebase";
import { ListCard } from "./ProjectCards";
import { Project } from "@/app/page";

interface SimilarProjectsProps {
    docId: string;
}

interface SimilarProject {
    id: string;
    similarity: number;
}
  
export default function SimilarProjects({ docId }: SimilarProjectsProps) {
const [projects, setProjects] = useState<SimilarProject[]>([]);
const [projectDetails, setProjectDetails] = useState<Project[]>([]);

useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await similarProjects(docId);
        setProjects(data);
  
        const projectDetailsPromises = data.map(async (proj) => {
          return getProject(proj.id);
        });
  
        const projectsData = (await Promise.all(projectDetailsPromises))
          .filter((proj): proj is Project => proj !== null)
          .map(proj => proj as Project);
        
        setProjectDetails(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjects();
  }, [docId]);
  

return (
    <>
        <div className="flex gap-4 w-max py-2">
            {projectDetails.map((project, i) => (
                <div key={i} className="h-48 w-full sm:h-40 sm:w-[22rem] md:w-96">
                    <ListCard project={project} />
                </div>
            ))}
        </div>
    </>
);
}
  
