"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {ThemeToggle} from '@/components/theme-toggle'

interface HeaderProps {
  userName?: string;
  userImage?: string;
  logo?: string;
  siteName?: string;
  onMenuToggle?: () => void;
  onLogout?: () => void;
}

export default function Header({
  userName = "Super Admin",
  userImage = "",
  logo = "/bp.png",
  siteName = "BP HatField Garden",
  onMenuToggle,
  onLogout,
}: HeaderProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log("User logged out");
      router.push("/login");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex bg-background items-center justify-between px-4 py-2 shadow-md">
      {/* Mobile menu button */}
      <div className="md:hidden" onClick={onMenuToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      {/* Left: Logo and Title */}
      <div className="w-full items-center hidden md:flex md justify-center space-x-3">
        {/* <Image
          src={logo}
          alt="logo"
          width={48}
          height={48}
          className="object-cover"
          priority
        />
        <h1 className="text-2xl font-bold">{siteName}</h1> */}
      </div>

      <div ref={dropdownRef} className="relative inline-block">
       
        <div className="flex items-center">
          <span className="h-8 w-8 flex justify-center items-center bg-white rounded-full">
          <Image
            src={userImage || "/hisgroup.png"}
            alt="User Profile"
            width={40}
            height={40}
            className="rounded-full border  cursor-pointer object-cover"
            onClick={toggleDropdown}
          />
          </span>
          
          <div className="px-4 md:flex py-2 hidden font-semibold whitespace-nowrap overflow-hidden">
            {userName}
          </div>
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[#333333] shadow-lg rounded-md py-2 z-20 animate-fade-in">
            <ThemeToggle />
            {/* Menu Options */}
            <Link
              href="/"
              className="block px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-900"
            >
              Profile
            </Link>
            <Link
              href="/"
              className="block px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-900"
            >
              Settings
            </Link>

            {/* Divider */}
            <div className="border-t border-gray-200 my-1"></div>

            {/* Logout Option */}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
