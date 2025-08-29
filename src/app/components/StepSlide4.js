"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, ChevronDown, Plus } from "lucide-react";

export default function StepSlide4({ onNext, onBack, onKeywordSubmit }) {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [customKeyword, setCustomKeyword] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const containerRef = useRef(null);
  const lastSubmittedData = useRef(null);

  // Unique suggested keywords
  const suggestedKeywords = [
    "Keyword A",
    "Keyword B",
    "Keyword C",
    "Keyword D",
    "Keyword E",
    "Keyword F",
    "Keyword G",
    "Keyword H",
    "More",
  ];

  // Toggle keyword selection
  const handleKeywordToggle = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  // Add custom keyword
  const handleAddCustom = () => {
    const trimmed = customKeyword.trim();
    if (trimmed && !selectedKeywords.includes(trimmed)) {
      setSelectedKeywords((prev) => [...prev, trimmed]);
      setCustomKeyword("");
    }
  };

  // Handle Enter key for custom keyword
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustom();
    }
  };

  // Submit data upwards when keywords change
  useEffect(() => {
    if (selectedKeywords.length > 0) {
      const payload = { keywords: selectedKeywords };
      const curr = JSON.stringify(payload);
      if (curr !== JSON.stringify(lastSubmittedData.current)) {
        lastSubmittedData.current = payload;
        onKeywordSubmit?.(payload);
      }
      setShowSummary(true);
    } else {
      setShowSummary(false);
    }
  }, [selectedKeywords]);

  // Auto-scroll to top when summary appears
  useEffect(() => {
    if (containerRef.current && showSummary) {
      setTimeout(() => {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [showSummary]);

  return (
    <div className="w-full h-screen flex flex-col bg-white transition-colors duration-300">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`div::-webkit-scrollbar{display:none}`}</style>
        <div className="min-h-full py-12 px-8 pb-96">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            {/* Step Indicator */}
            <div className="text-gray-500 text-sm font-medium">
              Step - 4
            </div>

            {/* Main Heading */}
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl font-bold text-gray-900">
                Unlock high-impact keywords.
              </h1>
              <p className="text-gray-600 text-lg">
                I scanned your site and found these gems.
              </p>
            </div>

            {/* Keyword Selection Area */}
            <div className="w-full max-w-4xl space-y-8">
              {/* Suggested Keywords */}
              <div className="flex flex-wrap justify-center gap-3">
                {suggestedKeywords.map((keyword) => {
                  const isSelected = selectedKeywords.includes(keyword);
                  return (
                    <button
                      key={keyword}
                      onClick={() => handleKeywordToggle(keyword)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {keyword}
                      {isSelected ? (
                        <ChevronDown size={16} className="inline ml-1 -rotate-180" />
                      ) : keyword !== "More" ? (
                        <Plus size={16} className="inline ml-1" />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {/* Custom Keyword Input */}
              <div className="flex justify-center">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add your own keyword"
                    value={customKeyword}
                    onChange={(e) => setCustomKeyword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleAddCustom}
                    disabled={!customKeyword.trim()}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Keywords Display */}
            {selectedKeywords.length > 0 && (
              <div className="w-full max-w-4xl">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Selected Keywords ({selectedKeywords.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedKeywords.map((keyword, idx) => (
                    <span
                      key={`${keyword}-${idx}`}
                      className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Summary Section */}
            {showSummary && (
              <>
                <div className="text-center space-y-6 w-full pt-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Here’s your site report — take a quick look on the Info Tab.
                    </h3>
                    <p className="text-gray-600 text-base">
                      You can always view more information in Info Tab
                    </p>
                  </div>
                </div>

                <div className="text-center w-full pt-8 pb-20">
                  <p className="text-gray-600 text-base mb-6">
                    All set? Click{" "}
                    <span className="font-bold text-gray-900">Next</span> to continue.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={onBack}
                      className="bg-white hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-full flex items-center gap-2 border border-gray-300 transition-colors duration-200"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      onClick={onNext}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full flex items-center gap-2 transition-colors duration-200"
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

      {/* Bottom Navigation */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 p-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto flex justify-center gap-4">
          <button
            onClick={onBack}
            className="bg-white hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-full flex items-center gap-2 border border-gray-300 transition-colors duration-200"
          >
            <ArrowLeft size={16} /> Back
          </button>
          {showSummary && (
            <button
              onClick={onNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full flex items-center gap-2 transition-colors duration-200"
            >
              Next <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
