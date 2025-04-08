'use client';

import { useState, useEffect } from 'react';
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';

interface DatePickerProps {
  selected: Date;
  onChange: (date: Date) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker({ 
  selected, 
  onChange, 
  className = '', 
  minDate, 
  maxDate 
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(selected));
  const [isOpen, setIsOpen] = useState(false);

  // Generate days for the current month view
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  // Handle month navigation
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Close picker when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.date-picker-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if a date is disabled
  const isDisabled = (day: Date) => {
    return (
      (minDate && day < minDate) || 
      (maxDate && day > maxDate)
    );
  };

  return (
    <div className={`relative date-picker-container ${className}`}>
      {/* Input Display */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-2 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
      >
        <span>{format(selected, 'PPP')}</span>
        <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-surface border border-gray-200 rounded-lg shadow-lg p-3">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <h3 className="font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <button 
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((day) => {
              const disabled = isDisabled(day);
              const isSelected = isSameDay(day, selected);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isDayToday = isToday(day);

              return (
                <button
                  key={day.toString()}
                  onClick={() => {
                    if (!disabled) {
                      onChange(day);
                      setIsOpen(false);
                    }
                  }}
                  disabled={disabled}
                  className={`
                    h-8 w-8 rounded-full text-sm
                    ${isSelected ? 'bg-blue-600 text-white' : ''}
                    ${!isSelected && isCurrentMonth ? 'hover:bg-gray-100' : ''}
                    ${!isCurrentMonth ? 'text-gray-400' : ''}
                    ${disabled ? 'text-gray-300 cursor-not-allowed' : ''}
                    ${isDayToday && !isSelected ? 'border border-blue-200' : ''}
                    flex items-center justify-center
                  `}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>

          {/* Quick Selection */}
          <div className="flex justify-between mt-3 pt-3 border-t">
            <button 
              onClick={() => {
                const today = new Date();
                if (!isDisabled(today)) {
                  onChange(today);
                  setIsOpen(false);
                }
              }}
              className="text-xs px-2 py-1 hover:bg-gray-100 rounded"
            >
              Today
            </button>
            <button 
              onClick={() => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                if (!isDisabled(yesterday)) {
                  onChange(yesterday);
                  setIsOpen(false);
                }
              }}
              className="text-xs px-2 py-1 hover:bg-gray-100 rounded"
            >
              Yesterday
            </button>
          </div>
        </div>
      )}
    </div>
  );
}