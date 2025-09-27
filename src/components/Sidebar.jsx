"use client";

import { useState } from "react";
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

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    dashboards: false,
    projects: false,
    letters: false,
    quality: false,
    budget: false,
  });

  const toggleMenu = (menuName) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleNavClick = (menuName) => {
    // Handle navigation logic here
    console.log(`Navigating to ${menuName}`);
  };

  return (
    <aside
      className={`relative h-screen bg-white border-l border-gray-200 transition-all duration-300 z-50 overflow-hidden ${
        isCollapsed ? "w-20" : "w-70"
      }`}
      style={{
        position: "relative",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(22, 163, 74, 0.1) 0%, transparent 50%)
          `,
        }}
      ></div>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 left-4 bg-primary-500 hover:bg-primary-600 text-white rounded-md p-2 transition-colors duration-200"
      >
        {isCollapsed ? (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        )}
      </button>

      {/* Navigation List */}
      <ul className="list-none p-4 m-0 pt-16" dir="rtl">
        {/* لوحات البيانات */}
        <li>
          {isCollapsed ? (
            <div className="group relative flex items-center justify-center p-3 text-gray-700 cursor-pointer transition-all duration-200 hover:bg-primary-100 hover:text-primary-500">
              <MdSettings className="w-5 h-5" />
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 mr-2">
                <div className="flex flex-col space-y-1">
                  <a
                    href="/dashboard"
                    onClick={() => handleNavClick("dashboards")}
                    className="flex items-center text-sm hover:text-primary-300"
                  >
                    <MdHome className="w-4 h-4 ml-1" />
                    <span>الرئيسية</span>
                  </a>
                  <a
                    href="/analytics"
                    onClick={() => handleNavClick("dashboards")}
                    className="flex items-center text-sm hover:text-primary-300"
                  >
                    <MdAssignment className="w-4 h-4 ml-1" />
                    <span>التحليلات</span>
                  </a>
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={() => toggleMenu("dashboards")}
                className="flex items-center justify-between p-3 text-gray-700 cursor-pointer transition-all duration-200 border-r-3 border-transparent hover:bg-primary-100 hover:text-primary-500 hover:border-primary-500"
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
                  <a
                    href="/dashboard"
                    onClick={() => handleNavClick("dashboards")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-600 text-sm transition-all duration-200 hover:bg-primary-100 hover:text-primary-500"
                  >
                    <MdHome className="w-4 h-4 ml-2" />
                    <span>الرئيسية</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/analytics"
                    onClick={() => handleNavClick("dashboards")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-600 text-sm transition-all duration-200 hover:bg-primary-100 hover:text-primary-500"
                  >
                    <MdAssignment className="w-4 h-4 ml-2" />
                    <span>التحليلات</span>
                  </a>
                </li>
              </ul>
            </>
          )}
        </li>

        {/* تقديم طلب جديد */}
        <li>
          {isCollapsed ? (
            <div className="group relative flex items-center justify-center p-3 text-gray-700 cursor-pointer transition-all duration-200 hover:bg-primary-100 hover:text-primary-500">
              <MdAddCircleOutline className="w-5 h-5" />
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 mr-2">
                تقديم طلب جديد
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
            </div>
          ) : (
            <a
              href="/new-request"
              onClick={() => handleNavClick("requests")}
              className="flex items-center p-3 text-gray-700 transition-all duration-200 border-r-3 border-transparent hover:bg-primary-100 hover:text-primary-500 hover:border-primary-500"
            >
              <MdAddCircleOutline className="w-5 h-5 ml-3" />
              <span className="font-medium">تقديم طلب جديد</span>
            </a>
          )}
        </li>

        {/* السجلات */}
        <li>
          {isCollapsed ? (
            <div className="group relative flex items-center justify-center p-3 text-gray-700 cursor-pointer transition-all duration-200 hover:bg-primary-100 hover:text-primary-500">
              <MdAssignment className="w-5 h-5" />
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 mr-2">
                <div className="flex flex-col space-y-1">
                  <a
                    href="/projects-log"
                    onClick={() => handleNavClick("projects")}
                    className="flex items-center text-sm hover:text-primary-300"
                  >
                    <MdAssignment className="w-4 h-4 ml-1" />
                    <span>سجل المشاريع</span>
                  </a>
                  <a
                    href="/risks-log"
                    onClick={() => handleNavClick("risks")}
                    className="flex items-center text-sm hover:text-primary-300"
                  >
                    <MdWarning className="w-4 h-4 ml-1" />
                    <span>سجل المخاطر</span>
                  </a>
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={() => toggleMenu("projects")}
                className="flex items-center justify-between p-3 text-gray-700 cursor-pointer transition-all duration-200 border-r-3 border-transparent hover:bg-primary-100 hover:text-primary-500 hover:border-primary-500"
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
                  <a
                    href="/projects-log"
                    onClick={() => handleNavClick("projects")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-600 text-sm transition-all duration-200 hover:bg-primary-100 hover:text-primary-500"
                  >
                    <MdAssignment className="w-4 h-4 ml-2" />
                    <span>سجل المشاريع</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/risks-log"
                    onClick={() => handleNavClick("projects")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-600 text-sm transition-all duration-200 hover:bg-primary-100 hover:text-primary-500"
                  >
                    <MdWarning className="w-4 h-4 ml-2" />
                    <span>سجل المخاطر</span>
                  </a>
                </li>
              </ul>
            </>
          )}
        </li>

        {/* الجداول الزمنية */}
        <li>
          {isCollapsed ? (
            <div className="group relative flex items-center justify-center p-3 text-gray-700 cursor-pointer transition-all duration-200 hover:bg-primary-100 hover:text-primary-500">
              <MdCalendarToday className="w-5 h-5" />
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 mr-2">
                الجداول الزمنية
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
            </div>
          ) : (
            <a
              href="/schedules"
              onClick={() => handleNavClick("schedules")}
              className="flex items-center p-3 text-gray-700 transition-all duration-200 border-r-3 border-transparent hover:bg-primary-100 hover:text-primary-500 hover:border-primary-500"
            >
              <MdCalendarToday className="w-5 h-5 ml-3" />
              <span className="font-medium">الجداول الزمنية</span>
            </a>
          )}
        </li>

        {/* الخطابات والمراسلات */}
        <li>
          {isCollapsed ? (
            <div className="group relative flex items-center justify-center p-3 text-gray-700 cursor-pointer transition-all duration-200 hover:bg-primary-100 hover:text-primary-500">
              <MdEmail className="w-5 h-5" />
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 mr-2">
                <div className="flex flex-col space-y-1">
                  <a
                    href="/incoming-letters"
                    onClick={() => handleNavClick("letters")}
                    className="flex items-center text-sm hover:text-primary-300"
                  >
                    <MdEmail className="w-4 h-4 ml-1" />
                    <span>الخطابات الواردة</span>
                  </a>
                  <a
                    href="/outgoing-letters"
                    onClick={() => handleNavClick("letters")}
                    className="flex items-center text-sm hover:text-primary-300"
                  >
                    <MdEmail className="w-4 h-4 ml-1" />
                    <span>الخطابات الصادرة</span>
                  </a>
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={() => toggleMenu("letters")}
                className="flex items-center justify-between p-3 text-gray-700 cursor-pointer transition-all duration-200 border-r-3 border-transparent hover:bg-primary-100 hover:text-primary-500 hover:border-primary-500"
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
                  <a
                    href="/incoming-letters"
                    onClick={() => handleNavClick("letters")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-600 text-sm transition-all duration-200 hover:bg-primary-100 hover:text-primary-500"
                  >
                    <MdEmail className="w-4 h-4 ml-2" />
                    <span>الخطابات الواردة</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/outgoing-letters"
                    onClick={() => handleNavClick("letters")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-600 text-sm transition-all duration-200 hover:bg-primary-100 hover:text-primary-500"
                  >
                    <MdEmail className="w-4 h-4 ml-2" />
                    <span>الخطابات الصادرة</span>
                  </a>
                </li>
              </ul>
            </>
          )}
        </li>

        {/* الجودة */}
        <li>
          {isCollapsed ? (
            <div className="group relative flex items-center justify-center p-3 text-gray-700 cursor-pointer transition-all duration-200 hover:bg-primary-100 hover:text-primary-500">
              <MdStar className="w-5 h-5" />
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 mr-2">
                <div className="flex flex-col space-y-1">
                  <a
                    href="/quality-control"
                    onClick={() => handleNavClick("quality")}
                    className="flex items-center text-sm hover:text-primary-300"
                  >
                    <MdStar className="w-4 h-4 ml-1" />
                    <span>مراقبة الجودة</span>
                  </a>
                  <a
                    href="/quality-reports"
                    onClick={() => handleNavClick("quality")}
                    className="flex items-center text-sm hover:text-primary-300"
                  >
                    <MdAssignment className="w-4 h-4 ml-1" />
                    <span>تقارير الجودة</span>
                  </a>
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={() => toggleMenu("quality")}
                className="flex items-center justify-between p-3 text-gray-700 cursor-pointer transition-all duration-200 border-r-3 border-transparent hover:bg-primary-100 hover:text-primary-500 hover:border-primary-500"
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
                  <a
                    href="/quality-control"
                    onClick={() => handleNavClick("quality")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-600 text-sm transition-all duration-200 hover:bg-primary-100 hover:text-primary-500"
                  >
                    <MdStar className="w-4 h-4 ml-2" />
                    <span>مراقبة الجودة</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/quality-reports"
                    onClick={() => handleNavClick("quality")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-600 text-sm transition-all duration-200 hover:bg-primary-100 hover:text-primary-500"
                  >
                    <MdAssignment className="w-4 h-4 ml-2" />
                    <span>تقارير الجودة</span>
                  </a>
                </li>
              </ul>
            </>
          )}
        </li>

        {/* الميزانية */}
        <li>
          {isCollapsed ? (
            <div className="group relative flex items-center justify-center p-3 text-gray-700 cursor-pointer transition-all duration-200 hover:bg-primary-100 hover:text-primary-500">
              <MdScale className="w-5 h-5" />
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 mr-2">
                <div className="flex flex-col space-y-1">
                  <a
                    href="/budget-planning"
                    onClick={() => handleNavClick("budget")}
                    className="flex items-center text-sm hover:text-primary-300"
                  >
                    <MdScale className="w-4 h-4 ml-1" />
                    <span>تخطيط الميزانية</span>
                  </a>
                  <a
                    href="/budget-tracking"
                    onClick={() => handleNavClick("budget")}
                    className="flex items-center text-sm hover:text-primary-300"
                  >
                    <MdAssignment className="w-4 h-4 ml-1" />
                    <span>تتبع الميزانية</span>
                  </a>
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={() => toggleMenu("budget")}
                className="flex items-center justify-between p-3 text-gray-700 cursor-pointer transition-all duration-200 border-r-3 border-transparent hover:bg-primary-100 hover:text-primary-500 hover:border-primary-500"
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
                  <a
                    href="/budget-planning"
                    onClick={() => handleNavClick("budget")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-600 text-sm transition-all duration-200 hover:bg-primary-100 hover:text-primary-500"
                  >
                    <MdScale className="w-4 h-4 ml-2" />
                    <span>تخطيط الميزانية</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/budget-tracking"
                    onClick={() => handleNavClick("budget")}
                    className="flex items-center py-2 px-6 pr-12 text-gray-600 text-sm transition-all duration-200 hover:bg-primary-100 hover:text-primary-500"
                  >
                    <MdAssignment className="w-4 h-4 ml-2" />
                    <span>تتبع الميزانية</span>
                  </a>
                </li>
              </ul>
            </>
          )}
        </li>
      </ul>
    </aside>
  );
}
