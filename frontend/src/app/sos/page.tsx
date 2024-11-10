"use client";

import { useState, useRef } from "react";
import GridCarousel from "@/components/sos/grid_carousel";
import SideModal from "@/components/sos/SideModal";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function SOSPage() {
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const leftSectionRef = useRef(null);

  const handleReportSubmit = () => {
    setIsModalOpen(false);
    setIsReportSubmitted(true);
  };

  useGSAP(() => {
    gsap.fromTo(
      ".left-section-content",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      }
    );

    gsap.fromTo(
      ".right-section-content",
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.3,
      }
    );
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen pt-12 bg-gray-50">
      {/* Left Section */}
      <div
        ref={leftSectionRef}
        className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col items-center bg-white shadow-lg rounded-3xl"
      >
        <div className="w-full max-w-2xl space-y-8">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
            <h2 className="left-section-content text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="status-dot h-4 w-4 rounded-full bg-orange-500 animate-pulse shadow-lg"></span>
              Recent Reports
            </h2>
            <div className="left-section-content px-4 py-2 bg-orange-100 rounded-full">
              <span className="text-sm font-semibold text-orange-600">
                Live Updates
              </span>
            </div>
          </div>

          <div className="left-section-content bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 p-6">
            <GridCarousel />
          </div>

          <div className="left-section-content flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl">
            <p className="text-sm font-medium text-gray-600">
              Showing latest reports from your area
            </p>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></span>
              <span className="text-sm font-semibold text-gray-700">
                Active Monitoring
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="w-full lg:w-1/2 p-8 lg:p-16 flex items-center justify-center 
      rounded-3xl
      bg-gradient-to-br from-orange-50 via-white to-gray-50"
      >
        <div className="w-full max-w-2xl flex flex-col items-center gap-12">
          <div className="text-center space-y-8 right-section-content w-full">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 tracking-tight">
              Animal{" "}
              <span className="text-orange-500 relative inline-block">
                SOS
                <span className="absolute -top-2 -right-2 h-3 w-3 bg-orange-500 rounded-full animate-ping"></span>
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
              Help protect our furry friends. Report any dangers to animals with
              just a few clicks.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center px-6 py-3 bg-white rounded-full shadow-md">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-medium text-gray-700">24/7 Support</span>
              </div>
              <div className="flex items-center px-6 py-3 bg-white rounded-full shadow-md">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                <span className="font-medium text-gray-700">
                  Quick Response
                </span>
              </div>
            </div>
          </div>

          {!isReportSubmitted ? (
            <div className="w-full max-w-md space-y-6 right-section-content">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-6 px-8 bg-orange-500 
                  text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all 
                  hover:bg-orange-600 font-semibold text-xl
                  relative overflow-hidden group"
              >
                <span className="relative z-10">Report Emergency</span>
                <div className="absolute inset-0 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
              <p className="text-center text-sm text-gray-500 font-medium">
                Your report will be handled with urgency and care
              </p>
            </div>
          ) : (
            <div className="text-center bg-white p-10 rounded-2xl shadow-xl right-section-content w-full max-w-md mx-4 border border-gray-100">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-3xl text-green-500">✓</span>
                </div>
              </div>
              <h2 className="text-2xl font-medium mb-3 text-gray-800">
                Thank you for your report
              </h2>
              <p className="text-gray-600">
                Your submission has been received and will be reviewed shortly.
              </p>
              <div className="mt-6 text-sm text-gray-500">
                Emergency response team will contact you if needed
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 w-full max-w-md right-section-content">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="font-semibold text-gray-800 text-lg mb-2">
                Response Time
              </div>
              <div className="text-base text-gray-600">Under 30 mins</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="font-semibold text-gray-800 text-lg mb-2">
                Active Teams
              </div>
              <div className="text-base text-gray-600">24/7 Available</div>
            </div>
          </div>
        </div>
      </div>

      <SideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}
