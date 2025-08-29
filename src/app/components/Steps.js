"use client";

export default function Steps({ currentStep }) {
  const steps = [
    { id: 1, label: "Add Website" },
    { id: 2, label: "Add Business" },
    { id: 3, label: "Lang & Loc" },
    { id: 4, label: "Add Keywords" },
    { id: 5, label: "Competition" },
  ];

  return (
    <div className="flex items-center justify-center space-x-6 mt-4 mb-6">
      {steps.map((step) => (
        <div
          key={step.id}
          className="flex flex-col gap-4 items-center space-x-2"
        >
          {/* Step Circle */}
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold
              ${currentStep === step.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"}
            `}
          >
            {step.id}
          </div>

          {/* Step Label */}
          <span
            className={`text-sm ${
              currentStep === step.id ? "text-gray-900 font-medium" : "text-gray-500"
            }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
