import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";

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
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input Group */}
        <div className="relative flex-grow">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
          <input
            type="search"
            value={localSearch}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-primary-dark pl-12 pr-10 py-3 rounded-lg border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors placeholder:text-text-muted"
            dir="rtl"
          />
          {localSearch && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Button */}
        {showFilters && (
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-primary-dark px-6 py-3 rounded-lg border border-white/10 hover:border-accent transition-colors group"
          >
            <Filter className="w-5 h-5 group-hover:text-accent transition-colors" />
            <span className="group-hover:text-accent transition-colors">
              المستوى
            </span>
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && isFilterOpen && (
        <div
          className="bg-primary-dark rounded-lg border border-white/10 p-4 animate-in fade-in slide-in-from-top-4 duration-300"
          dir="rtl"
        >
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => onLevelChange?.(level.id)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedLevel === level.id
                    ? "bg-accent text-white"
                    : "bg-white/5 hover:bg-white/10"
                } transition-all duration-300 hover:scale-105 active:scale-95`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
