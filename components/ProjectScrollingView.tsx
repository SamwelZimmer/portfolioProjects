import InfiniteCarousel from "./InfiniteCarousel";

import { project } from "../helpers/projects";

interface ScrollingViewProps {
    projects: project[];
}

export default function ProjectScrollingView({ projects }: ScrollingViewProps) {
    return (
        <>
            <div className='right-column fixed right-0 top-0 z-20 w-32 h-full'>
                <div className='right-grain w-32 h-full'></div>
            </div>

              <div className='left-gradient fixed left-0 top-0 z-20 w-32 h-full ' />

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
                <InfiniteCarousel cards={projects} speed={4} start={0.5} height={30} details={"medium"} />
                <InfiniteCarousel cards={projects} speed={-6} start={0.1} height={50} details={"large"} />
                <InfiniteCarousel cards={projects} speed={2} start={0.7} height={20} details={"small"} />
            </div>
        </>
    );
}