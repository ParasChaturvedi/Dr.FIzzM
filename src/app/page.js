"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Steps from "./components/Steps";
import Step1Slide1 from "./components/Step1Slide1";
import StepSlide2 from "./components/StepSlide2";
import StepSlide3 from "./components/StepSlide3";
import StepSlide4 from "./components/StepSlide4";
import StepSlide5 from "./components/StepSlide5";
import InfoPanel from "./components/InfoPanel";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [websiteData, setWebsiteData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [languageLocationData, setLanguageLocationData] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [competitorData, setCompetitorData] = useState(null); // store full payload now

  const infoRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        infoRef.current &&
        !infoRef.current.contains(event.target) &&
        !event.target.closest("#sidebar-info-btn") &&
        !isPinned
      ) {
        setIsInfoOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPinned]);

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleWebsiteSubmit = useCallback((website) => {
    let cleanWebsite = website.toLowerCase();
    if (cleanWebsite.startsWith("http://")) {
      cleanWebsite = cleanWebsite.replace("http://", "");
    }
    if (cleanWebsite.startsWith("https://")) {
      cleanWebsite = cleanWebsite.replace("https://", "");
    }
    if (cleanWebsite.startsWith("www.")) {
      cleanWebsite = cleanWebsite.replace("www.", "");
    }

    setWebsiteData({
      website: cleanWebsite,
      submittedAt: new Date(),
    });
  }, []);

  const handleBusinessDataSubmit = useCallback((business) => {
    setBusinessData(business);
  }, []);

  const handleLanguageLocationSubmit = useCallback((data) => {
    setLanguageLocationData(data);
  }, []);

  const handleKeywordSubmit = useCallback((data) => {
    console.log("Keywords received from StepSlide4:", data.keywords);
    setSelectedKeywords(data.keywords);
  }, []);

  // ⬇️ Store the FULL competitor payload so InfoPanel can show both groups
  const handleCompetitorSubmit = useCallback((data) => {
    console.log("Competitors received from StepSlide5:", data);
    setCompetitorData(data || { businessCompetitors: [], searchCompetitors: [], totalCompetitors: [] });
  }, []);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Slide1 onNext={handleNextStep} onWebsiteSubmit={handleWebsiteSubmit} />;
      case 2:
        return (
          <StepSlide2
            onNext={handleNextStep}
            onBack={handleBackStep}
            onBusinessDataSubmit={handleBusinessDataSubmit}
          />
        );
      case 3:
        return (
          <StepSlide3
            onNext={handleNextStep}
            onBack={handleBackStep}
            onLanguageLocationSubmit={handleLanguageLocationSubmit}
          />
        );
      case 4:
        return <StepSlide4 onNext={handleNextStep} onBack={handleBackStep} onKeywordSubmit={handleKeywordSubmit} />;
      case 5:
        return (
          <StepSlide5
            onNext={handleNextStep}
            onBack={handleBackStep}
            onCompetitorSubmit={handleCompetitorSubmit}
          />
        );
      default:
        return <Step1Slide1 onNext={handleNextStep} onWebsiteSubmit={handleWebsiteSubmit} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      <Sidebar
        onInfoClick={() => {
          if (isPinned) return;
          setIsInfoOpen((prev) => !prev);
        }}
      />

      <InfoPanel
        ref={infoRef}
        isOpen={isInfoOpen}
        isPinned={isPinned}
        setIsPinned={setIsPinned}
        websiteData={websiteData}
        businessData={businessData}
        languageLocationData={languageLocationData}
        keywordData={selectedKeywords}
        competitorData={competitorData}       
        currentStep={currentStep}
        onClose={() => setIsInfoOpen(false)}
      />

      <ThemeToggle />

      <main
        className={`flex-1 h-screen bg-gray-100 transition-all duration-300 ${
          isInfoOpen || isPinned ? "ml-[400px]" : "ml-[80px]"
        }`}
      >
        <div className="w-full bg-gray-100 py-6 flex justify-center border-b border-gray-200">
          <Steps currentStep={currentStep} />
        </div>

        <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">{renderCurrentStep()}</div>
        </div>
      </main>
    </div>
  );
}
