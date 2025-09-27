"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MdSettings,
  MdHome,
  MdAssignment,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdAddCircleOutline,
  MdWarning,
  MdCalendarToday,
  MdEmail,
  MdStar,
  MdScale,
} from "react-icons/md";

export default function Sidebar({ isCollapsed = true }) {
  const router = useRouter();

  const [expandedMenus, setExpandedMenus] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar-expanded-menus");
      return saved
        ? JSON.parse(saved)
        : {
            dashboards: false,
            projects: false,
            letters: false,
            quality: false,
            budget: false,
          };
    }
    return {
      dashboards: false,
      projects: false,
      letters: false,
      quality: false,
      budget: false,
    };
  });

  const [activeMenu, setActiveMenu] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-active-menu") || "";
    }
    return "";
  });

  const [focusedItem, setFocusedItem] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-focused-item") || "";
    }
    return "";
  });

  // Handle auto-expansion when sidebar state changes
  useEffect(() => {
    if (typeof window !== "undefined" && !isCollapsed) {
      const savedActiveMenu = localStorage.getItem("sidebar-active-menu");

      if (savedActiveMenu) {
        // Auto-expand the parent menu if it's a sub-item
        if (
          savedActiveMenu === "dashboard" ||
          savedActiveMenu === "analytics"
        ) {
          setExpandedMenus((prev) => ({ ...prev, dashboards: true }));
        } else if (
          savedActiveMenu === "projects-log" ||
          savedActiveMenu === "risks-log"
        ) {
          setExpandedMenus((prev) => ({ ...prev, projects: true }));
        } else if (
          savedActiveMenu === "incoming-letters" ||
          savedActiveMenu === "outgoing-letters"
        ) {
          setExpandedMenus((prev) => ({ ...prev, letters: true }));
        } else if (
          savedActiveMenu === "quality-control" ||
          savedActiveMenu === "quality-reports"
        ) {
          setExpandedMenus((prev) => ({ ...prev, quality: true }));
        } else if (
          savedActiveMenu === "budget-planning" ||
          savedActiveMenu === "budget-tracking"
        ) {
          setExpandedMenus((prev) => ({ ...prev, budget: true }));
        }
      }
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "sidebar-expanded-menus",
        JSON.stringify(expandedMenus)
      );
    }
  }, [expandedMenus]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-active-menu", activeMenu);
    }
  }, [activeMenu]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-focused-item", focusedItem);
    }
  }, [focusedItem]);

  const toggleMenu = (menuName) => {
    // Only toggle submenu expansion, don't change sidebar collapsed state
    setExpandedMenus((prev) => {
      const newState = {
        dashboards: false,
        projects: false,
        letters: false,
        quality: false,
        budget: false,
        [menuName]: !prev[menuName],
      };
      return newState;
    });
    setActiveMenu(menuName);
    setFocusedItem(menuName);
  };

  const handleNavClick = (menuName, path) => {
    // Clear all focus states first
    setFocusedItem("");

    // Set the new active menu
    setActiveMenu(menuName);

    // Navigate to the path
    if (path) {
      router.push(path);
    }
  };

  const handleFocus = (itemName) => {
    // Only set focus if no item is currently active
    if (!activeMenu) {
      setFocusedItem(itemName);
    }
  };

  const handleBlur = () => {
    // Clear focus when blurring
    setFocusedItem("");
  };

  return (
    <aside
      className={`relative min-h-[100vh] transition-all duration-300 z-[1000] flex flex-col ${
        isCollapsed ? "w-20" : "w-70"
      }`}
      style={{
        position: "relative",
        minHeight: "100vh",
        
        background: `
          radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.404) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.322) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(22, 163, 74, 0.1) 0%, transparent 50%),
          #0f172a
        `,
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center p-6 border-b border-gray-700 relative">
        {isCollapsed ? (
          <div className="flex flex-col items-center space-y-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={60}
              height={60}
              className=""
            />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={200}
              height={200}
              className=""
            />
          </div>
        )}
      </div>

      {/* Navigation List */}
      <ul
        className="list-none p-4 m-0 pt-6 space-y-3 flex-1 overflow-y-auto"
        dir="rtl"
      >
        {/* لوحات البيانات */}
        <li>
          {isCollapsed ? (
            <div
              className={`group relative flex items-center justify-center p-3 text-white cursor-pointer transition-all duration-200 rounded-xl ${
                focusedItem === "dashboards"
                  ? "bg-[var(--color-dark)] text-white"
                  : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
              }`}
              onFocus={() => handleFocus("dashboards")}
              onBlur={handleBlur}
              tabIndex={0}
              onClick={(e) => {
                // Don't toggle if clicking on tooltip
                if (e.target.closest('[data-tooltip="true"]')) {
                  return;
                }
                toggleMenu("dashboards");
              }}
            >
              <MdSettings className="w-5 h-5" />
              <div
                className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[999999] mr-2 shadow-lg"
                data-tooltip="true"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col space-y-1">
                  <Link
                    href="/dashboard"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("dashboard", "/dashboard");
                    }}
                    className="flex items-center text-sm hover:text-primary-300 my-2"
                  >
                    <MdHome className="w-4 h-4 ml-1" />
                    <span>الرئيسية</span>
                  </Link>
                  <Link
                    href="/analytics"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("analytics", "/analytics");
                    }}
                    className="flex items-center text-sm hover:text-primary-300 my-2"
                  >
                    <MdAssignment className="w-4 h-4 ml-1" />
                    <span>التحليلات</span>
                  </Link>
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={() => toggleMenu("dashboards")}
                className={`flex items-center justify-between p-3 text-white cursor-pointer transition-all duration-200 rounded-xl ${
                  activeMenu === "dashboards" || focusedItem === "dashboards"
                    ? "bg-[var(--color-dark)] text-white"
                    : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
                }`}
                onFocus={() => handleFocus("dashboards")}
                onBlur={handleBlur}
                tabIndex={0}
              >
                <div className="flex items-center">
                  <MdSettings className="w-5 h-5 ml-3" />
                  <span className="font-medium">لوحات البيانات</span>
                </div>
                {expandedMenus.dashboards ? (
                  <MdKeyboardArrowUp className="w-4 h-4 ml-4" />
                ) : (
                  <MdKeyboardArrowDown className="w-4 h-4 ml-4" />
                )}
              </div>
              <ul
                className={`list-none p-0 m-0 bg-primary-50 overflow-hidden transition-all duration-300 ${
                  expandedMenus.dashboards ? "max-h-48" : "max-h-0"
                }`}
              >
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => handleNavClick("dashboard", "/dashboard")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-300 text-sm transition-all duration-200 rounded-xl hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white my-2"
                  >
                    <MdHome className="w-4 h-4 ml-2" />
                    <span>الرئيسية</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/analytics"
                    onClick={() => handleNavClick("analytics", "/analytics")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-300 text-sm transition-all duration-200 rounded-xl hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white my-2"
                  >
                    <MdAssignment className="w-4 h-4 ml-2" />
                    <span>التحليلات</span>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </li>

        {/* تقديم طلب جديد */}
        <li>
          {isCollapsed ? (
            <div
              className={`group relative flex items-center justify-center p-3 text-white cursor-pointer transition-all duration-200 rounded-xl ${
                focusedItem === "new-request"
                  ? "bg-[var(--color-dark)] text-white"
                  : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
              }`}
              onFocus={() => handleFocus("new-request")}
              onBlur={handleBlur}
              tabIndex={0}
            >
              <MdAddCircleOutline className="w-5 h-5" />
              <div
                className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[999999] mr-2 shadow-lg"
                data-tooltip="true"
                onClick={(e) => e.stopPropagation()}
              >
                تقديم طلب جديد
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
              </div>
            </div>
          ) : (
            <Link
              href="/new-request"
              onClick={() => handleNavClick("new-request", "/new-request")}
              className={`flex items-center p-3 text-white transition-all duration-200 rounded-xl my-2 ${
                activeMenu === "new-request" || focusedItem === "new-request"
                  ? "bg-[var(--color-dark)] text-white"
                  : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
              }`}
              onFocus={() => handleFocus("new-request")}
              onBlur={handleBlur}
              tabIndex={0}
            >
              <MdAddCircleOutline className="w-5 h-5 ml-3" />
              <span className="font-medium">تقديم طلب جديد</span>
            </Link>
          )}
        </li>

        {/* السجلات */}
        <li>
          {isCollapsed ? (
            <div
              className={`group relative flex items-center justify-center p-3 text-white cursor-pointer transition-all duration-200 rounded-xl ${
                focusedItem === "projects"
                  ? "bg-[var(--color-dark)] text-white"
                  : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
              }`}
              onFocus={() => handleFocus("projects")}
              onBlur={handleBlur}
              tabIndex={0}
              onClick={(e) => {
                // Don't toggle if clicking on tooltip
                if (e.target.closest('[data-tooltip="true"]')) {
                  return;
                }
                toggleMenu("projects");
              }}
            >
              <MdAssignment className="w-5 h-5" />
              <div
                className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[999999] mr-2 shadow-lg"
                data-tooltip="true"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col space-y-1">
                  <Link
                    href="/projects-log"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("projects-log", "/projects-log");
                    }}
                    className="flex items-center text-sm hover:text-primary-300 my-2"
                  >
                    <MdAssignment className="w-4 h-4 ml-1" />
                    <span>سجل المشاريع</span>
                  </Link>
                  <Link
                    href="/risks-log"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("risks-log", "/risks-log");
                    }}
                    className="flex items-center text-sm hover:text-primary-300 my-2"
                  >
                    <MdWarning className="w-4 h-4 ml-1" />
                    <span>سجل المخاطر</span>
                  </Link>
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={() => toggleMenu("projects")}
                className={`flex items-center justify-between p-3 text-white cursor-pointer transition-all duration-200 rounded-xl ${
                  activeMenu === "projects" || focusedItem === "projects"
                    ? "bg-[var(--color-dark)] text-white"
                    : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
                }`}
                onFocus={() => handleFocus("projects")}
                onBlur={handleBlur}
                tabIndex={0}
              >
                <div className="flex items-center">
                  <MdAssignment className="w-5 h-5 ml-3" />
                  <span className="font-medium">السجلات</span>
                </div>
                {expandedMenus.projects ? (
                  <MdKeyboardArrowUp className="w-4 h-4 ml-4" />
                ) : (
                  <MdKeyboardArrowDown className="w-4 h-4 ml-4" />
                )}
              </div>
              <ul
                className={`list-none p-0 m-0 bg-primary-50 overflow-hidden transition-all duration-300 ${
                  expandedMenus.projects ? "max-h-48" : "max-h-0"
                }`}
              >
                <li>
                  <Link
                    href="/projects-log"
                    onClick={() =>
                      handleNavClick("projects-log", "/projects-log")
                    }
                    className="flex items-center py-2 px-6 pr-12 text-gray-300 text-sm transition-all duration-200 rounded-xl hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white my-2"
                  >
                    <MdAssignment className="w-4 h-4 ml-2" />
                    <span>سجل المشاريع</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/risks-log"
                    onClick={() => handleNavClick("risks-log", "/risks-log")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-300 text-sm transition-all duration-200 rounded-xl hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white my-2"
                  >
                    <MdWarning className="w-4 h-4 ml-2" />
                    <span>سجل المخاطر</span>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </li>

        {/* الجداول الزمنية */}
        <li>
          {isCollapsed ? (
            <div
              className={`group relative flex items-center justify-center p-3 text-white cursor-pointer transition-all duration-200 rounded-xl ${
                focusedItem === "schedules"
                  ? "bg-[var(--color-dark)] text-white"
                  : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
              }`}
              onFocus={() => handleFocus("schedules")}
              onBlur={handleBlur}
              tabIndex={0}
            >
              <MdCalendarToday className="w-5 h-5" />
              <div
                className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[999999] mr-2 shadow-lg"
                data-tooltip="true"
                onClick={(e) => e.stopPropagation()}
              >
                الجداول الزمنية
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
              </div>
            </div>
          ) : (
            <Link
              href="/schedules"
              onClick={() => handleNavClick("schedules", "/schedules")}
              className={`flex items-center p-3 text-white transition-all duration-200 rounded-xl my-2 ${
                activeMenu === "schedules" || focusedItem === "schedules"
                  ? "bg-[var(--color-dark)] text-white"
                  : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
              }`}
              onFocus={() => handleFocus("schedules")}
              onBlur={handleBlur}
              tabIndex={0}
            >
              <MdCalendarToday className="w-5 h-5 ml-3" />
              <span className="font-medium">الجداول الزمنية</span>
            </Link>
          )}
        </li>

        {/* الخطابات والمراسلات */}
        <li>
          {isCollapsed ? (
            <div
              className={`group relative flex items-center justify-center p-3 text-white cursor-pointer transition-all duration-200 rounded-xl ${
                focusedItem === "letters"
                  ? "bg-[var(--color-dark)] text-white"
                  : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
              }`}
              onFocus={() => handleFocus("letters")}
              onBlur={handleBlur}
              tabIndex={0}
              onClick={(e) => {
                // Don't toggle if clicking on tooltip
                if (e.target.closest('[data-tooltip="true"]')) {
                  return;
                }
                toggleMenu("letters");
              }}
            >
              <MdEmail className="w-5 h-5" />
              <div
                className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[999999] mr-2 shadow-lg"
                data-tooltip="true"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col space-y-1">
                  <Link
                    href="/incoming-letters"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("incoming-letters", "/incoming-letters");
                    }}
                    className="flex items-center text-sm hover:text-primary-300 my-2"
                  >
                    <MdEmail className="w-4 h-4 ml-1" />
                    <span>الخطابات الواردة</span>
                  </Link>
                  <Link
                    href="/outgoing-letters"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("outgoing-letters", "/outgoing-letters");
                    }}
                    className="flex items-center text-sm hover:text-primary-300 my-2"
                  >
                    <MdEmail className="w-4 h-4 ml-1" />
                    <span>الخطابات الصادرة</span>
                  </Link>
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={() => toggleMenu("letters")}
                className={`flex items-center justify-between p-3 text-white cursor-pointer transition-all duration-200 rounded-xl ${
                  activeMenu === "letters" || focusedItem === "letters"
                    ? "bg-[var(--color-dark)] text-white"
                    : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
                }`}
                onFocus={() => handleFocus("letters")}
                onBlur={handleBlur}
                tabIndex={0}
              >
                <div className="flex items-center">
                  <MdEmail className="w-5 h-5 ml-3" />
                  <span className="font-medium">الخطابات والمراسلات</span>
                </div>
                {expandedMenus.letters ? (
                  <MdKeyboardArrowUp className="w-4 h-4 ml-4" />
                ) : (
                  <MdKeyboardArrowDown className="w-4 h-4 ml-4" />
                )}
              </div>
              <ul
                className={`list-none p-0 m-0 bg-primary-50 overflow-hidden transition-all duration-300 ${
                  expandedMenus.letters ? "max-h-48" : "max-h-0"
                }`}
              >
                <li>
                  <Link
                    href="/incoming-letters"
                    onClick={() =>
                      handleNavClick("incoming-letters", "/incoming-letters")
                    }
                    className="flex items-center py-2 px-6 pr-12 text-gray-300 text-sm transition-all duration-200 rounded-xl hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white my-2"
                  >
                    <MdEmail className="w-4 h-4 ml-2" />
                    <span>الخطابات الواردة</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/outgoing-letters"
                    onClick={() =>
                      handleNavClick("outgoing-letters", "/outgoing-letters")
                    }
                    className="flex items-center py-2 px-6 pr-12 text-gray-300 text-sm transition-all duration-200 rounded-xl hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white my-2"
                  >
                    <MdEmail className="w-4 h-4 ml-2" />
                    <span>الخطابات الصادرة</span>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </li>

        {/* الجودة */}
        <li>
          {isCollapsed ? (
            <div
              className={`group relative flex items-center justify-center p-3 text-white cursor-pointer transition-all duration-200 rounded-xl ${
                focusedItem === "quality"
                  ? "bg-[var(--color-dark)] text-white"
                  : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
              }`}
              onFocus={() => handleFocus("quality")}
              onBlur={handleBlur}
              tabIndex={0}
              onClick={(e) => {
                // Don't toggle if clicking on tooltip
                if (e.target.closest('[data-tooltip="true"]')) {
                  return;
                }
                toggleMenu("quality");
              }}
            >
              <MdStar className="w-5 h-5" />
              <div
                className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[999999] mr-2 shadow-lg"
                data-tooltip="true"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col space-y-1">
                  <Link
                    href="/quality-control"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("quality-control", "/quality-control");
                    }}
                    className="flex items-center text-sm hover:text-primary-300 my-2"
                  >
                    <MdStar className="w-4 h-4 ml-1" />
                    <span>مراقبة الجودة</span>
                  </Link>
                  <Link
                    href="/quality-reports"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("quality-reports", "/quality-reports");
                    }}
                    className="flex items-center text-sm hover:text-primary-300 my-2"
                  >
                    <MdAssignment className="w-4 h-4 ml-1" />
                    <span>تقارير الجودة</span>
                  </Link>
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={() => toggleMenu("quality")}
                className={`flex items-center justify-between p-3 text-white cursor-pointer transition-all duration-200 rounded-xl ${
                  activeMenu === "quality" || focusedItem === "quality"
                    ? "bg-[var(--color-dark)] text-white"
                    : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
                }`}
                onFocus={() => handleFocus("quality")}
                onBlur={handleBlur}
                tabIndex={0}
              >
                <div className="flex items-center">
                  <MdStar className="w-5 h-5 ml-3" />
                  <span className="font-medium">الجودة</span>
                </div>
                {expandedMenus.quality ? (
                  <MdKeyboardArrowUp className="w-4 h-4 ml-4" />
                ) : (
                  <MdKeyboardArrowDown className="w-4 h-4 ml-4" />
                )}
              </div>
              <ul
                className={`list-none p-0 m-0 bg-primary-50 overflow-hidden transition-all duration-300 ${
                  expandedMenus.quality ? "max-h-48" : "max-h-0"
                }`}
              >
                <li>
                  <Link
                    href="/quality-control"
                    onClick={() =>
                      handleNavClick("quality-control", "/quality-control")
                    }
                    className="flex items-center py-2 px-6 pr-12 text-gray-300 text-sm transition-all duration-200 rounded-xl hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white my-2"
                  >
                    <MdStar className="w-4 h-4 ml-2" />
                    <span>مراقبة الجودة</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/quality-reports"
                    onClick={() =>
                      handleNavClick("quality-reports", "/quality-reports")
                    }
                    className="flex items-center py-2 px-6 pr-12 text-gray-300 text-sm transition-all duration-200 rounded-xl hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white my-2"
                  >
                    <MdAssignment className="w-4 h-4 ml-2" />
                    <span>تقارير الجودة</span>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </li>

        {/* الميزانية */}
        <li>
          {isCollapsed ? (
            <div
              className={`group relative flex items-center justify-center p-3 text-white cursor-pointer transition-all duration-200 rounded-xl ${
                focusedItem === "budget"
                  ? "bg-[var(--color-dark)] text-white"
                  : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
              }`}
              onFocus={() => handleFocus("budget")}
              onBlur={handleBlur}
              tabIndex={0}
              onClick={(e) => {
                // Don't toggle if clicking on tooltip
                if (e.target.closest('[data-tooltip="true"]')) {
                  return;
                }
                toggleMenu("budget");
              }}
            >
              <MdScale className="w-5 h-5" />
              <div
                className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[999999] mr-2 shadow-lg"
                data-tooltip="true"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col space-y-1">
                  <Link
                    href="/budget-planning"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("budget-planning", "/budget-planning");
                    }}
                    className="flex items-center text-sm hover:text-primary-300 my-2"
                  >
                    <MdScale className="w-4 h-4 ml-1" />
                    <span>تخطيط الميزانية</span>
                  </Link>
                  <Link
                    href="/budget-tracking"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick("budget-tracking", "/budget-tracking");
                    }}
                    className="flex items-center text-sm hover:text-primary-300 my-2"
                  >
                    <MdAssignment className="w-4 h-4 ml-1" />
                    <span>تتبع الميزانية</span>
                  </Link>
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={() => toggleMenu("budget")}
                className={`flex items-center justify-between p-3 text-white cursor-pointer transition-all duration-200 rounded-xl ${
                  activeMenu === "budget" || focusedItem === "budget"
                    ? "bg-[var(--color-dark)] text-white"
                    : "hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white"
                }`}
                onFocus={() => handleFocus("budget")}
                onBlur={handleBlur}
                tabIndex={0}
              >
                <div className="flex items-center">
                  <MdScale className="w-5 h-5 ml-3" />
                  <span className="font-medium">الميزانية</span>
                </div>
                {expandedMenus.budget ? (
                  <MdKeyboardArrowUp className="w-4 h-4 ml-4" />
                ) : (
                  <MdKeyboardArrowDown className="w-4 h-4 ml-4" />
                )}
              </div>
              <ul
                className={`list-none p-0 m-0 bg-primary-50 overflow-hidden transition-all duration-300 ${
                  expandedMenus.budget ? "max-h-48" : "max-h-0"
                }`}
              >
                <li>
                  <Link
                    href="/budget-planning"
                    onClick={() =>
                      handleNavClick("budget-planning", "/budget-planning")
                    }
                    className="flex items-center py-2 px-6 pr-12 text-gray-300 text-sm transition-all duration-200 rounded-xl hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white my-2"
                  >
                    <MdScale className="w-4 h-4 ml-2" />
                    <span>تخطيط الميزانية</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/budget-tracking"
                    onClick={() =>
                      handleNavClick("budget-tracking", "/budget-tracking")
                    }
                    className="flex items-center py-2 px-6 pr-12 text-gray-300 text-sm transition-all duration-200 rounded-xl hover:bg-[var(--color-dark)] hover:text-white focus:bg-[var(--color-dark)] focus:text-white my-2"
                  >
                    <MdAssignment className="w-4 h-4 ml-2" />
                    <span>تتبع الميزانية</span>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </li>
      </ul>
    </aside>
  );
}
