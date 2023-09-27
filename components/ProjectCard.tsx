"use client";

import { useState, useRef, useEffect } from "react";

export interface ProjectCardProps {
    image?: string;
    title?: string;
    brief?: string;
    description?: string;
    tags?: string;
    details?: string;
}

export default function ProjectCard({ image, title, brief, description, tags, details }: ProjectCardProps) {

    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [seedValue, setSeedValue] = useState(0);
    let intervalRef = useRef<number | null>(null);

    const handleMouseEnter = () => {
        setShouldAnimate(true);
        
        setTimeout(() => {
            setShouldAnimate(false);
        }, 800);
    };

    useEffect(() => {
        if (shouldAnimate) {
            // if shouldAnimate is true, start an interval to update the seed value
            intervalRef.current = window.setInterval(() => {
                setSeedValue(prevSeed => (prevSeed + 1) % 100); 
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
    }, [shouldAnimate])

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
                >
                </feTurbulence>
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

            <div onMouseEnter={handleMouseEnter} id="card" className="relative border rounded-md bg-slate-400 h-full aspect-[3/2] shadow-md box-border border-green-400 my-auto">
                <img 
                src="https://images.unsplash.com/photo-1679626951853-60e909d288ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" 
                alt="Neon sign in woods" 
                />            
                <div className="absolute top-3 left-6">
                    { details != "small" && <span className="text-2xl font-medium">{title}</span>}
                    { details == "large" && <p className="opacity-50">{details}</p>}
                </div>
            </div>
        </>

    );
};