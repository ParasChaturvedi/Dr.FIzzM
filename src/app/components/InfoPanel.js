"use client";

import { useEffect, useRef } from "react";
import { Pin, PinOff } from "lucide-react";

export default function InfoPanel({
  isOpen,
  onClose,
  isPinned,
  setIsPinned,
  websiteData,
  businessData,
  languageLocationData,
  keywordData = [],
  currentStep,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (isPinned) return;
      if (e.target.closest("#sidebar-info-btn")) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose && onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPinned, onClose]);

  const generateRandomStats = (website) => {
    if (!website) return { domainAuthority: 49, organicTraffic: 72, organicKeyword: 75 };
    const seed = website.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const r1 = (seed * 9301 + 49297) % 233280;
    const r2 = (r1 * 9301 + 49297) % 233280;
    const r3 = (r2 * 9301 + 49297) % 233280;
    return {
      domainAuthority: Math.floor((r1 / 233280) * 100) + 1,
      organicTraffic: Math.floor((r2 / 233280) * 100) + 1,
      organicKeyword: Math.floor((r3 / 233280) * 100) + 1,
    };
  };

  const stats = generateRandomStats(websiteData?.website);
  const displayWebsite = websiteData?.website || "yourcompany.com";

  // STEP 1
  const renderStep1Content = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-600 font-medium">WEBSITE :</div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-800">{displayWebsite}</div>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Good</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            ["Domain Authority", stats.domainAuthority],
            ["Organic Traffic", stats.organicTraffic],
            ["Organic Keyword", stats.organicKeyword],
          ].map(([label, value], idx) => (
            <div
              key={idx}
              className="bg-white px-3 py-3 rounded shadow-sm text-center border"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="text-xl font-bold text-gray-800">{value}</div>
                <div className="text-gray-400">↓</div>
              </div>
              <div className="text-xs text-gray-500 mb-1">{label}</div>
              <div className="text-xs text-gray-400">29</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
          <h4 className="text-sm font-bold text-gray-800">FIX THIS</h4>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-3 mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">
                Domain Authority ({stats.domainAuthority})
              </div>
              <div className="text-xs text-gray-500">Your site trust score (0–100)</div>
              <div className="text-xs text-gray-500 mt-1">
                {stats.domainAuthority} = above average for SMBs
              </div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>
          <button className="mb-3 inline-block bg-yellow-400 text-black text-xs px-3 py-1 rounded font-medium">
            IMPROVE : BUILT QUALITY BACKLINKS
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              DA
            </div>
            <div className="text-sm text-gray-700">How to Build Domain Authority</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">
                Organic Traffic ({stats.organicTraffic})
              </div>
              <div className="text-xs text-gray-500">Monthly visits from free searches.</div>
              <div className="text-xs text-gray-500 mt-1">
                {stats.organicTraffic} = visitors last month.
              </div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>
          <div className="mb-3 inline-block bg-yellow-300 text-black text-xs px-3 py-1 rounded">
            Each organic visitor costs $0 vs $2–5 for ads.
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 rounded bg-green-600 flex items-center justify-center text-white text-xs font-bold">
              TR
            </div>
            <div className="text-sm text-gray-700">Turn Traffic Into Customers</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>
      </div>
    </div>
  );

  // STEP 2
  const renderStep2Content = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-600 font-medium">WEBSITE :</div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-800">{displayWebsite}</div>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Good</span>
          </div>
        </div>
        {businessData && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="space-y-1">
              <div className="text-xs text-gray-600">
                <span className="font-medium">Industry Sector:</span> {businessData.industry}
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-medium">Offering Type:</span> {businessData.offering}
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-medium">Category:</span> {businessData.category}
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 gap-3">
          {[
            ["Domain Authority", stats.domainAuthority],
            ["Organic Traffic", stats.organicTraffic],
            ["Organic Keyword", stats.organicKeyword],
          ].map(([label, value], idx) => (
            <div key={idx} className="bg-white px-3 py-3 rounded shadow-sm text-center border">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="text-xl font-bold text-gray-800">{value}</div>
                <div className="text-gray-400">↓</div>
              </div>
              <div className="text-xs text-gray-500 mb-1">{label}</div>
              <div className="text-xs text-gray-400">29</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
          <h4 className="text-sm font-bold text-gray-800">FIX THIS</h4>
        </div>
        {/* Card 1 */}
        <div className="bg-white rounded-lg border shadow-sm p-3 mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">Why Industry Matters</div>
              <div className="text-xs text-gray-500 mt-1">• Personalized Benchmarks vs. relevant peers</div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>
          <div className="mt-3">
            <div className="text-xs text-gray-600 mb-2">Keyword suggestion</div>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">KEYWORD-1</span>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">KEYWORD-2</span>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">KEYWORD-3</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-8 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              SEO
            </div>
            <div className="text-sm text-gray-700">Industry SEO Strategies</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-lg border shadow-sm p-3 mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">Business Type Impact</div>
              <div className="text-xs text-gray-500 mt-1">• Local vs. national focus</div>
              <div className="text-xs text-gray-500">• Content and customer journey differences</div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-8 rounded bg-green-600 flex items-center justify-center text-white text-xs font-bold">
              DA
            </div>
            <div className="text-sm text-gray-700">How to Build Domain Authority</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-lg border shadow-sm p-3 mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">Competitive Analysis</div>
              <div className="text-xs text-gray-500 mt-1">• Compare with industry leaders</div>
              <div className="text-xs text-gray-500">• Identify content gaps</div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-8 rounded bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
              CA
            </div>
            <div className="text-sm text-gray-700">Competitor Research Tools</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-white rounded-lg border shadow-sm p-3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">Content Strategy</div>
              <div className="text-xs text-gray-500 mt-1">• Industry-specific content ideas</div>
              <div className="text-xs text-gray-500">• Content calendar planning</div>
              <div className="text-xs text-gray-500">• SEO optimization tips</div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-8 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              CS
            </div>
            <div className="text-sm text-gray-700">Content Planning Guide</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>
      </div>
    </div>
  );

  // STEP 3
  const renderStep3Content = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-600 font-medium">WEBSITE :</div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-800">{displayWebsite}</div>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Good</span>
          </div>
        </div>
        {languageLocationData?.selections && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 font-medium mb-2">Language & Location:</div>
            <div className="space-y-1">
              {languageLocationData.selections.map((sel, i) => (
                <div key={i} className="text-xs text-gray-600">
                  <span className="font-medium">{sel.language}</span> - {sel.location}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 gap-3">
          {[
            ["Domain Authority", stats.domainAuthority],
            ["Organic Traffic", stats.organicTraffic],
            ["Organic Keyword", stats.organicKeyword],
          ].map(([label, value], idx) => (
            <div key={idx} className="bg-white px-3 py-3 rounded shadow-sm text-center border">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="text-xl font-bold text-gray-800">{value}</div>
                <div className="text-gray-400">↓</div>
              </div>
              <div className="text-xs text-gray-500 mb-1">{label}</div>
              <div className="text-xs text-gray-400">29</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
          <h4 className="text-sm font-bold text-gray-800">FIX THIS</h4>
        </div>
        {/* Local SEO Power */}
        <div className="bg-white rounded-lg border shadow-sm p-3 mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">Local SEO Power</div>
              <div className="text-xs text-gray-500 mt-1">76% of local searches lead to store visits</div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-8 rounded bg-red-600 flex items-center justify-center text-white text-xs font-bold">
              DA
            </div>
            <div className="text-sm text-gray-700">Dominate Local Search</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>
        {/* Language Strategy */}
        <div className="bg-white rounded-lg border shadow-sm p-3 mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">Language Strategy</div>
              <div className="text-xs text-gray-500 mt-1">• Match customers search language</div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>
          <div className="mb-3 inline-block bg-yellow-300 text-black text-xs px-3 py-1 rounded">
            Less competition in non-English terms
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-8 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              SEO
            </div>
            <div className="text-sm text-gray-700">Multi-Language SEO</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>
        {/* Location Guide */}
        <div className="bg-white rounded-lg border shadow-sm p-3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">Location Guide</div>
              <div className="text-xs text-gray-500 mt-1">• Map service areas</div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-8 rounded bg-green-600 flex items-center justify-center text-white text-xs font-bold">
              LG
            </div>
            <div className="text-sm text-gray-700">Location Optimization</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>
      </div>
      {keywordData.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border mt-4">
          <div className="text-xs text-gray-600 font-medium mb-2">
            Selected Keywords ({keywordData.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {keywordData.map((kw, i) => (
              <span key={i} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // STEP 4 (unchanged if already working)
  const renderStep4Content = () => (
    <div className="space-y-6">
      {/* --- Use your previous Step 4 content here. --- */}
    </div>
  );

  return (
    <div
      ref={panelRef}
      aria-hidden={!isOpen}
      className={
        "fixed left-[80px] top-0 h-screen w-[320px] bg-[#f9fafb] border-r border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out z-40 flex flex-col " +
        (isOpen ? "translate-x-0" : "-translate-x-full")
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-gray-800 rounded-sm" />
          <h3 className="text-lg font-semibold text-gray-800">INFO</h3>
        </div>
        <button
          onClick={() => setIsPinned((p) => !p)}
          className="p-2 text-blue-500 hover:text-blue-700 rounded"
        >
          {isPinned ? <PinOff size={18} /> : <Pin size={18} />}
        </button>
      </div>
      {/* Body */}
      <div
        className="flex-1 overflow-y-auto p-4 bg-[#f9fafb]"
        style={{ height: "calc(100vh - 60px)", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`div::-webkit-scrollbar{display:none}`}</style>
        {currentStep === 1
          ? renderStep1Content()
          : currentStep === 2
          ? renderStep2Content()
          : currentStep === 3
          ? renderStep3Content()
          : renderStep4Content()}
      </div>
    </div>
  );
}
