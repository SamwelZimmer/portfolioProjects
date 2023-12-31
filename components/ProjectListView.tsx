"use client";

import { Project } from "@/app/page";
import { ListCard } from "./ProjectCards";

interface ProjectListViewProps {
    projects: Project[];
}

export default function ProjectListView({ projects }: ProjectListViewProps) {
    return (
        <>
            <section className="w-full h-full pt-4 overflow-scroll pb-48">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mx-auto w-full sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px] px-4 pb-20 md:pb-28">
                    {
                        projects.map((project, i) => {
                            return (
                                <div key={i} className="h-40">
                                    <ListCard project={project} />
                                </div>
                            );
                        })
                    }
                </div>
            </section>
        </>
    );
};