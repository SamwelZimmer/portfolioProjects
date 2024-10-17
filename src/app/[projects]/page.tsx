"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";
import { getProject } from "@/lib/firebase";
import BackButton from "@/components/BackButton";
import SimilarProjects from "@/components/SimilarProjects";
import {
  convertTimestampToDate,
  concatenateStringToLength,
  monthNumberToString,
  openInNewTab,
} from "@/lib/helpers";
import { DefaultSpinner, ImagePlaceholder } from "@/components/Loaders";
import StatusIndicator from "@/components/StatusIndicator";
import CategoryChips from "@/components/CategoryChips";
import { Project } from "@/lib/types";
import Icon from "@/components/common/Icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function ProjectPage() {
  const [content, setContent] = useState<Project | null>(null);
  const [isSticky, setIsSticky] = useState(false); // State to track if the title is sticky

  const titleRef = useRef<HTMLHeadingElement | null>(null); // Create a ref for the title
  const sentinelRef = useRef<HTMLDivElement | null>(null); // Create a ref for the title

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting); // Update state based on intersection
      },
      { threshold: 1.0 } // Trigger when the title is fully visible
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current); // Observe the title element
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current); // Clean up observer
      }
    };
  }, [sentinelRef]);

  const pathname = usePathname();

  useEffect(() => {
    const fetchProject = async () => {
      const contentData = await getProject(pathname);
      setContent(contentData);
    };

    fetchProject();
  }, []);

  let dateObject;
  if (content?.datetime) {
    dateObject = convertTimestampToDate(content?.datetime);
  }

  return (
    <>
      <BackButton className="fixed z-10 bottom-4 left-4" />

      <main className="py-8 sm:py-24 px-4 sm:px-0 w-full sm:w-[400px] md:w-[600px] mx-auto flex flex-col">
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-muted-foreground font-light">
            {concatenateStringToLength(
              monthNumberToString(
                dateObject ? dateObject.month : new Date().getMonth() + 1
              ),
              3
            )}
            {". "}
            {dateObject ? dateObject.year : new Date().getFullYear()}
          </span>

          {content?.link && (
            <ExternalLink link={content.link} isFixed={isSticky} />
          )}
        </div>

        <div ref={sentinelRef} />

        <div className="pt-5 sm:pt-8 flex flex-col z-10 sticky top-0 bg-background">
          <div className="relative">
            <h1
              ref={titleRef}
              className={`${
                !content?.title && "opacity-50"
              } font-serif font-semibold text-3xl sm:text-4xl md:text-5xl text-foreground pb-2 ${
                isSticky ? "border-b" : ""
              }`}
            >
              {content ? content.title : "Lorem ipsum dolor"}
            </h1>

            {isSticky && (
              <div className="absolute top-full left-0 w-full h-4 bg-gradient-to-b from-background to-transparent" />
            )}
          </div>
        </div>

        <p
          className={`text-muted-foreground mb-8 ${
            !content?.summary && "opacity-50"
          }`}
        >
          {content
            ? content.summary
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis enim quisquam magni"}
        </p>

        <CoverImage imageUrl={content?.coverPhoto} />

        <div className="my-auto flex gap-2 mt-4">
          <StatusIndicator
            status={content && content.status ? content.status : "ongoing"}
          />
          <span className="text-sm text-muted-foreground font-light capitalize">
            {content && content.status ? content.status : "ongoing"}
          </span>
        </div>

        {content && (
          <ReactMarkdown className="markdown mt-4">
            {content.body}
          </ReactMarkdown>
        )}

        <div className="flex flex-col gap-1 mt-12">
          <span className="text-sm text-muted-foreground">
            Project categories
          </span>

          {content?.categories && (
            <CategoryChips categories={content.categories} />
          )}
        </div>

        <div className="flex flex-col gap-1 mt-12">
          <span className="text-sm text-muted-foreground">
            Check out some similar projects...
          </span>

          <div className="scrollable-but-hidden-scrollbar overflow-scroll">
            <SimilarProjects docId={content?.id} />
          </div>
        </div>
      </main>
    </>
  );
}

const CoverImage = ({ imageUrl }: { imageUrl?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full border border-border rounded-lg bg-card shadow-inner aspect-video overflow-hidden">
      {!isLoaded && (
        <div className="absolute top-0 left-0 w-full h-full bg-muted z-50 flex items-center justify-center">
          <Icon
            name="spinner-2"
            className="animate-spin text-muted-foreground"
          />
        </div>
      )}

      {imageUrl && (
        <Image
          src={imageUrl}
          alt="project cover photo"
          className="rounded-none"
          fill
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};

function ExternalLink({
  link,
  isFixed,
  className,
}: {
  link: string;
  isFixed?: boolean;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        className={`${
          isFixed && "fixed top-4 right-4 z-20"
        } text-muted-foreground hover:text-primary hover:underline text-sm font-light`}
      >
        {isFixed ? (
          <Button
            variant="secondary"
            onClick={() => openInNewTab(link)}
            className={cn(
              " text-muted-foreground hover:text-accent-foreground p-0 aspect-square border border-border rounded-2xl rounded-tr-sm",
              className
            )}
          >
            <TooltipTrigger className="w-full h-full flex items-center justify-center">
              <Icon name="arrow-direct" className="text-inherit mb-px pl-px" />
            </TooltipTrigger>
          </Button>
        ) : (
          <div
            onClick={() => openInNewTab(link)}
            className="flex items-center gap-1.5"
          >
            <span>Visit</span>
            <Icon name="arrow-direct" />
          </div>
        )}
      </TooltipTrigger>
      <TooltipContent>
        <span>View demo</span>
      </TooltipContent>
    </Tooltip>
  );
}
