"use client";

import { useAuth } from "../../contexts/AuthContext";
import { MdPerson, MdLock, MdLogout } from "react-icons/md";

export default function UserProfileModal({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70"
        style={{ background: "blur(5px)", zIndex: 99999998 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed top-16 left-10  rounded-2xl shadow-xl min-w-[300px]"
        style={{ zIndex: 99999999 }}
      >
        {/* Header */}
        <div
          className="p-4 rounded-t-3xl bg-gradient-to-r from-green-500 to-green-700 text-white"
          style={{}}
        >
          <div className="flex items-center justify-between ">
            <div className="flex items-center space-x-3 space-x-reverse ">
              <div
                className="w-8 h-8  rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: "var(--color-brand-800)" }}
              >
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {user?.name || "User"}
                </h3>
                <p className="text-sm opacity-90">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-800  transition-opacity border-1 rounded-full p-1 cursor-pointer "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2 bg-dark rounded-b-3xl">
          <button className="w-full flex items-center px-4 py-3 text-right hover:bg-gray-400 transition-colors">
            <MdPerson className="w-5 h-5 ml-3 text-gray-100" />
            <span className="text-gray-100">بياناتي</span>
          </button>

          <button className="w-full flex items-center px-4 py-3 text-right hover:bg-gray-400 transition-colors">
            <MdLock className="w-5 h-5 ml-3 text-gray-100" />
            <span className="text-gray-100">تغيير كلمة المرور</span>
          </button>

          <hr className="my-2" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-right hover:bg-red-50 transition-colors text-red-400"
          >
            <MdLogout className="w-5 h-5 ml-3" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </>
  );
}
