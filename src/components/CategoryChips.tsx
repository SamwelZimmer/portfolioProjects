"use client";

import { useRef, useState } from "react";

import { FilterChip } from "@/components/common/Chips";

export default function CategoryChips({
  categories,
  hovering = false,
}: {
  categories: string[];
  hovering?: boolean;
}) {
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
            <FilterChip
              text={tag}
              index={index}
              className={`${
                hovering
                  ? "bg-card hover:bg-card/40 border-secondary-muted"
                  : "bg-muted hover:bg-input"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
