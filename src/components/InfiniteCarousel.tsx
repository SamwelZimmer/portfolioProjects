"use client";

import React, { useRef, useEffect } from "react";

import { GalleryCard } from "./project/GalleryCard";
import { Project } from "@/lib/types";

interface InfiniteCarouselProps {
  projects: Project[];
  speed: number;
  start?: number;
  height: number;
  details?: string;
}

export default function InfiniteCarousel({
  projects,
  speed,
  start = 0.5,
  height,
  details = "small",
}: InfiniteCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const initialTouchY = useRef<number>(0); // store initial touch position

  const handleTouchStart = (event: TouchEvent) => {
    initialTouchY.current = event.touches[0].clientY;
  };

  const handleWheel = (event: WheelEvent) => {
    if (!carouselRef.current) return;

    if (event.deltaY > 0) {
      // scrolling down, move carousel right
      carouselRef.current.scrollLeft += speed;
    } else {
      // scrolling up, move carousel left
      carouselRef.current.scrollLeft -= speed;
    }

    // check if at the end
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

    if (scrollLeft + clientWidth >= scrollWidth) {
      // reset scroll position when reaching the end
      carouselRef.current.scrollLeft = 0;
    } else if (scrollLeft <= 0) {
      // reset scroll position when reaching the start
      carouselRef.current.scrollLeft = scrollWidth - clientWidth;
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!carouselRef.current) return;

    const deltaY = initialTouchY.current - event.touches[0].clientY;
    if (deltaY > 0) {
      // swiping upwards
      carouselRef.current.scrollLeft += speed;
    } else {
      // swiping downwards
      carouselRef.current.scrollLeft -= speed;
    }

    // check if at the end
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

    if (scrollLeft + clientWidth >= scrollWidth) {
      // reset scroll position when reaching the end
      carouselRef.current.scrollLeft = 0;
    } else if (scrollLeft <= 0) {
      // reset scroll position when reaching the start
      carouselRef.current.scrollLeft = scrollWidth - clientWidth;
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const { clientWidth, scrollWidth } = carouselRef.current;

      // determine the initial scroll position
      const initialScroll = start * (scrollWidth - clientWidth);

      // set the initial scroll position
      carouselRef.current.scrollLeft = initialScroll;
    }

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    // <div ref={carouselRef} className='relative scrollable-but-hidden-scrollbar overflow-x-auto w-full h-full flex bg-slate-200 pt-3 pb-3 my-auto shadow-lg'>
    <div
      ref={carouselRef}
      style={{ height: `${height}%` }}
      className="relative scrollable-but-hidden-scrollbar overflow-x-auto w-full flex pb-6"
    >
      {projects.map((project, index) => (
        <div
          key={index}
          className="inline-block px-3 items-center justify-center h-full w-max"
        >
          <GalleryCard project={project} details={details} />
        </div>
      ))}
    </div>
  );
}
