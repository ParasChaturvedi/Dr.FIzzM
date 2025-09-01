"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, ChevronDown, Plus } from "lucide-react";

export default function StepSlide5({ onNext, onBack, onCompetitorSubmit }) {
  const [selectedBusinessCompetitors, setSelectedBusinessCompetitors] = useState([]);
  const [selectedSearchCompetitors, setSelectedSearchCompetitors] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const containerRef = useRef(null);
  const lastSubmittedData = useRef(null);

  // Suggested business competitors
  const businessCompetitors = ["Comp-1", "Comp-2", "Comp-3", "Comp-4", "More"];

  // Suggested search engine competitors
  const searchEngineCompetitors = ["Comp-1", "Comp-2", "Comp-3", "Comp-4", "More"];

  // Toggle business competitor selection
  const handleBusinessCompetitorToggle = (competitor) => {
    setSelectedBusinessCompetitors((prev) =>
      prev.includes(competitor) ? prev.filter((c) => c !== competitor) : [...prev, competitor]
    );
  };

  // Toggle search engine competitor selection
  const handleSearchCompetitorToggle = (competitor) => {
    setSelectedSearchCompetitors((prev) =>
      prev.includes(competitor) ? prev.filter((c) => c !== competitor) : [...prev, competitor]
    );
  };

  // Remove specific business competitor
  const handleRemoveBusinessCompetitor = (competitorToRemove) => {
    setSelectedBusinessCompetitors((prev) => prev.filter((c) => c !== competitorToRemove));
  };

  // Remove specific search competitor
  const handleRemoveSearchCompetitor = (competitorToRemove) => {
    setSelectedSearchCompetitors((prev) => prev.filter((c) => c !== competitorToRemove));
  };

  // Submit data upwards when competitors change
  useEffect(() => {
    const totalSelected = selectedBusinessCompetitors.length + selectedSearchCompetitors.length;

    if (totalSelected > 0) {
      const payload = {
        businessCompetitors: selectedBusinessCompetitors,
        searchCompetitors: selectedSearchCompetitors,
        totalCompetitors: [...selectedBusinessCompetitors, ...selectedSearchCompetitors],
      };
      const curr = JSON.stringify(payload);
      if (curr !== JSON.stringify(lastSubmittedData.current)) {
        lastSubmittedData.current = payload;
        onCompetitorSubmit?.(payload);
      }
      setShowSummary(true);
    } else {
      setShowSummary(false);
      onCompetitorSubmit?.({
        businessCompetitors: [],
        searchCompetitors: [],
        totalCompetitors: [],
      });
    }
  }, [selectedBusinessCompetitors, selectedSearchCompetitors, onCompetitorSubmit]);

  // Auto-scroll to top when summary appears
  useEffect(() => {
    if (containerRef.current && showSummary) {
      setTimeout(() => {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [showSummary]);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 transition-colors duration-300">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`div::-webkit-scrollbar{display:none}`}</style>
        <div className="min-h-full py-12 px-8 pb-96">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            {/* Step Indicator */}
            <div className="text-gray-500 text-sm font-medium">Step - 5</div>

            {/* Main Heading */}
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl font-bold text-gray-900">
                Here are some suggestions for Business and Search Engine Competitors based on your website.
              </h1>
              <p className="text-gray-600 text-lg">I scanned your site and found these gems.</p>
            </div>

            {/* Competitor Selection Area */}
            <div className="w-full max-w-4xl space-y-8">
              {/* Business Competitors Section */}
              <div className="text-left">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Business Competitors</h3>
                <div className="flex flex-wrap gap-3">
                  {businessCompetitors.map((competitor, index) => {
                    const id = `${competitor}-${index}`;
                    const isSelected = selectedBusinessCompetitors.includes(id);
                    return (
                      <button
                        key={`business-${id}`}
                        onClick={() => handleBusinessCompetitorToggle(id)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? "bg-white text-gray-900 border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {competitor}
                        {isSelected ? (
                          <ChevronDown size={16} className="inline ml-1 -rotate-180" />
                        ) : competitor !== "More" ? (
                          <Plus size={16} className="inline ml-1" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search Engine Competitors Section */}
              <div className="text-left">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Search Engine Competitors</h3>
                <div className="flex flex-wrap gap-3">
                  {searchEngineCompetitors.map((competitor, index) => {
                    const id = `${competitor}-${index}`;
                    const isSelected = selectedSearchCompetitors.includes(id);
                    return (
                      <button
                        key={`search-${id}`}
                        onClick={() => handleSearchCompetitorToggle(id)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? "bg-white text-gray-900 border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {competitor}
                        {isSelected ? (
                          <ChevronDown size={16} className="inline ml-1 -rotate-180" />
                        ) : competitor !== "More" ? (
                          <Plus size={16} className="inline ml-1" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Competitors Display */}
            {(selectedBusinessCompetitors.length > 0 || selectedSearchCompetitors.length > 0) && (
              <div className="w-full max-w-4xl space-y-6">
                {/* Selected Business Competitors */}
                {selectedBusinessCompetitors.length > 0 && (
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Selected Business Competitors ({selectedBusinessCompetitors.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBusinessCompetitors.map((competitor, idx) => (
                        <div
                          key={`selected-business-${competitor}-${idx}`}
                          className="group relative inline-flex items-center border border-blue-600 text-blue-600 rounded-lg font-medium bg-white text-md transition-all duration-300 px-6 py-3 cursor-default hover:pr-12"
                        >
                          <span>{competitor}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveBusinessCompetitor(competitor);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 text-gray-400 hover:text-red-500 p-0 h-6 w-6 flex items-center justify-center pointer-events-auto"
                            title="Remove competitor"
                            tabIndex={-1}
                            style={{ background: "transparent", border: "none" }}
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

                {/* Selected Search Engine Competitors */}
                {selectedSearchCompetitors.length > 0 && (
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Selected Search Engine Competitors ({selectedSearchCompetitors.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSearchCompetitors.map((competitor, idx) => (
                        <div
                          key={`selected-search-${competitor}-${idx}`}
                          className="group relative inline-flex items-center border border-green-600 text-green-600 rounded-lg font-medium bg-white text-md transition-all duration-300 px-6 py-3 cursor-default hover:pr-12"
                        >
                          <span>{competitor}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveSearchCompetitor(competitor);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 text-gray-400 hover:text-red-500 p-0 h-6 w-6 flex items-center justify-center pointer-events-auto"
                            title="Remove competitor"
                            tabIndex={-1}
                            style={{ background: "transparent", border: "none" }}
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

            {/* Summary Section */}
            {showSummary && (
              <>
                <div className="text-center space-y-6 w-full pt-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Here&apos;s your site report — take a quick look on the Info Tab.
                    </h3>
                    <p className="text-gray-600 text-base">You can always view more information in Info Tab</p>
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
