"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import StatusIndicator from "@/components/StatusIndicator";
import {
  convertTimestampToDate,
  monthNumberToString,
  concatenateStringToLength,
  stringToSlug,
  openInNewTab,
} from "@/lib/helpers";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Icon from "@/components/common/Icon";
import { Project } from "@/lib/types";
import CategoryChips from "@/components/CategoryChips";
import { cn } from "@/lib/utils";

interface ListCardProps {
  project: Project;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
}

export default function ListCard({
  project,
  className,
  style,
  loading = false,
}: ListCardProps) {
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

  if (loading) {
    return (
      <Card
        className={cn(
          `w-full px-4 py-3 rounded-lg flex flex-col bg-card cursor-pointer animate-out animate-pulse`,
          className
        )}
        style={style}
      ></Card>
    );
  }

  return (
    <Link
      href={`/${stringToSlug(project.id)}`}
      style={style}
      className={className}
    >
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
                    <CategoryChips
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
          <div className="flex gap-2 items-center mt-1">
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
              className={`mt-0.5 ${
                showDetails && "rotate-90"
              } transition-transform duration-300`}
            />
          </button>
        </div>
      </Card>
    </Link>
  );
}
