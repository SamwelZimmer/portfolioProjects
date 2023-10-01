import InfiniteCarousel from "./InfiniteCarousel";

import { Project } from "@/app/page";
import { repeatArrayToLength } from "../lib/helpers";

interface ScrollingViewProps {
    projects: Project[];
}

export default function ProjectGalleryView({ projects }: ScrollingViewProps) {

    const extendedProjects = repeatArrayToLength(projects, 50);

    return (
        <>
            {/* <div className='right-column fixed right-0 top-0 z-20 w-32 h-full'>
                <div className='right-grain w-32 h-full'></div>
            </div>

            <div className='left-gradient fixed left-0 top-0 z-20 w-32 h-full ' /> */}

                {/* <div className='right-column fixed right-0 top-0 z-20 w-32 h-full'>
                    <div className='bg-image w-full h-full absolute' />
                    <div className='right-gradient w-full h-full absolute' />
                </div> */}
                            {/* <div className='relative w-full h-full'>
                        <InfiniteCarousel cards={carouselItems1} speed={4} start={0.5} />

                        <div className='absolute w-32 top-[92%] z-20 overflow-y-clip'>
                        <RotatingGear GearComponent={Gear1} rotationSpeed={0.2} />
                        </div>
                    </div> */}
                    {

            }
            <div className="h-full w-full pt-4">
                <InfiniteCarousel projects={extendedProjects} speed={8} start={0.5} height={30} details={"medium"} />
                <InfiniteCarousel projects={extendedProjects} speed={-12} start={0.1} height={50} details={"large"} />
                <InfiniteCarousel projects={extendedProjects} speed={4} start={0.7} height={20} details={"small"} />
            </div>
        </>
    );
}