"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  animate,
} from "framer-motion";

// Preload images for faster initial render
const preloadImages = (images: Array<{ src: string }>) => {
  images.forEach((image) => {
    const img = new window.Image();
    img.src = image.src;
  });
};

// Define image dimensions for optimization
const IMAGE_DIMENSIONS = {
  width: 88,
  height: 88,
};

// Optimized certification images with proper dimensions
const CERTIFICATION_IMAGES = [
  {
    src: "/images/optimized/mic.webp",
    alt: "Microsoft Office Certification",
    width: 176,
    height: 176,
  },
  {
    src: "/images/optimized/ad.webp",
    alt: "autodesk Certification",
    width: 176,
    height: 176,
  },
  {
    src: "/images/optimized/pearson.webp",
    alt: "pearson Certification",
    width: 176,
    height: 176,
  },
  {
    src: "/images/optimized/adobe.webp",
    alt: "adobe Certification",
    width: 176,
    height: 176,
  },
  {
    src: "/images/optimized/cert.webp",
    alt: "certiport Certification",
    width: 176,
    height: 176,
  },

  {
    src: "/images/optimized/apple.webp",
    alt: "Apple Certification",
    width: 312,
    height: 176,
  },
];

interface RollingGalleryProps {
  images?: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
}

const RollingGallery: React.FC<RollingGalleryProps> = ({ images = [] }) => {
  const galleryImages = images.length > 0 ? images : CERTIFICATION_IMAGES;
  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(false);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    // Start preloading images immediately
    preloadImages(galleryImages);

    // Initialize screen size
    setIsScreenSizeSm(window.innerWidth <= 640);

    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);

    // Start continuous animation
    const animation = animate(rotateY, [0, -360], {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      animation?.stop();
    };
  }, [rotateY]);

  const cylinderWidth: number = isScreenSizeSm ? 1100 : 1800;
  const faceCount: number = galleryImages.length;
  const faceWidth: number = (cylinderWidth / faceCount) * 1.5;
  const radius: number = cylinderWidth / (2 * Math.PI);

  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-gradient-to-b from-primary-dark/50 to-primary/50 rounded-2xl pointer-events-none">
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

      <div className="flex h-full items-center justify-center [perspective:1000px]">
        <motion.div
          style={{
            width: cylinderWidth,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] items-center justify-center [transform-style:preserve-3d]"
        >
          {galleryImages.map((image, i) => (
            <div
              key={i}
              className="absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <div className="relative h-[120px] w-[200px] sm:h-[100px] sm:w-[180px] bg-white/5 backdrop-blur-sm rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 180px, 200px"
                  className="pointer-events-none object-contain p-2"
                  priority={i < 4}
                  quality={95}
                  loading={i < 4 ? "eager" : "lazy"}
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
