"use client"; 
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";

export default function StepSlide2({ onNext, onBack, onBusinessDataSubmit }) {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedOffering, setSelectedOffering] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [customIndustry, setCustomIndustry] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const containerRef = useRef(null);
  const lastSubmittedData = useRef(null);

  // EXACT data from images
  const industries = [
    "Technology & Software",
    "Healthcare & Medical",
    "Retail & E-commerce",
    "Professional Services",
    "Food & Beverage",
    "Fashion & Apparel",
    "Others"
  ];

  const offerings = [
    "Services",
    "Products",
    "Digital/Software",
    "Hybrid - Multiple Types"
  ];

  const categories = [
    "Consulting & Advisory",
    "Marketing & Advertising",
    "Design & Creative",
    "Technology & IT Services",
    "Financial & Accounting",
    "Legal Services",
    "Others"
  ];

  // Handle business data submission without infinite loop
  useEffect(() => {
    if (selectedIndustry && selectedOffering && selectedCategory) {
      const industryValue =
        selectedIndustry === "Others" ? customIndustry : selectedIndustry;
      const categoryValue =
        selectedCategory === "Others" ? customCategory : selectedCategory;

      if (industryValue && categoryValue) {
        setShowSummary(true);

        const newData = {
          industry: industryValue,
          offering: selectedOffering,
          category: categoryValue
        };

        const dataString = JSON.stringify(newData);
        const lastDataString = JSON.stringify(lastSubmittedData.current);

        if (dataString !== lastDataString && onBusinessDataSubmit) {
          lastSubmittedData.current = newData;
          onBusinessDataSubmit(newData);
        }
      } else {
        setShowSummary(false);
      }
    } else {
      setShowSummary(false);
    }
  }, [
    selectedIndustry,
    selectedOffering,
    selectedCategory,
    customIndustry,
    customCategory
  ]);

  // Auto scroll to top when summary appears
  useEffect(() => {
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 100);
    }
  }, [showSummary]);

  const handleNext = () => {
    if (onNext) onNext();
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    setSelectedOffering("");
    setSelectedCategory("");
    setCustomIndustry("");
    setOpenDropdown(null);
  };

  const handleOfferingSelect = (offering) => {
    setSelectedOffering(offering);
    setSelectedCategory("");
    setOpenDropdown(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCustomCategory("");
    setOpenDropdown(null);
  };

  const handleResetSelections = () => {
    setSelectedIndustry("");
    setSelectedOffering("");
    setSelectedCategory("");
    setCustomIndustry("");
    setCustomCategory("");
    lastSubmittedData.current = null;
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* Inner Scrolling Container */}
      <div
        ref={containerRef}
        className="flex-1 h-full overflow-y-auto overflow-x-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* FIXED: Added extra padding bottom for dropdown space */}
        <div className="min-h-full py-12 px-8 pb-30">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto relative">
            {/* Step Indicator */}
            <div className="text-gray-500 text-sm font-medium">Step - 2</div>

            {/* Main Heading */}
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl font-bold text-gray-900">
                Tell us about your business
              </h1>
              <p className="text-gray-600 text-lg">
                Pick the closest category that best describes your business.
                This tailors benchmarks and keyword ideas.
              </p>
            </div>

            {/* Summary Box */}
            {showSummary && (
              <div className="bg-white rounded-xl p-6 shadow-sm border max-w-2xl w-full text-left">
                <div className="space-y-2">
                  <div className="text-gray-700">
                    <span className="font-semibold">Industry Sector:</span>{" "}
                    {selectedIndustry === "Others"
                      ? customIndustry
                      : selectedIndustry}
                  </div>
                  <div className="text-gray-700">
                    <span className="font-semibold">Offering Type:</span>{" "}
                    {selectedOffering}
                  </div>
                  <div className="text-gray-700">
                    <span className="font-semibold">Category:</span>{" "}
                    {selectedCategory === "Others"
                      ? customCategory
                      : selectedCategory}
                  </div>
                </div>
              </div>
            )}

            {/* Dropdowns - FIXED: Added more space for dropdown expansion */}
            {!showSummary && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl relative pb-80">
                {/* Industry Dropdown */}
                <div
                  className="relative dropdown-container overflow-visible"
                  style={{
                    zIndex: openDropdown === "industry" ? 1000 : 1
                  }}
                >
                  <button
                    onClick={() => handleDropdownToggle("industry")}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 transition-colors focus:outline-none focus:border-blue-500"
                    type="button"
                  >
                    <span
                      className={
                        selectedIndustry ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {selectedIndustry || "Industry Sector"}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`transform transition-transform ${
                        openDropdown === "industry" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "industry" && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-2xl max-h-64 overflow-y-auto"
                      style={{ zIndex: 1001 }}>
                      {industries.map((industry) => (
                        <button
                          key={industry}
                          onClick={() => handleIndustrySelect(industry)}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-900 border-b border-gray-100 last:border-b-0 transition-colors focus:outline-none focus:bg-blue-100"
                          type="button"
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedIndustry === "Others" && (
                    <input
                      type="text"
                      placeholder="Describe your sector"
                      value={customIndustry}
                      onChange={(e) => setCustomIndustry(e.target.value)}
                      className="w-full mt-2 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 outline-none focus:border-blue-500"
                    />
                  )}
                </div>

                {/* Offering Dropdown */}
                <div
                  className="relative dropdown-container overflow-visible"
                  style={{
                    zIndex: openDropdown === "offering" ? 1000 : 1
                  }}
                >
                  <button
                    onClick={() =>
                      selectedIndustry ? handleDropdownToggle("offering") : null
                    }
                    disabled={!selectedIndustry}
                    className={`w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between transition-colors focus:outline-none ${
                      selectedIndustry
                        ? "hover:border-gray-400 cursor-pointer focus:border-blue-500"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    type="button"
                  >
                    <span
                      className={
                        selectedOffering ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {selectedOffering || "Offering Type"}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`transform transition-transform ${
                        openDropdown === "offering" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "offering" && selectedIndustry && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-2xl max-h-64 overflow-y-auto"
                      style={{ zIndex: 1001 }}>
                      {offerings.map((offering) => (
                        <button
                          key={offering}
                          onClick={() => handleOfferingSelect(offering)}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-900 border-b border-gray-100 last:border-b-0 transition-colors focus:outline-none focus:bg-blue-100"
                          type="button"
                        >
                          {offering}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category Dropdown */}
                <div
                  className="relative dropdown-container overflow-visible"
                  style={{
                    zIndex: openDropdown === "category" ? 1000 : 1
                  }}
                >
                  <button
                    onClick={() =>
                      selectedOffering ? handleDropdownToggle("category") : null
                    }
                    disabled={!selectedOffering}
                    className={`w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between transition-colors focus:outline-none ${
                      selectedOffering
                        ? "hover:border-gray-400 cursor-pointer focus:border-blue-500"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    type="button"
                  >
                    <span
                      className={
                        selectedCategory ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {selectedCategory ||
                        `Specific Category for ${
                          selectedOffering?.toLowerCase() || "service"
                        }`}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`transform transition-transform ${
                        openDropdown === "category" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "category" && selectedOffering && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-2xl max-h-64 overflow-y-auto"
                      style={{ zIndex: 1001 }}>
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-900 border-b border-gray-100 last:border-b-0 transition-colors focus:outline-none focus:bg-blue-100"
                          type="button"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedCategory === "Others" && (
                    <input
                      type="text"
                      placeholder="Describe your service"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full mt-2 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 outline-none focus:border-blue-500"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Report Message */}
            {showSummary && (
              <div className="text-center space-y-6 w-full pt-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Heres your site report — take a quick look on the Info Tab.
                  </h3>
                  <p className="text-gray-600 text-base">
                    If not, Want to do some changes?
                  </p>
                </div>

                <div className="flex gap-8 justify-center text-base">
                  <button
                    onClick={handleResetSelections}
                    className="px-0 py-3 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    NO
                  </button>
                  <button
                    onClick={handleResetSelections}
                    className="px-0 py-3 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    YES!
                  </button>
                </div>
              </div>
            )}

            {/* Next Section with Navigation Buttons */}
            {showSummary && (
              <div className="text-center w-full pt-8 pb-20">
                <p className="text-gray-600 text-base mb-6">
                  All set? Click{" "}
                  <span className="font-bold text-gray-900">Next</span> to
                  continue.
                </p>

                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={handleBack}
                    className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full text-base font-medium flex items-center gap-2 border border-gray-300 transition-colors"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full text-base font-medium flex items-center gap-2 transition-colors shadow-lg"
                  >
                    Next <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Original ones at bottom */}
      <div className="flex-shrink-0 bg-gray-100 border-t border-gray-200 p-6">
        <div className="max-w-4xl mx-auto flex justify-center gap-4">
          <button
            onClick={handleBack}
            className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full text-base font-medium flex items-center gap-2 border border-gray-300 transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          {showSummary && (
            <button
              onClick={handleNext}
              className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full text-base font-medium flex items-center gap-2 transition-colors shadow-lg"
            >
              Next <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
