import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export const useNavigation = () => {
  const [expandedMenus, setExpandedMenus] = useState({
    dashboards: false,
    projects: false,
    letters: false,
    quality: false,
    budget: false,
  });

  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = (menuName) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  const isActiveRoute = (path) => {
    return pathname === path;
  };

  return {
    expandedMenus,
    toggleMenu,
    navigateTo,
    isActiveRoute,
  };
};
