"use client";

import React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  title: string;
  icon?: string;
  link?: string;
  children?: MenuItem[];
}

interface SidebarProps {
  menuItems: MenuItem[];
  logos?: {
    default: string;
    admin?: string;
    manager?: string;
  };
  isMobile: boolean;
}

export default function Sidebar({ menuItems, logos, isMobile }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getLogoPath = () => {
    if (pathname?.startsWith("/admin") && logos?.admin) {
      return logos.admin;
    } else if (pathname?.startsWith("/manager") && logos?.manager) {
      return logos.manager;
    }
    return logos?.default || "";
  };

  // On mobile, sidebar should never be collapsed
  const shouldCollapse = !isMobile && isCollapsed;

  return (
    <nav
      className={`text-text-primary h-screen px-4 py-6 relative transition-all duration-300 ${
        shouldCollapse ? "w-24" : "w-72"
      }`}
      style={{ overflow: "visible" }}
    >
      {/* Sidebar Logo */}
      <div className="flex justify-center items-center mb-4">
        <Image
          src={getLogoPath()}
          alt="Logo"
          width={shouldCollapse ? 64 : 90}
          height={shouldCollapse ? 64 : 90}
          className="object-contain max-w-full"
          priority
        />
      </div>

      {/* Toggle Button - Only show on desktop */}
      {!isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute top-2 right-1 shadow-md rounded-full focus:outline-none"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      )}

      {/* Sidebar Menu */}
      <div className="h-[calc(100vh-180px)] scroll-container overflow-y-auto">
        <ul>
          {menuItems.map((menu, index) => (
            <li key={index} className="mb-6">
              <div className="flex items-center relative group">
                {/* Parent Icon */}
                {menu.icon && (
                  <div
                    dangerouslySetInnerHTML={{ __html: menu.icon }}
                    className={`w-6 h-6 flex justify-center items-center transition-all duration-300 ${
                      shouldCollapse ? "w-full" : "mr-4"
                    }`}
                  />
                )}

                {/* Parent Title (Shown When Expanded) */}
                {!shouldCollapse && (
                  <span className="font-medium flex-1 ml-2">{menu.title}</span>
                )}

                {/* Hover Tooltip for Parent (When Collapsed) */}
                {shouldCollapse && (
                  <span className="absolute left-full ml-2 bg-gray-800 text-white px-3 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {menu.title}
                  </span>
                )}
              </div>

              <div
                className={`border-b border-gray-600 mt-1 ${
                  shouldCollapse ? "mx-auto w-8" : ""
                }`}
              />

              {/* Children Menu */}
              {menu.children && menu.children.length > 0 && (
                <ul className="mt-2 space-y-2 whitespace-nowrap">
                  {menu.children.map((child, idx) => (
                    <li key={idx}>
                      <Link
                        href={child.link || "/"}
                        className={`flex hover:text-green-500  items-center rounded-3xl hover:border hover:border-green-500 hover:bg-green-200 transition-all relative group ${
                          shouldCollapse ? "justify-center" : "mx-10 px-3"
                        }`}
                      >
                        {/* Child Icon */}
                        {child.icon && (
                          <div
                            dangerouslySetInnerHTML={{ __html: child.icon }}
                            className={`w-8 h-8 flex items-center justify-center transition-all duration-300 ${
                              shouldCollapse ? "w-full" : "mr-2"
                            }`}
                          />
                        )}

                        {/* Hover Tooltip for Child (When Collapsed) */}
                        {shouldCollapse && (
                          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-[1000] bg-gray-800 px-3 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-white">
                            {child.title}
                          </span>
                        )}

                        {/* Child Title (When Expanded) */}
                        {!shouldCollapse && (
                          <span className=" hover:text-green-700   transition-all duration-300">
                            {child.title}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
