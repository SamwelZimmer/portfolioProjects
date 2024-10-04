"use client";

import ProjectListView from "./ProjectListView";
import ProjectGalleryView from "./ProjectGalleryView";
import { Project } from "@/lib/types";
import { useAppContext } from "@/components/providers/app-provider";

interface ViewChooserProps {
  projects: Project[];
}

export default function ViewChooser({ projects }: ViewChooserProps) {
  const { isListView } = useAppContext();

  return (
    <>
      {isListView ? (
        <ProjectListView projects={projects} />
      ) : (
        <ProjectGalleryView projects={projects} />
      )}
    </>
  );
}
