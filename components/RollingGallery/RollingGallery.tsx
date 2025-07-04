"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
  ResolvedValues,
} from "framer-motion";

const CERTIFICATION_IMAGES = [
  "/images/Moffice.png",
  "/images/Adobe.png",
  "/images/CISCO.png",
  "/images/ic3.png",
  "/images/PMI.png",
  "/images/apple-logo.png",
  "/images/AC.png",
  "/images/Fusion.png",
];

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = true,
  pauseOnHover = true,
  images = [],
}) => {
  const galleryImages = images.length > 0 ? images : CERTIFICATION_IMAGES;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 640 : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cylinderWidth: number = isScreenSizeSm ? 1100 : 1800;
  const faceCount: number = galleryImages.length;
  const faceWidth: number = (cylinderWidth / faceCount) * 1.5;
  const radius: number = cylinderWidth / (2 * Math.PI);

  const dragFactor: number = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val: number) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  }, [autoplay, controls, rotation]);

  const handleUpdate = (latest: ResolvedValues) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = (): void => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = (): void => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-gradient-to-b from-primary-dark/50 to-primary/50 rounded-2xl">
      {/* Left shadow overlay */}
      <div
        className="absolute top-0 left-0 h-full w-[120px] z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(6,0,16,1) 0%, rgba(6,0,16,0.8) 40%, rgba(6,0,16,0) 100%)",
        }}
      />
      {/* Right shadow overlay */}
      <div
        className="absolute top-0 right-0 h-full w-[120px] z-10"
        style={{
          background:
            "linear-gradient(to left, rgba(6,0,16,1) 0%, rgba(6,0,16,0.8) 40%, rgba(6,0,16,0) 100%)",
        }}
      />

      {/* Top shadow */}
      <div
        className="absolute top-0 left-0 right-0 h-[60px] z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,0,16,0.4) 0%, rgba(6,0,16,0) 100%)",
        }}
      />

      {/* Bottom shadow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60px] z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(6,0,16,0.4) 0%, rgba(6,0,16,0) 100%)",
        }}
      />

      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {galleryImages.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt={`Certification ${i + 1}`}
                className="pointer-events-none h-[120px] w-[200px] object-contain transition-all duration-300 ease-out group-hover:scale-110 group-hover:brightness-110 sm:h-[100px] sm:w-[180px] bg-white/5 backdrop-blur-sm rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
