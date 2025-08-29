"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function Step1Slide1({ onNext, onWebsiteSubmit }) {
  const [site, setSite] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentState, setCurrentState] = useState("initial");
  const [error, setError] = useState("");
  const [wavePhase, setWavePhase] = useState(0);
  const [isShaking, setIsShaking] = useState(true);
  const [showInput, setShowInput] = useState(true);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  // Website validation function
  const isValidWebsite = (url) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/.*)?$/;
    return urlPattern.test(url);
  };

  // Hand wave animation - fast shake then pause cycle
  useEffect(() => {
    if (currentState === "initial") {
      let waveInterval;
      let cycleTimeout;

      const startShakeCycle = () => {
        setIsShaking(true);
        setWavePhase(0);
        
        waveInterval = setInterval(() => {
          setWavePhase((prev) => (prev + 1) % 8);
        }, 100);

        cycleTimeout = setTimeout(() => {
          clearInterval(waveInterval);
          setIsShaking(false);
          setWavePhase(0);

          setTimeout(startShakeCycle, 1000);
        }, 800);
      };

      startShakeCycle();

      return () => {
        clearInterval(waveInterval);
        clearTimeout(cycleTimeout);
      };
    }
  }, [currentState]);

  const getWaveRotation = () => {
    if (!isShaking) return 0;
    
    switch (wavePhase % 4) {
      case 0: return 0;
      case 1: return -30;
      case 2: return 0;
      case 3: return 30;
      default: return 0;
    }
  };

  // Auto scroll to top when new content arrives
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [currentState, messages]);

  const handleSend = () => {
    if (!site.trim()) return;
    
    if (!isValidWebsite(site.trim())) {
      setError("Please enter a valid website URL (e.g., company.com or http://company.com)");
      return;
    }

    setError("");
    
    const displayUrl = site.trim().startsWith('http') ? site.trim() : `https://${site.trim()}`;
    setMessages([displayUrl]);
    
    setShowInput(false);
    
    setTimeout(() => {
      setCurrentState("submitted");
    }, 500);
    
    if (onWebsiteSubmit) {
      onWebsiteSubmit(site.trim());
    }
    
    setSite("");
  };

  const handleNext = () => {
    if (onNext) onNext();
  };

  const handleTryDifferent = () => {
    setCurrentState("initial");
    setMessages([]);
    setError("");
    setSite("");
    setShowInput(true);
  };

  const handleNo = () => {
    setCurrentState("confirmed");
    setShowInput(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-100">
      {/* Main Content Area - Takes most space */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        <div className="min-h-full flex flex-col items-center justify-center py-6 px-8">
          {/* Content Container */}
          <div 
            ref={contentRef}
            className="flex flex-col items-center text-center space-y-8 max-w-md w-full"
          >
            
            {/* Hand Emoji + Hello - FAST SHAKE + PAUSE CYCLE */}
            {currentState === "initial" && (
              <div className="flex flex-col items-center space-y-2">
                <div 
                  className={`text-7xl transition-transform ${
                    isShaking ? 'duration-100 ease-linear' : 'duration-300 ease-out'
                  }`}
                  style={{ 
                    transform: `rotate(${getWaveRotation()}deg) ${
                      isShaking && (wavePhase % 2 === 1) ? 'scale(1.1)' : 'scale(1)'
                    }`,
                    transformOrigin: 'bottom center',
                  }}
                >
                  ✋
                </div>
                <h2 className="text-2xl font-medium text-gray-600">Hello!!!</h2>
              </div>
            )}

            {/* Welcome Box */}
            <div className="bg-white shadow-md rounded-xl p-6 text-left w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Welcome, Sam!</h3>
              <p className="text-gray-700 text-base leading-relaxed mb-2">
                Add your first project by entering your website and I&apos;ll build a live{" "}
                <span className="font-bold text-gray-900">SEO dashboard</span> for you.
              </p>
              <p className="text-gray-400 text-sm">
                For more information please ! Go to <span className="font-bold text-gray-600">DASHBOARD</span> & click{" "}
                <span className="font-bold text-gray-600">INFO</span> tab
              </p>
            </div>

            {/* Chat Messages - Website bubble */}
            {messages.length > 0 && (
              <div className="w-full space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className="flex justify-end">
                    <div className="bg-gray-300 text-gray-900 px-6 py-3 rounded-2xl text-base font-medium max-w-xs shadow-sm">
                      {msg}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* System Response */}
            {currentState === "submitted" && (
              <div className="text-center space-y-8 w-full">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    Here&apos;s your site report — take a quick look on the Info Tab.
                  </h3>
                  <p className="text-gray-600 text-base mb-8">
                    If not, you can also try a different URL?
                  </p>
                </div>
                
                <div className="flex gap-12 justify-center text-base">
                  <button 
                    onClick={handleNo}
                    className="px-0 py-3 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    NO
                  </button>
                  <button 
                    onClick={handleTryDifferent}
                    className="px-0 py-3 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    YES, Try different URL!
                  </button>
                </div>
              </div>
            )}

            {/* Next Button Section */}
            {(currentState === "submitted" || currentState === "confirmed") && (
              <div className="text-center space-y-6 w-full pt-12">
                <p className="text-gray-600 text-base">
                  All set? Click <span className="font-bold text-gray-900">Next</span> to continue.
                </p>
                <button
                  onClick={handleNext}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full text-base font-medium flex items-center gap-3 mx-auto transition-colors shadow-lg"
                >
                  Next <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Box - ALWAYS VISIBLE when showInput is true */}
      {showInput && (
        <div className="flex-shrink-0 bg-gray-100 border-t border-gray-200">
          <div className="p-6">
            <div className="max-w-md mx-auto">
              <div className="flex items-center bg-white shadow-xl rounded-full px-6 py-4 w-full border border-gray-200">
                <input
                  type="text"
                  placeholder="Add Site : eg. (http://company.com)"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                  className="flex-1 outline-none text-base text-gray-700 bg-transparent placeholder-gray-500"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  className="text-gray-500 hover:text-gray-700 p-2 transition-colors"
                  onClick={handleSend}
                >
                  <ArrowRight size={24} />
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center px-4 mt-2">{error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
