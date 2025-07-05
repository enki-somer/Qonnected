"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
  ResolvedValues,
} from "framer-motion";

// Define image dimensions for optimization
const IMAGE_DIMENSIONS = {
  width: 88,
  height: 88,
};

// Optimized certification images with proper dimensions
const CERTIFICATION_IMAGES = [
  {
    src: "/images/optimized/moffice.webp",
    alt: "Microsoft Office Certification",
    width: 176,
    height: 176,
  },
  {
    src: "/images/optimized/adobe.webp",
    alt: "Adobe Certification",
    width: 176,
    height: 176,
  },
  {
    src: "/images/optimized/cisco.webp",
    alt: "Cisco Certification",
    width: 176,
    height: 176,
  },
  {
    src: "/images/optimized/ic3.webp",
    alt: "IC3 Certification",
    width: 176,
    height: 176,
  },
  {
    src: "/images/optimized/pmi.webp",
    alt: "PMI Certification",
    width: 176,
    height: 176,
  },
  {
    src: "/images/optimized/fusion.webp",
    alt: "Fusion Certification",
    width: 176,
    height: 176,
  },
  {
    src: "/images/optimized/apple.webp",
    alt: "Apple Certification",
    width: 312,
    height: 176,
  },
  {
    src: "/images/optimized/ac.webp",
    alt: "AutoCAD Certification",
    width: 176,
    height: 176,
  },
];

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = true,
  pauseOnHover = true,
  images = [],
}) => {
  const galleryImages = images.length > 0 ? images : CERTIFICATION_IMAGES;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsScreenSizeSm(window.innerWidth <= 640);

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

  // Show loading state during SSR and until mounted
  if (!mounted) {
    return (
      <div className="relative h-[300px] w-full overflow-hidden bg-gradient-to-b from-primary-dark/50 to-primary/50 rounded-2xl">
        <div className="flex h-full items-center justify-center">
          <div className="animate-pulse text-white/60">Loading...</div>
        </div>
      </div>
    );
  }

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
          {galleryImages.map((image, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <div className="relative h-[120px] w-[200px] sm:h-[100px] sm:w-[180px] bg-white/5 backdrop-blur-sm rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out group-hover:scale-110 group-hover:brightness-110">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 180px, 200px"
                  className="pointer-events-none object-contain p-2"
                  priority={i < 4}
                  quality={95}
                  loading="eager"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
