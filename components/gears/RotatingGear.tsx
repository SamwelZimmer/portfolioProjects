"use client";

import React, { useEffect, useState, useRef } from 'react';

interface RotatingGearProps {
    GearComponent: React.FC;
    rotationSpeed: number;
}

const RotatingGear: React.FC<RotatingGearProps> = ({ GearComponent, rotationSpeed }) => {
    const [rotation, setRotation] = useState(0);
    const initialTouchY = useRef<number | null>(null);

    const handleWheel = (event: WheelEvent) => {
        setRotation(prevRotation => prevRotation + (event.deltaY * rotationSpeed));
    };

    const handleTouchStart = (event: TouchEvent) => {
        initialTouchY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
        if (initialTouchY.current !== null) {
            const deltaY = event.touches[0].clientY - initialTouchY.current;
            setRotation(prevRotation => prevRotation - (deltaY * rotationSpeed));
            initialTouchY.current = event.touches[0].clientY; // update the initial touch point
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', handleWheel);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div style={{ transform: `rotate(${rotation}deg)` }}>
            <GearComponent />
        </div>
    );
};

export default RotatingGear;
