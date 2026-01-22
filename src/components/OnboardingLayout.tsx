import React, { ReactNode } from 'react';
import { useAppSelector } from '@/store';
import { StepIndicator } from './shared';

interface OnboardingLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children, title, description }) => {
  const { currentStep } = useAppSelector((state) => state.onboarding);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Onboarding</h1>
          <p className="text-center text-gray-600">Complete your profile setup</p>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={3} />

        <div className="bg-white rounded-lg shadow-xl p-8 mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            {description && <p className="text-gray-600">{description}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
