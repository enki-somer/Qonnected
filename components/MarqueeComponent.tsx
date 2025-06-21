"use client";

import React from "react";
import Image from "next/image";

const MarqueeComponent = ({
  icons = [
    "/images/Microsoft 360.PNG",
    "/images/Photoshop.PNG",
    "/images/Adobe.PNG",
    "/images/Autocad.PNG",
    "/images/swift.png",
    "/images/swift.png",
  ],
  speed = 30,
  iconSize = 60,
  gap = 40,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-[#1a2236] to-[#2a3447] overflow-hidden whitespace-nowrap py-5">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1a2236] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1a2236] to-transparent z-10" />

      <div className="flex animate-marquee">
        {/* First set of icons */}
        <div className="flex items-center" style={{ gap: `${gap}px` }}>
          {icons.map((icon, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 flex items-center justify-center p-2.5 bg-[rgba(255,215,0,0.1)] rounded-xl border border-[rgba(255,215,0,0.3)] transition-all duration-300 hover:bg-[rgba(255,215,0,0.2)] hover:border-[#ffd700] hover:transform hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(255,215,0,0.3)]"
            >
              <Image
                src={icon}
                alt={`Icon ${index + 1}`}
                width={iconSize}
                height={iconSize}
                className="filter drop-shadow-md transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex items-center" style={{ gap: `${gap}px` }}>
          {icons.map((icon, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 flex items-center justify-center p-2.5 bg-[rgba(255,215,0,0.1)] rounded-xl border border-[rgba(255,215,0,0.3)] transition-all duration-300 hover:bg-[rgba(255,215,0,0.2)] hover:border-[#ffd700] hover:transform hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(255,215,0,0.3)]"
            >
              <Image
                src={icon}
                alt={`Icon ${index + 1}`}
                width={iconSize}
                height={iconSize}
                className="filter drop-shadow-md transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeComponent;
