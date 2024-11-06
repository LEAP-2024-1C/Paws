"use client";

import { useState, type FC, useRef } from "react";
import GridCarousel from "@/components/sos/grid_carousel";
import SideModal from "@/components/sos/SideModal";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function SOSPage() {
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const leftSectionRef = useRef(null);

  useGSAP(() => {
    // Animate the left section elements
    gsap.fromTo(
      ".left-section-content",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
      }
    );

    // Animate the dot
    gsap.fromTo(
      ".status-dot",
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen border-t border-gray-100 pt-2 rounded-t-xl shadow-2xl">
      {/* Left Section */}
      <div
        ref={leftSectionRef}
        className="w-full lg:w-1/2 p-6 lg:p-12 lg:border-r border-gray-100 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="w-full max-w-2xl">
          <h2 className="left-section-content text-2xl font-medium mb-8 text-gray-700 flex items-center gap-3 justify-center">
            <span className="status-dot h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            Live Reports
            <span className="text-sm font-normal text-gray-400 ml-2">
              (Real-time)
            </span>
          </h2>
          <div className="left-section-content bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <GridCarousel />
          </div>
          <div className="left-section-content mt-6 text-center">
            <p className="text-sm text-gray-500">
              Showing latest reports from your area
            </p>
          </div>
        </div>
      </div>
      {/* Right Section */}
      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-2xl flex flex-col items-center gap-14">
          <div className="text-center space-y-6 fade-in w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 px-4">
              Animal <span className="text-orange-500">SOS</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed px-4">
              Help protect our furry friends. Report any dangers to animals with
              just a few clicks.
            </p>
          </div>

          {!isReportSubmitted ? (
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-full max-w-md py-5 px-8 bg-orange-500 
                text-white rounded-lg shadow-sm hover:shadow-md transition-all 
                hover:bg-orange-600 font-medium text-lg
                fade-in mx-4"
            >
              Report Emergency
            </button>
          ) : (
            <div className="text-center bg-white p-10 rounded-lg shadow-sm fade-in w-full max-w-md mx-4">
              <div className="text-4xl mb-4 text-orange-500">✓</div>
              <h2 className="text-xl font-medium mb-2 text-gray-800">
                Thank you for your report
              </h2>
              <p className="text-gray-600 text-sm">
                Your submission has been received and will be reviewed shortly.
              </p>
            </div>
          )}

          <SideModal
            isShowing={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
