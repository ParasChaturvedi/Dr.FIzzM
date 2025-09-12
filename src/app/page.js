"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Steps from "./components/Steps";
import Step1Slide1 from "./components/Step1Slide1";
import StepSlide2 from "./components/StepSlide2";
import StepSlide3 from "./components/StepSlide3";
import StepSlide4 from "./components/StepSlide4";
import StepSlide5 from "./components/StepSlide5";
import Step5Slide2 from "./components/Step5Slide2"; // ⬅️ NEW
import InfoPanel from "./components/InfoPanel";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  // currentStep can be 1..5 or "5b" (the final full-width slide)
  const [currentStep, setCurrentStep] = useState(1);

  const [websiteData, setWebsiteData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [languageLocationData, setLanguageLocationData] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [competitorData, setCompetitorData] = useState(null);

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
    if (currentStep === 5) {
      // Jump to the full-width summary slide
      setCurrentStep("5b");
      return;
    }
    if (typeof currentStep === "number" && currentStep < 5) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep === "5b") {
      setCurrentStep(5);
      return;
    }
    if (typeof currentStep === "number" && currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleWebsiteSubmit = useCallback((website) => {
    let cleanWebsite = website.toLowerCase();
    if (cleanWebsite.startsWith("http://")) cleanWebsite = cleanWebsite.replace("http://", "");
    if (cleanWebsite.startsWith("https://")) cleanWebsite = cleanWebsite.replace("https://", "");
    if (cleanWebsite.startsWith("www.")) cleanWebsite = cleanWebsite.replace("www.", "");
    setWebsiteData({ website: cleanWebsite, submittedAt: new Date() });
  }, []);

  const handleBusinessDataSubmit = useCallback((business) => {
    setBusinessData(business);
  }, []);

  const handleLanguageLocationSubmit = useCallback((data) => {
    setLanguageLocationData(data);
  }, []);

  const handleKeywordSubmit = useCallback((data) => {
    setSelectedKeywords(data.keywords);
  }, []);

  const handleCompetitorSubmit = useCallback((data) => {
    setCompetitorData(
      data || { businessCompetitors: [], searchCompetitors: [], totalCompetitors: [] }
    );
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
        return (
          <StepSlide4
            onNext={handleNextStep}
            onBack={handleBackStep}
            onKeywordSubmit={handleKeywordSubmit}
          />
        );
      case 5:
        return (
          <StepSlide5
            onNext={handleNextStep}
            onBack={handleBackStep}
            onCompetitorSubmit={handleCompetitorSubmit}
          />
        );
      case "5b":
        return (
          <Step5Slide2
            onBack={() => setCurrentStep(5)}
            onDashboard={() => console.log("Go to Dashboard")}
            businessData={businessData}
            languageLocationData={languageLocationData}
            keywordData={selectedKeywords}
            competitorData={competitorData}
          />
        );
      default:
        return <Step1Slide1 onNext={handleNextStep} onWebsiteSubmit={handleWebsiteSubmit} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#e5e7eb] overflow-hidden relative p-3 pl-0">
      <Sidebar
        onInfoClick={() => {
          if (isPinned) return;
          setIsInfoOpen((prev) => !prev);
        }}
          infoActive={isInfoOpen || isPinned}
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
        currentStep={currentStep === "5b" ? 5 : currentStep}
        onClose={() => setIsInfoOpen(false)}
      />

      <ThemeToggle />

      <main
        className={`flex-1 h-screen bg-[#e5e7eb] transition-all duration-300 ${
          isInfoOpen || isPinned ? "ml-[400px]" : "ml-[40px]"
        }`}
      >
        {/* Hide the top stepper on the 5b (summary) page */}
        {currentStep !== "5b" && (
          <div className="w-full bg-gray-100 py-6 flex justify-center border-b border-gray-200">
            <Steps currentStep={currentStep === "5b" ? 5 : currentStep} />
          </div>
        )}

        <div className="flex-1 bg-gray-100 flex items-stretch justify-center overflow-hidden">
          <div className="w-full h-full">{renderCurrentStep()}</div>
        </div>
      </main>
    </div>
  );
}
