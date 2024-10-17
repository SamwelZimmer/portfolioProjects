"use client";

import { useState, useEffect, useRef, useMemo } from "react";

import { similarProjects, getProject } from "@/lib/firebase";
import { Project } from "@/lib/types";
import ListCard from "@/components/project/ListCard";
import { useContainerWidth } from "@/hooks/use-media-query";

interface SimilarProjectsProps {
  docId?: string;
}

export default function SimilarProjects({ docId }: SimilarProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerRef, containerWidth] = useContainerWidth();

  const [isLoading, setIsLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState<Project[]>([]);
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await similarProjects(docId);

        const projectDetailsPromises = data.map(async (proj) => {
          return getProject(proj.id);
        });

        const projectsData = (await Promise.all(projectDetailsPromises))
          .filter((proj): proj is Project => proj !== null)
          .map((proj) => proj as Project);

        setProjectDetails(projectsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [docId]);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowGradient(scrollRef.current.scrollLeft > 0);
    }
  };

  const cardWidth = useMemo(() => {
    if (containerWidth < 448) return containerWidth - 32;

    return 384;
  }, [containerWidth]);

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollable-but-hidden-scrollbar w-[calc(100%-5px)] pr-2 flex items-start overflow-scroll"
      >
        {showGradient && (
          <div
            className={`absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-background to-transparent z-10`}
          />
        )}

        <div
          className={`absolute right-[5px] top-0 w-4 h-full bg-gradient-to-l from-background to-transparent z-10 bg-green-50/50=`}
        />

        {projectDetails.map((project, i) => (
          <ListCard
            key={i}
            project={project}
            className="mr-2 last:mr-0 min-h-[84px]"
            style={{ width: cardWidth, minWidth: cardWidth }}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}
