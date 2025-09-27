"use client";

import { useState } from "react";
import { MdSettings, MdFullscreen, MdMenuOpen } from "react-icons/md";
import { CiMinimize1 } from "react-icons/ci";
import UserProfileModal from "../ui/UserProfileModal";

export default function Header({ title, onToggleSidebar, isSidebarCollapsed }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <>
      <header
        className="h-16 flex items-center  justify-between px-6 mx-6 my-2"
        style={{
          background: "linear-gradient(to right, #023002, #006400)",
          borderRadius: "1rem",
        }}
      >
        {/* Right - Fullscreen and Menu Icons */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={handleFullscreen}
            className="p-2 text-white hover:opacity-80 transition-opacity"
            title="Fullscreen"
          >
            <MdFullscreen className="w-5 h-5" />
          </button>

          <button
            onClick={onToggleSidebar}
            className="p-2 text-white hover:opacity-80 transition-opacity"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? (
              <MdMenuOpen className="w-5 h-5" />
            ) : (
              <CiMinimize1 className="w-5 h-5" />
            )}
          </button>
        </div>
        {/* Center - Page Title */}
        <h1 className="text-sm sm:text-xl font-semibold text-white text-center">
          {title}
        </h1>
        {/* Left - Settings Gear */}
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="p-2 text-white hover:opacity-80 transition-opacity"
        >
          <MdSettings className="w-6 h-6" />
        </button>
      </header>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}
