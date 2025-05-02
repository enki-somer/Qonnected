import { useState, useEffect, FormEvent } from "react";
import { Search, Filter, X } from "lucide-react";

interface CourseSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLevel: string;
  onLevelChange: (level: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  isCoursePage?: boolean;
  onSearch?: () => void;
  onClear?: () => void;
}

const levels = [
  { id: "all", label: "جميع المستويات", labelEn: "All Levels" },
  { id: "beginner", label: "مبتدئ", labelEn: "Beginner" },
  { id: "intermediate", label: "متوسط", labelEn: "Intermediate" },
  { id: "advanced", label: "متقدم", labelEn: "Advanced" },
];

const courseTypes = [
  { id: "all", label: "جميع الأنواع", labelEn: "All Types" },
  { id: "development", label: "تطوير", labelEn: "Development" },
  { id: "data-science", label: "علوم البيانات", labelEn: "Data Science" },
  { id: "machine-learning", label: "تعلم الآلة", labelEn: "Machine Learning" },
  { id: "web", label: "تطوير الويب", labelEn: "Web Development" },
  { id: "mobile", label: "تطوير الموبايل", labelEn: "Mobile Development" },
];

export default function CourseSearch({
  searchQuery,
  onSearchChange,
  selectedLevel,
  onLevelChange,
  selectedCategory,
  onCategoryChange,
  isCoursePage = false,
  onSearch,
  onClear,
}: CourseSearchProps) {
  const [selectedType, setSelectedType] = useState("all");
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

  const handleSearch = () => {
    const normalizedSearch = normalizeArabic(localSearch);
    onSearchChange(normalizedSearch);
    if (onSearch && normalizedSearch.trim()) {
      onSearch();
    }
  };

  const handleClear = () => {
    setLocalSearch("");
    onSearchChange("");
    if (onClear) {
      onClear();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      handleSearch();
    } else {
      handleClear();
    }
  };

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        {/* Search Input Group */}
        <div className="relative flex-grow flex">
          <div className="relative flex-grow">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
            <input
              type="search"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={
                isCoursePage ? "ابحث في محتوى الدورة..." : "ابحث عن الدورات..."
              }
              className="w-full bg-primary-dark pl-10 pr-10 py-2 rounded-r-none rounded-l-lg border-r-0 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors placeholder:text-text-muted"
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
          <button
            type="submit"
            className="px-6 bg-accent text-white rounded-r-lg border border-accent hover:bg-accent/90 transition-colors flex items-center justify-center"
          >
            بحث
          </button>
        </div>

        {/* Filter Button */}
        <button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 bg-primary-dark px-4 py-2 rounded-lg border border-white/10 hover:border-accent transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span>تصفية</span>
        </button>
      </form>

      {/* Filter Options */}
      {isFilterOpen && (
        <div
          className="bg-primary-dark rounded-lg border border-white/10 p-4 space-y-4"
          dir="rtl"
        >
          {/* Level Filter */}
          <div>
            <h3 className="text-sm font-medium mb-2">المستوى</h3>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => onLevelChange(level.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedLevel === level.id
                      ? "bg-accent text-white"
                      : "bg-white/5 hover:bg-white/10"
                  } transition-colors`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Course Type Filter - Only show on course pages */}
          {isCoursePage && (
            <div>
              <h3 className="text-sm font-medium mb-2">نوع الدورة</h3>
              <div className="flex flex-wrap gap-2">
                {courseTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedType === type.id
                        ? "bg-accent text-white"
                        : "bg-white/5 hover:bg-white/10"
                    } transition-colors`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
