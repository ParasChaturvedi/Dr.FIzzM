"use client";
import { useState } from "react";
import StepSlide4 from "./StepSlide4";
import InfoPanel from "./InfoPanel";

export default function ParentComponent() {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [currentStep, setCurrentStep] = useState(4);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(true);
  const [isPinned, setIsPinned] = useState(false);

  // Handle keyword submission from StepSlide4
  const handleKeywordSubmit = (data) => {
    console.log("Keywords received from StepSlide4:", data.keywords);
    setSelectedKeywords(data.keywords);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="relative">
      <StepSlide4
        onNext={handleNext}
        onBack={handleBack}
        onKeywordSubmit={handleKeywordSubmit}
      />
      
      <InfoPanel
        isOpen={isInfoPanelOpen}
        onClose={() => setIsInfoPanelOpen(false)}
        isPinned={isPinned}
        setIsPinned={setIsPinned}
        websiteData={{ website: "hola.com" }}
        businessData={null}
        languageLocationData={null}
        keywordData={selectedKeywords} // This is the key line!
        currentStep={currentStep}
      />
    </div>
  );
}
