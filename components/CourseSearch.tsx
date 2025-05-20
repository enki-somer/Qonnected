"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface CourseSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLevel?: string;
  onLevelChange?: (level: string) => void;
  showFilters?: boolean;
  onClear?: () => void;
  placeholder?: string;
}

const levels = [
  { id: "all", label: "جميع المستويات", labelEn: "All Levels" },
  { id: "beginner", label: "مبتدئ", labelEn: "Beginner" },
  { id: "intermediate", label: "متوسط", labelEn: "Intermediate" },
  { id: "advanced", label: "متقدم", labelEn: "Advanced" },
];

export default function CourseSearch({
  searchQuery,
  onSearchChange,
  selectedLevel,
  onLevelChange,
  showFilters = true,
  onClear,
  placeholder = "ابحث عن الدورات...",
}: CourseSearchProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Function to normalize Arabic text for search
  const normalizeArabic = (text: string) => {
    return text
      .replace(/[يى]/g, "ي")
      .replace(/[أإآا]/g, "ا")
      .replace(/ة/g, "ه")
      .toLowerCase();
  };

  const handleSearch = (value: string) => {
    setLocalSearch(value);
    const normalizedSearch = normalizeArabic(value);
    onSearchChange(normalizedSearch);
  };

  const handleClear = () => {
    setLocalSearch("");
    onSearchChange("");
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="mb-6 space-y-3 sm:space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          value={localSearch}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-primary-dark pl-10 pr-12 py-2.5 rounded-xl text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        {localSearch && (
          <button
            onClick={handleClear}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/5 rounded-full transition-colors"
          >
            <XMarkIcon className="w-4 h-4 text-text-muted" />
          </button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => onLevelChange?.(level.id)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition-colors ${
                selectedLevel === level.id
                  ? "bg-accent text-primary"
                  : "bg-primary-dark text-text-muted hover:bg-white/5"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
