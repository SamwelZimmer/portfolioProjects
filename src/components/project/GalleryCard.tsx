"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project } from "@/app/page";
import { concatenateStringToLength } from "@/lib/helpers";

export interface GalleryCardProps {
  project: Project;
  details?: string;
}

export function GalleryCard({ project, details }: GalleryCardProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [seedValue, setSeedValue] = useState(0);
  let intervalRef = useRef<number | null>(null);

  const router = useRouter();

  const handleMouseEnter = () => {
    setShouldAnimate(true);

    setTimeout(() => {
      setShouldAnimate(false);
    }, 800);
  };

  const handleClick = () => {
    router.push(project.id);
  };

  useEffect(() => {
    if (shouldAnimate) {
      // if shouldAnimate is true, start an interval to update the seed value
      intervalRef.current = window.setInterval(() => {
        setSeedValue((prevSeed) => (prevSeed + 1) % 100);
      }, 10);
    } else {
      // if shouldAnimate is false, clear the interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    // clean up on component unmount
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [shouldAnimate]);

  let brief =
    "I haven't written anything about this project yet. Don't hold your breath.";
  if (project?.summary) {
    brief = concatenateStringToLength(project.summary, 60) + "...";
  }

  return (
    <>
      <svg style={{ display: "none" }} key={seedValue}>
        <defs>
          <filter id="noise">
            <feTurbulence
              baseFrequency="0.7,0.8"
              seed={seedValue}
              type="fractalNoise"
              result="static"
            ></feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="static" scale={20}>
              <animate
                attributeName="scale"
                values="0;40;0"
                dur="800ms"
                repeatCount="1"
                onAnimationStart={handleMouseEnter}
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <div
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        id="card"
        className="relative border-2 border-slate-200 rounded-md bg-slate-400 h-full aspect-[3/2] shadow-md box-border my-auto"
      >
        {project.coverPhoto ? (
          <Image
            src={project.coverPhoto}
            alt="project cover photo"
            width={1000}
            height={700}
          />
        ) : (
          <img
            src="https://images.unsplash.com/photo-1679626951853-60e909d288ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            alt="Neon sign in woods"
          />
        )}
        <div className="absolute bottom-3 left-6 z-10 text-white">
          {details != "small" && <span className="">{project.title}</span>}
          {details == "large" && (
            <p className="opacity-50 font-light">{brief}</p>
          )}
        </div>

        {details != "small" && (
          <div
            className={`absolute flex flex-col bottom-0 left-0 w-full ${
              details == "large" ? "h-28" : "h-16"
            }`}
          >
            <div className="w-full h-1/4 bg-gradient-to-t from-black/30 to-black/0" />
            <div className="w-full h-3/4 bg-gradient-to-t from-black to-black/30" />
          </div>
        )}
      </div>
    </>
  );
}
