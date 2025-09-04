"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, ChevronDown, Plus, X } from "lucide-react";

export default function StepSlide5({ onNext, onBack, onCompetitorSubmit }) {
  // Selected values (store plain strings)
  const [selectedBusinessCompetitors, setSelectedBusinessCompetitors] = useState([]);
  const [selectedSearchCompetitors, setSelectedSearchCompetitors] = useState([]);

  // Inline “More -> input” state
  const [addingBusiness, setAddingBusiness] = useState(false);
  const [addingSearch, setAddingSearch] = useState(false);
  const [bizInput, setBizInput] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [showSummary, setShowSummary] = useState(false);
  const containerRef = useRef(null);
  const lastSubmittedData = useRef(null);

  // Suggested chips
  const businessCompetitors = ["Comp-1", "Comp-2", "Comp-3", "Comp-4"];
  const searchEngineCompetitors = ["Comp-1", "Comp-2", "Comp-3", "Comp-4"];

  // --- Toggle helpers ---
  const toggleBusiness = (label) => {
    setSelectedBusinessCompetitors((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };
  const toggleSearch = (label) => {
    setSelectedSearchCompetitors((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  const removeBusiness = (label) => {
    setSelectedBusinessCompetitors((prev) => prev.filter((c) => c !== label));
  };
  const removeSearch = (label) => {
    setSelectedSearchCompetitors((prev) => prev.filter((c) => c !== label));
  };

  // --- Add custom competitors (unique per category) ---
  const addCustomBusiness = () => {
    const v = bizInput.trim();
    if (!v) return;
    if (!selectedBusinessCompetitors.includes(v)) {
      setSelectedBusinessCompetitors((prev) => [...prev, v]);
    }
    setBizInput("");
    setAddingBusiness(false);
  };
  const addCustomSearch = () => {
    const v = searchInput.trim();
    if (!v) return;
    if (!selectedSearchCompetitors.includes(v)) {
      setSelectedSearchCompetitors((prev) => [...prev, v]);
    }
    setSearchInput("");
    setAddingSearch(false);
  };

  // Submit payload upward when competitors change
  useEffect(() => {
    const totalSelected = selectedBusinessCompetitors.length + selectedSearchCompetitors.length;

    if (totalSelected > 0) {
      const payload = {
        businessCompetitors: selectedBusinessCompetitors,
        searchCompetitors: selectedSearchCompetitors,
        totalCompetitors: [
          ...selectedBusinessCompetitors,
          ...selectedSearchCompetitors,
        ],
      };

      const curr = JSON.stringify(payload);
      if (curr !== JSON.stringify(lastSubmittedData.current)) {
        lastSubmittedData.current = payload;
        if (typeof onCompetitorSubmit === "function") onCompetitorSubmit(payload);
      }
      setShowSummary(true);
    } else {
      setShowSummary(false);
      if (typeof onCompetitorSubmit === "function") {
        onCompetitorSubmit({
          businessCompetitors: [],
          searchCompetitors: [],
          totalCompetitors: [],
        });
      }
    }
  }, [selectedBusinessCompetitors, selectedSearchCompetitors, onCompetitorSubmit]);

  // Auto-scroll to top when summary appears (client only)
  useEffect(() => {
    if (containerRef.current && showSummary) {
      const id = setTimeout(() => {
        try {
          containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        } catch {}
      }, 100);
      return () => clearTimeout(id);
    }
  }, [showSummary]);

  // Focus helpers after showing inline inputs
  useEffect(() => {
    if (addingBusiness) {
      const el = document.getElementById("biz-more-input");
      if (el && el.focus) el.focus();
    }
  }, [addingBusiness]);
  useEffect(() => {
    if (addingSearch) {
      const el = document.getElementById("search-more-input");
      if (el && el.focus) el.focus();
    }
  }, [addingSearch]);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 transition-colors duration-300">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* hide scrollbar in webkit without styled-jsx */}
        <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>

        <div className="min-h-full py-12 px-8 pb-96">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            {/* Step Indicator */}
            <div className="text-gray-500 text-sm font-medium">Step - 5</div>

            {/* Heading */}
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl font-bold text-gray-900">
                Here are some suggestions for Business and Search Engine Competitors based on your website.
              </h1>
              <p className="text-gray-600 text-lg">I scanned your site and found these gems.</p>
            </div>

            {/* Selection Area */}
            <div className="w-full max-w-4xl space-y-10">
              {/* Business Competitors */}
              <div className="text-left">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Business Competitors</h3>

                <div className="flex flex-wrap gap-3 items-center">
                  {businessCompetitors.map((label) => {
                    const isSelected = selectedBusinessCompetitors.includes(label);
                    return (
                      <button
                        key={`biz-${label}`}
                        onClick={() => toggleBusiness(label)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
                        ${
                          isSelected
                            ? "bg-white text-gray-900 border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {label}
                        {isSelected ? (
                          <ChevronDown size={16} className="inline ml-1 -rotate-180" />
                        ) : (
                          <Plus size={16} className="inline ml-1" />
                        )}
                      </button>
                    );
                  })}

                  {/* More -> input (Business) */}
                  {!addingBusiness ? (
                    <button
                      onClick={() => setAddingBusiness(true)}
                      className="px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    >
                      More <Plus size={16} className="inline ml-1" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 border border-blue-600 rounded-full bg-white pl-3 pr-1 py-1">
                      <input
                        id="biz-more-input"
                        value={bizInput}
                        onChange={(e) => setBizInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addCustomBusiness();
                          if (e.key === "Escape") {
                            setBizInput("");
                            setAddingBusiness(false);
                          }
                        }}
                        placeholder="Add custom"
                        className="outline-none text-sm text-gray-900 placeholder-gray-400 bg-transparent"
                      />
                      <button
                        onClick={addCustomBusiness}
                        className="h-7 w-7 grid place-items-center rounded-full bg-gray-800 hover:bg-gray-900 text-white transition-colors"
                        title="Add"
                      >
                        <Plus size={15} />
                      </button>
                      <button
                        onClick={() => {
                          setBizInput("");
                          setAddingBusiness(false);
                        }}
                        className="h-7 w-7 grid place-items-center rounded-full text-gray-500 hover:text-red-500 transition-colors"
                        title="Cancel"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Search Engine Competitors */}
              <div className="text-left">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Search Engine Competitors</h3>

                <div className="flex flex-wrap gap-3 items-center">
                  {searchEngineCompetitors.map((label) => {
                    const isSelected = selectedSearchCompetitors.includes(label);
                    return (
                      <button
                        key={`search-${label}`}
                        onClick={() => toggleSearch(label)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
                        ${
                          isSelected
                            ? "bg-white text-gray-900 border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {label}
                        {isSelected ? (
                          <ChevronDown size={16} className="inline ml-1 -rotate-180" />
                        ) : (
                          <Plus size={16} className="inline ml-1" />
                        )}
                      </button>
                    );
                  })}

                  {/* More -> input (Search) */}
                  {!addingSearch ? (
                    <button
                      onClick={() => setAddingSearch(true)}
                      className="px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    >
                      More <Plus size={16} className="inline ml-1" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 border border-blue-600 rounded-full bg-white pl-3 pr-1 py-1">
                      <input
                        id="search-more-input"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addCustomSearch();
                          if (e.key === "Escape") {
                            setSearchInput("");
                            setAddingSearch(false);
                          }
                        }}
                        placeholder="Add custom"
                        className="outline-none text-sm text-gray-900 placeholder-gray-400 bg-transparent"
                      />
                      <button
                        onClick={addCustomSearch}
                        className="h-7 w-7 grid place-items-center rounded-full bg-gray-800 hover:bg-gray-900 text-white transition-colors"
                        title="Add"
                      >
                        <Plus size={15} />
                      </button>
                      <button
                        onClick={() => {
                          setSearchInput("");
                          setAddingSearch(false);
                        }}
                        className="h-7 w-7 grid place-items-center rounded-full text-gray-500 hover:text-red-500 transition-colors"
                        title="Cancel"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Selected Display */}
            {(selectedBusinessCompetitors.length > 0 || selectedSearchCompetitors.length > 0) && (
              <div className="w-full max-w-4xl space-y-6">
                {selectedBusinessCompetitors.length > 0 && (
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Selected Business Competitors ({selectedBusinessCompetitors.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBusinessCompetitors.map((label, idx) => (
                        <div
                          key={`biz-pill-${label}-${idx}`}
                          className="group relative inline-flex items-center border border-blue-600 text-blue-600 rounded-lg font-medium bg-white text-md transition-all duration-300 px-6 py-3 cursor-default hover:pr-12"
                        >
                          <span>{label}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeBusiness(label);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 text-gray-400 hover:text-red-500 p-0 h-6 w-6 flex items-center justify-center"
                            title="Remove"
                          >
                            <svg
                              width="16"
                              height="16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSearchCompetitors.length > 0 && (
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Selected Search Engine Competitors ({selectedSearchCompetitors.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSearchCompetitors.map((label, idx) => (
                        <div
                          key={`search-pill-${label}-${idx}`}
                          className="group relative inline-flex items-center border border-green-600 text-green-600 rounded-lg font-medium bg-white text-md transition-all duration-300 px-6 py-3 cursor-default hover:pr-12"
                        >
                          <span>{label}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSearch(label);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 text-gray-400 hover:text-red-500 p-0 h-6 w-6 flex items-center justify-center"
                            title="Remove"
                          >
                            <svg
                              width="16"
                              height="16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              viewBox="0 0 24 24"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Summary */}
            {showSummary && (
              <>
                <div className="text-center space-y-6 w-full pt-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Here&apos;s your site report — take a quick look on the Info Tab.
                    </h3>
                    <p className="text-gray-600 text-base">
                      You can always view more information in Info Tab
                    </p>
                  </div>
                </div>

                <div className="text-center w-full pt-8 pb-20">
                  <p className="text-gray-600 text-base mb-6">
                    All set? Click <span className="font-bold text-gray-900">Next</span> to continue.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={onBack}
                      className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full flex items-center gap-2 border border-gray-300"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      onClick={onNext}
                      className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full flex items-center gap-2"
                    >
                      Next <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
