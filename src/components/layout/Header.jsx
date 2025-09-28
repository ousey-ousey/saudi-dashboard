"use client";

import { useState } from "react";
import { MdSettings, MdMenuOpen } from "react-icons/md";
import { CiMinimize1 } from "react-icons/ci";
import UserProfileModal from "../ui/UserProfileModal";

export default function Header({ title }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      <header
        className="h-16 flex items-center  justify-between px-6 mx-6 my-2"
        style={{
          background: "linear-gradient(to right, #023002, #006400)",
          borderRadius: "1rem",
        }}
      >
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
