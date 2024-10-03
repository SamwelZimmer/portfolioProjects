import InfiniteCarousel from "./InfiniteCarousel";

import { Project } from "@/app/page";
import { repeatArrayToLength } from "@/lib/helpers";

interface ScrollingViewProps {
  projects: Project[];
}

export default function ProjectGalleryView({ projects }: ScrollingViewProps) {
  const extendedProjects = repeatArrayToLength(projects, 50);

  return (
    <div className="h-full w-full pt-4">
      <InfiniteCarousel
        projects={extendedProjects}
        speed={8}
        start={0.5}
        height={30}
        details={"medium"}
      />
      <InfiniteCarousel
        projects={extendedProjects}
        speed={-12}
        start={0.1}
        height={50}
        details={"large"}
      />
      <InfiniteCarousel
        projects={extendedProjects}
        speed={4}
        start={0.7}
        height={20}
        details={"small"}
      />
    </div>
  );
}
