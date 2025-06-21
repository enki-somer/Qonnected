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
    <div className="marquee-container">
      <div className="fade-edge left"></div>
      <div className="fade-edge right"></div>
      <div className="marquee-track">
        <div className="marquee-content">
          {/* First set of icons */}
          <div className="marquee-item">
            {icons.map((icon, index) => (
              <div key={`first-${index}`} className="icon-wrapper">
                <Image
                  src={icon}
                  alt={`Icon ${index + 1}`}
                  width={iconSize}
                  height={iconSize}
                  className="marquee-icon"
                />
              </div>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="marquee-item">
            {icons.map((icon, index) => (
              <div key={`second-${index}`} className="icon-wrapper">
                <Image
                  src={icon}
                  alt={`Icon ${index + 1}`}
                  width={iconSize}
                  height={iconSize}
                  className="marquee-icon"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          background: linear-gradient(135deg, #1a2236 0%, #2a3447 100%);
          overflow: hidden;
          position: relative;
          padding: 20px 0;
          width: 100%;
        }

        .fade-edge {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          pointer-events: none;
          z-index: 2;
        }

        .fade-edge.left {
          left: 0;
          background: linear-gradient(to right, #1a2236 20%, transparent);
        }

        .fade-edge.right {
          right: 0;
          background: linear-gradient(to left, #1a2236 20%, transparent);
        }

        .marquee-track {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .marquee-content {
          display: flex;
          animation: scroll ${speed}s linear infinite;
          width: max-content;
        }

        .marquee-item {
          display: flex;
          align-items: center;
          gap: ${gap}px;
          padding-right: ${gap}px;
          flex-shrink: 0;
        }

        .icon-wrapper {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          background: rgba(255, 215, 0, 0.1);
          border-radius: 12px;
          border: 1px solid rgba(255, 215, 0, 0.3);
          transition: all 0.3s ease;
        }

        .icon-wrapper:hover {
          background: rgba(255, 215, 0, 0.2);
          border-color: #ffd700;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        }

        .marquee-icon {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          transition: transform 0.3s ease;
        }

        .icon-wrapper:hover .marquee-icon {
          transform: scale(1.1);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .marquee-container {
            padding: 15px 0;
          }

          .icon-wrapper {
            padding: 8px;
          }

          .fade-edge {
            width: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeComponent;
