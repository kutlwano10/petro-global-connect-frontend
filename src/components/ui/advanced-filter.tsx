
'use client';

import { useState } from 'react';
import { FunnelIcon, XMarkIcon, ArrowsUpDownIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Modal } from './modal'; // Your existing modal component

type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';
type DateRange = { start?: Date; end?: Date };

interface AdvancedFilterProps {
  onApply: (filters: {
    sort: SortOption;
    dateRange: DateRange;
    searchQuery: string;
  }) => void;
  onReset: () => void;
}

export function AdvancedFilter({ onApply, onReset }: AdvancedFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>('newest');
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleApply = () => {
    onApply({ sort, dateRange, searchQuery });
    setIsOpen(false);
  };

  const handleReset = () => {
    setSort('newest');
    setDateRange({});
    setSearchQuery('');
    onReset();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 bg-surface  border border-gray-300  rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <FunnelIcon className="h-5 w-5" />
        <span>Filters</span>
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6 max-w-2xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Advanced Filters</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Search Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter keywords..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Sorting Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' },
                { value: 'name-asc', label: 'Name (A-Z)' },
                { value: 'name-desc', label: 'Name (Z-A)' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSort(option.value as SortOption)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    sort === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <ArrowsUpDownIcon className="h-4 w-4" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">From</label>
                <div className="relative">
                  <input
                    type="date"
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value ? new Date(e.target.value) : undefined })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">To</label>
                <div className="relative">
                  <input
                    type="date"
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value ? new Date(e.target.value) : undefined })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Reset All
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}