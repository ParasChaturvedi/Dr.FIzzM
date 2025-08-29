"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, ChevronDown, Plus } from "lucide-react";

export default function StepSlide3({ onNext, onBack, onLanguageLocationSubmit }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [addedSelections, setAddedSelections] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const containerRef = useRef(null);
  const lastSubmittedData = useRef(null);

  const languages = [
    "English","Spanish","French","German","Italian","Portuguese",
    "Chinese (Mandarin)","Japanese","Korean","Hindi","Bengali","Russian",
    "Arabic","Turkish","Vietnamese","Polish","Persian","Dutch","Thai",
    "Swedish","Norwegian","Finnish","Danish","Czech","Hungarian","Greek",
    "Romanian","Ukrainian","Hebrew","Malay/Indonesian","Filipino/Tagalog"
  ];
  const locations = [
    "United States","Canada","Mexico",
    "United Kingdom","Germany","France","Italy","Spain","Netherlands",
    "Sweden","Norway","Denmark","Finland","Poland","Czech Republic","Switzerland",
    "Belgium","Austria","Ireland","Portugal","Greece","Russia","Ukraine",
    "Romania","Hungary","China","India","Japan","South Korea",
    "Singapore","Hong Kong","Taiwan","Indonesia","Malaysia","Thailand",
    "Vietnam","Philippines","Israel","Turkey","United Arab Emirates",
    "Saudi Arabia","Qatar","South Africa","Egypt","Nigeria","Morocco",
    "Kenya","Australia","New Zealand","Brazil","Argentina","Chile",
    "Colombia","Peru",
    // Region/city examples
    "Bangalore","Mumbai","Delhi","California","New York","London","Paris","Berlin"
  ];

  // Add either selected or default "Other"
  const handleAdd = () => {
    const lang = selectedLanguage || "Other";
    const loc  = selectedLocation  || "Other";
    const entry = { language: lang, location: loc, id: Date.now() };
    setAddedSelections([...addedSelections, entry]);
    setSelectedLanguage("");
    setSelectedLocation("");
    if (addedSelections.length === 0) setShowSummary(true);
  };

  useEffect(() => {
    if (addedSelections.length) {
      const payload = { selections: addedSelections };
      const curr = JSON.stringify(payload);
      if (curr !== JSON.stringify(lastSubmittedData.current)) {
        lastSubmittedData.current = payload;
        onLanguageLocationSubmit?.(payload);
      }
      setShowSummary(true);
    } else {
      setShowSummary(false);
    }
  }, [addedSelections, onLanguageLocationSubmit]);

  useEffect(() => {
    if (containerRef.current) {
      setTimeout(() => containerRef.current.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  }, [showSummary]);

  const handleDropdownToggle = (d) => setOpenDropdown(openDropdown === d ? null : d);
  const handleSelect = (d, v) => {
    if (d === "lang") setSelectedLanguage(v);
    else setSelectedLocation(v);
    setOpenDropdown(null);
  };
  const resetAll = () => {
    setAddedSelections([]);
    lastSubmittedData.current = null;
    setShowSummary(false);
  };

  useEffect(() => {
    const onClick = (e) => { if (!e.target.closest(".dropdown-container")) setOpenDropdown(null); };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`div::-webkit-scrollbar{display:none}`}</style>
        <div className="min-h-full py-12 px-8 pb-96">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="text-gray-500 text-sm font-medium">Step - 3</div>
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl font-bold text-gray-900">
                Select the languages and locations relevant to your business
              </h1>
              <p className="text-gray-600 text-lg">
                Choose your language & business locations. Select at least one country to localise your analysis.
              </p>
            </div>

            {addedSelections.length > 0 && (
              <div className="w-full flex justify-end mb-4">
                <div className="space-y-2">
                  {addedSelections.map(s => (
                    <div key={s.id} className="bg-white rounded-lg p-4 shadow-sm border max-w-xs relative">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700"><span className="font-medium">Language:</span> {s.language}</div>
                        <div className="text-sm text-gray-700"><span className="font-medium">Location:</span> {s.location}</div>
                      </div>
                      <ChevronDown size={16} className="absolute top-4 right-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!showSummary && (
              <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-4xl relative pb-80">
                <div className="relative dropdown-container overflow-visible" style={{ zIndex: openDropdown==="lang"?1000:1 }}>
                  <button
                    onClick={()=>handleDropdownToggle("lang")}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between min-w-48 hover:border-gray-400 transition-colors"
                  >
                    <span className={selectedLanguage?"text-gray-900":"text-gray-500"}>{selectedLanguage||"Select Language"}</span>
                    <ChevronDown size={20} className={`ml-2 transform ${openDropdown==="lang"?"rotate-180":""}`} />
                  </button>
                  {openDropdown==="lang" && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-2xl max-h-64 overflow-y-auto">
                      {languages.map(l=>(
                        <button key={l} onClick={()=>handleSelect("lang",l)}
                          className="w-full text-left px-4 py-3 text-gray-900 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors focus:outline-none focus:bg-blue-100">
                          {l}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative dropdown-container overflow-visible" style={{ zIndex: openDropdown==="loc"?1000:1 }}>
                  <button
                    onClick={()=>handleDropdownToggle("loc")}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between min-w-48 hover:border-gray-400 transition-colors"
                  >
                    <span className={selectedLocation?"text-gray-900":"text-gray-500"}>{selectedLocation||"Select Location"}</span>
                    <ChevronDown size={20} className={`ml-2 transform ${openDropdown==="loc"?"rotate-180":""}`} />
                  </button>
                  {openDropdown==="loc" && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-2xl max-h-64 overflow-y-auto">
                      {locations.map(c=>(
                        <button key={c} onClick={()=>handleSelect("loc",c)}
                          className="w-full text-left px-4 py-3 text-gray-900 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors focus:outline-none focus:bg-blue-100">
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleAdd}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center gap-2 transition-colors"
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>
            )}

            {showSummary && (
              <>
                <div className="text-center space-y-6 w-full pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Here&apos;s your site report — take a quick look on the Info Tab.
                  </h3>
                  <p className="text-gray-600">If not, Want to do some changes?</p>
                  <div className="flex gap-8 justify-center text-base">
                    <button onClick={resetAll} className="text-gray-700 hover:text-gray-900">NO</button>
                    <button onClick={resetAll} className="text-blue-600 hover:text-blue-800">YES!</button>
                  </div>
                </div>
                <div className="text-center w-full pt-8 pb-20">
                  <p className="text-gray-600 mb-6">
                    All set? Click <span className="font-bold text-gray-900">Next</span> to continue.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button onClick={onBack} className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full flex items-center gap-2 border border-gray-300">
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button onClick={onNext} className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full flex items-center gap-2">
                      Next <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div className="flex-shrink-0 bg-gray-100 border-t border-gray-200 p-6">
        <div className="max-w-4xl mx-auto flex justify-center gap-4">
          <button onClick={onBack} className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full flex items-center gap-2 border border-gray-300">
            <ArrowLeft size={16} /> Back
          </button>
          {showSummary && (
            <button onClick={onNext} className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full flex items-center gap-2">
              Next <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
