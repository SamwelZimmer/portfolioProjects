"use client";

import { motion } from "framer-motion";

import Icon from "@/components/common/Icon";
import { useAppContext } from "../providers/app-provider";

export default function ViewToggle() {
  const { isListView, setIsListView } = useAppContext();

  const toggleSwitch = () => setIsListView(!isListView);

  return (
    <div onClick={toggleSwitch} className="flex items-center gap-2.5">
      <Icon name="carousel-horizontal" />
      <div
        className="switch flex justify-start rounded-full p-1 w-12 sm:w-14 h-6 sm:h-7 bg-muted cursor-pointer border border-border"
        data-ison={isListView}
      >
        <motion.div
          className="bg-muted-foreground rounded-full h-full aspect-square"
          layout
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 40,
          }}
        />
      </div>
      <Icon name="list" size={18} />
    </div>
  );
}
