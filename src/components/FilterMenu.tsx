"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { FilterChip, AppliedFiltersChip } from "@/components/common/Chips";
import { useAppContext } from "@/components/providers/app-provider";
import Icon from "./common/Icon";

export default function FilterMenu() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { activeCategories, setActiveCategories } = useAppContext();

  useEffect(() => {
    const timerId = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timerId); // clear the timeout if the component unmounts
  }, []);

  const variants = {
    enter: { opacity: 1, y: "0%" },
    exit: { opacity: 1, y: "100%" },
  };

  const handleClose = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-sm`}
        />
      )}

      <motion.div
        animate={isVisible ? "enter" : "exit"}
        variants={variants}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 40,
        }}
        className={`fixed ${
          isVisible ? "flex" : "hidden"
        } flex-col bottom-0 left-0 w-full pointer-events-none`}
      >
        <motion.div
          animate={open ? "enter" : "exit"}
          variants={variants}
          className="bg-popover border-t pointer-events-auto"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 40,
          }}
        >
          <div
            onClick={handleClose}
            className="absolute -top-[32px] left-1/2 -translate-x-1/2 text-text text-sm border border-b-popover bg-popover w-32 rounded-t-lg flex justify-center gap-2 items-center text-gray-400 pb-1 pt-1.5 cursor-pointer"
          >
            <div className="relative h-full">
              <span>Filter</span>

              <Icon
                name="chevron"
                className={`absolute top-px -right-full -mr-1 text-muted-foreground transition-all duration-300 ${
                  open && "rotate-90"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col px-4 xl:px-0 py-4 sm:py-8 gap-4 w-full max-w-5xl mx-auto">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                Project type
              </span>
              <ChipScroll>
                {categories.projectTypes.map((tag, index) => (
                  <div key={index} className="w-max">
                    <FilterChip text={tag} index={index} />
                  </div>
                ))}
              </ChipScroll>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                Technologies
              </span>
              <ChipScroll>
                {categories.technologies.map((tag, index) => (
                  <div key={index} className="w-max">
                    <FilterChip text={tag} index={index} />
                  </div>
                ))}
              </ChipScroll>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Purpose</span>
              <ChipScroll>
                {categories.purposes.map((tag, index) => (
                  <div key={index} className="w-max">
                    <FilterChip text={tag} index={index} />
                  </div>
                ))}
              </ChipScroll>
            </div>

            <hr className="w-full border-border mb-2 mt-2.5" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center w-full justify-between">
                <span className="text-sm text-muted-foreground">
                  Applied filters
                </span>

                {activeCategories.length > 0 && (
                  <button
                    onClick={() => setActiveCategories([])}
                    className="text-sm underline text-muted-foreground"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <ChipScroll>
                {activeCategories.length === 0 ? (
                  <div className="text-muted-foreground font-light text-sm">
                    {"("}no filters applied{")"}
                  </div>
                ) : (
                  activeCategories.map((tag, index) => (
                    <div key={index} className="w-max">
                      <AppliedFiltersChip text={tag} index={index} />
                    </div>
                  ))
                )}
              </ChipScroll>
            </div>
          </div>
          <div className="absolute top-full w-full bg-popover h-32" />
        </motion.div>
      </motion.div>
    </>
  );
}

const ChipScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showGradient, setShowGradient] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowGradient(scrollRef.current.scrollLeft > 0);
    }
  };

  return (
    <div className="relative h-[26px]">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollable-but-hidden-scrollbar w-[calc(100%-5px)] flex items-center overflow-scroll"
      >
        {showGradient && (
          <div
            className={`absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-popover to-transparent z-10`}
          />
        )}
        <div
          className={`absolute right-[5px] top-0 w-4 h-full bg-gradient-to-l from-popover to-transparent z-10`}
        />
        {children}
      </div>
    </div>
  );
};

const categories = {
  projectTypes: [
    "data science",
    "visualisation",
    "analytics",
    "data engineering",
    "software development",
    "game",
    "web",
    "frontend",
    "full-stack",
  ],
  purposes: ["university", "competition", "tutorial", "venture"],
  technologies: [
    "python",
    "cloud",
    "MERN",
    "vector database",
    "AI",
    "machine learning",
    "3D",
    "blockchain",
  ],
};
