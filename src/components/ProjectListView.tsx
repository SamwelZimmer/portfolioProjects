"use client";

import { Project } from "@/lib/types";
import ListCard from "@/components/project/ListCard";

interface ProjectListViewProps {
  projects: Project[];
}

export default function ProjectListView({ projects }: ProjectListViewProps) {
  return (
    <>
      <section className="w-full h-full pt-4 overflow-scroll pb-48">
        <div className="grid grid-cols-1 gap-2 mx-auto w-full max-w-md pb-20 md:pb-28 px-4 sm:px-0">
          {projects.map((project, i) => {
            return <ListCard key={i} project={project} />;
          })}
        </div>
      </section>
    </>
  );
}
