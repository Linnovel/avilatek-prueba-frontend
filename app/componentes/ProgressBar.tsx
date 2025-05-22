import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex justify-center items-center w-full max-w-lg mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold
              ${currentStep === index + 1 ? "bg-blue-600" : "bg-gray-400"}
              ${currentStep > index + 1 ? "bg-green-500" : ""}
            `}
          >
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`flex-grow h-1 mx-2
                ${currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"}
              `}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
