"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Project } from "@/app/page";
import StatusIndicator from "@/components/StatusIndicator";
import {
  convertTimestampToDate,
  monthNumberToString,
  concatenateStringToLength,
  stringToSlug,
  openInNewTab,
} from "@/lib/helpers";
import { CategoryChip } from "@/components/common/Chips";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Icon from "@/components/common/Icon";

interface ListCardProps {
  project: Project;
}

export default function ListCard({ project }: ListCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleShowDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };

  const handleOpenDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    openInNewTab(project.link ?? "");
  };

  let dateObject;
  if (project?.datetime) {
    dateObject = convertTimestampToDate(project?.datetime);
  }

  return (
    <Link href={`/${stringToSlug(project.id)}`}>
      <Card
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`w-full px-4 py-3 rounded-lg flex flex-col hover:bg-muted cursor-pointer`}
      >
        <div className="flex justify-between">
          <span className="font-semibold">{project.title}</span>

          {project.link && (
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground hover:text-primary">
                <div onClick={handleOpenDemo}>
                  <Icon name="arrow-direct" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <span>View demo</span>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <div className="overflow-hidden">
          <AnimatePresence initial={false}>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 1, marginTop: 8 }}
                animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
              >
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">
                    {project.summary}
                  </p>

                  {project.categories && (
                    <Categories
                      categories={project.categories}
                      hovering={hovering}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between pt-1.5">
          <div className="flex gap-2 items-center">
            {project.status && <StatusIndicator status={project.status} />}

            {dateObject && (
              <span className="text-sm text-muted-foreground">
                {concatenateStringToLength(
                  monthNumberToString(dateObject.month),
                  3
                )}
                {". "}
                {dateObject.year}
              </span>
            )}
          </div>

          <button
            onClick={handleShowDetails}
            className="flex items-center gap-0.5 text-muted-foreground hover:text-primary pt-1.5"
          >
            <span className="text-xs">Details</span>
            <Icon
              name="chevron"
              className={`${
                showDetails && "rotate-90"
              } transition-all duration-300`}
            />
          </button>
        </div>
      </Card>
    </Link>
  );
}

const Categories = ({
  categories,
  hovering,
}: {
  categories: string[];
  hovering: boolean;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showGradient, setShowGradient] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowGradient(scrollRef.current.scrollLeft > 0);
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollable-but-hidden-scrollbar w-[calc(100%-5px)] flex items-center overflow-scroll"
      >
        {showGradient && (
          <div
            className={`absolute left-0 top-0 w-4 h-full bg-gradient-to-r ${
              hovering ? "from-muted" : "from-card"
            } to-transparent z-10`}
          />
        )}
        <div
          className={`absolute right-[5px] top-0 w-4 h-full bg-gradient-to-l ${
            hovering ? "from-muted" : "from-card"
          } to-transparent z-10`}
        />

        {categories.map((tag, index) => (
          <div key={index}>
            <CategoryChip
              text={tag}
              index={index}
              className={`${
                hovering
                  ? "bg-input hover:bg-muted border-secondary-muted"
                  : "bg-muted hover:bg-input"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
