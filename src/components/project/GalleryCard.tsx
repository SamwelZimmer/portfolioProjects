"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/types";
import { Card } from "../ui/card";
import Icon from "../common/Icon";

export interface GalleryCardProps {
  project: Project;
  details?: string;
}

export function GalleryCard({ project, details }: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [transformStyle, setTransformStyle] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();

      // Calculate mouse position relative to the card
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate percentage position
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      // Calculate transform values (adjust the multiplier to control the movement intensity)
      const xMove = ((xPercent - 50) / 50) * 5; // Moves between -5% to 5%
      const yMove = ((yPercent - 50) / 50) * 5; // Moves between -5% to 5%

      setTransformStyle(`translate(${xMove}%, ${yMove}%) scale(1.1)`);
    }
  };

  const handleMouseLeave = () => {
    // Reset the transform when the mouse leaves the card
    setTransformStyle("");
  };

  const handleClick = () => {
    router.push(project.id);
  };

  let brief =
    "I haven't written anything about this project yet. Don't hold your breath.";
  if (project?.summary) {
    brief = project.summary;
  }

  return (
    <Card
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="gallery-card relative border-2 border-border h-full aspect-[3/2] my-auto overflow-hidden cursor-pointer"
    >
      {!isLoaded && (
        <div className="absolute top-0 left-0 w-full h-full bg-muted z-50 flex items-center justify-center">
          <Icon
            name="spinner-2"
            className="animate-spin text-muted-foreground"
          />
        </div>
      )}

      {project.coverPhoto ? (
        <Image
          src={project.coverPhoto}
          alt="project cover photo"
          className="rounded-none"
          fill
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          style={{
            transform: transformStyle,
            transition: "transform 0.1s ease-out",
            willChange: "transform",
          }}
        />
      ) : (
        <img
          src="https://images.unsplash.com/photo-1679626951853-60e909d288ac"
          alt="Neon sign in woods"
          style={{
            transform: transformStyle,
            transition: "transform 0.1s ease-out",
            willChange: "transform",
          }}
        />
      )}
      <div className="absolute bottom-3 left-6 z-10 w-[calc(100%-48px)] text-text">
        {details !== "small" && (
          <span className="font-semibold">{project.title}</span>
        )}
        {details === "large" && (
          <p className="text-muted-foreground line-clamp-1">{brief}</p>
        )}
      </div>

      {details !== "small" && (
        <div
          className={`absolute flex flex-col bottom-0 left-0 w-full ${
            details === "large" ? "h-20" : "h-14"
          }`}
        >
          <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-card/70 to-card" />
        </div>
      )}
    </Card>
  );
}
