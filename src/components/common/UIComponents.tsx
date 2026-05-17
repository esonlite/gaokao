import React from 'react';
import { GraduationCap, Brain, BookOpen, Target, TrendingUp, ChevronRight, ChevronLeft } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: { id: number; name: string; icon: React.ReactNode }[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-center mb-8 overflow-x-auto">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center flex-shrink-0">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                transition-all duration-300
                ${currentStep >= step.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-gray-100 text-gray-400'}
              `}
            >
              {step.icon}
            </div>
            <span
              className={`ml-2 text-sm font-medium hidden sm:inline
                ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}
            >
              {step.name}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-8 sm:w-16 h-1 mx-1 sm:mx-2 rounded transition-all duration-300 flex-shrink-0
                ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const stepConfig = [
  { id: 1, name: '基本信息', icon: <GraduationCap size={20} /> },
  { id: 2, name: '兴趣目标', icon: <Brain size={20} /> },
  { id: 3, name: '专业选择', icon: <BookOpen size={20} /> },
  { id: 4, name: '院校推荐', icon: <Target size={20} /> },
  { id: 5, name: '生成方案', icon: <TrendingUp size={20} /> }
];

export const NavigationButtons: React.FC<{
  onPrev?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}> = ({ onPrev, onNext, nextLabel = '下一步', prevDisabled = false, nextDisabled = false }) => {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t">
      {onPrev && (
        <button
          onClick={onPrev}
          disabled={prevDisabled}
          className={`
            flex items-center px-5 py-2.5 rounded-lg font-medium transition-all
            ${prevDisabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400'}
          `}
        >
          <ChevronLeft size={18} className="mr-1" />
          上一步
        </button>
      )}
      {onNext && (
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className={`
            flex items-center px-6 py-2.5 rounded-lg font-medium text-white transition-all ml-auto
            ${nextDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-200'}
          `}
        >
          {nextLabel}
          <ChevronRight size={18} className="ml-1" />
        </button>
      )}
    </div>
  );
};

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}> = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm border border-gray-100 p-5
        ${hover ? 'hover:shadow-md transition-shadow' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const Badge: React.FC<{
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple';
}> = ({ children, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
    red: 'bg-red-100 text-red-700',
    purple: 'bg-purple-100 text-purple-700'
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {children}
    </span>
  );
};

export const ProgressBar: React.FC<{
  value: number;
  max?: number;
  color?: string;
}> = ({ value, max = 100, color = 'bg-blue-600' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`${color} h-2.5 rounded-full transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = '加载中...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}> = ({ icon, title, description, action }) => {
  return (
    <div className="text-center py-12">
      {icon && <div className="text-gray-300 mb-4 flex justify-center">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {description && <p className="mt-2 text-gray-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};