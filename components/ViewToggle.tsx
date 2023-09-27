"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PiSlideshow, PiListBulletsLight } from "react-icons/pi";
import { useRecoilState } from "recoil";

import { listViewAtom } from "../atoms/listViewAtom";

export default function ViewToggle() {

    const [listView, setListView] = useRecoilState(listViewAtom);

    const toggleSwitch = () => setListView(!listView);

    return (
        <div onClick={toggleSwitch} className="flex items-center gap-4">
            <PiSlideshow size={24} />
            <div className="switch flex justify-start rounded-full p-1 w-16 h-8 bg-black/5 cursor-pointer border border-black/20" data-isOn={listView}>
                <motion.div className="bg-black/70 rounded-full h-full aspect-square"  layout transition={spring} />
            </div>
            <PiListBulletsLight size={24} />
        </div>
    );
};

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};