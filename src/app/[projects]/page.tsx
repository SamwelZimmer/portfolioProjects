"use client";

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ProjectPage() {

    const pathname = usePathname();

    return (
        <>{pathname}</>
    );
};