// components/ui/FilterDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  iconClassName?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
}

export function FilterDropdown({
  options,
  selectedValue,
  onSelect,
  placeholder = "Filter",
  iconClassName = "h-5 w-5",
  buttonClassName = "",
  dropdownClassName = "",
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === selectedValue);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 ${buttonClassName}`}
      >
        <FunnelIcon className={iconClassName} />
        <span>{selectedOption?.label || placeholder}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${dropdownClassName}`}
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  selectedValue === option.value
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}