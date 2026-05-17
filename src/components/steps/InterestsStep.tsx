import React from 'react';
import { Brain, Target, Globe, Briefcase, BookOpen, Heart, Hammer, Code, BarChart3, Cpu, Settings, TrendingUp, Scale, Leaf, Truck, Tv } from 'lucide-react';
import { interestOptions, careerGoals } from '../../data/mockData';

interface InterestsStepProps {
  selectedInterests: string[];
  setSelectedInterests: (interests: string[]) => void;
  selectedCareerGoals: string[];
  setSelectedCareerGoals: (goals: string[]) => void;
  planToFurtherStudy: boolean;
  setPlanToFurtherStudy: (plan: boolean) => void;
  planToAbroad: boolean;
  setPlanToAbroad: (plan: boolean) => void;
}

const iconMap: { [key: string]: React.ReactNode } = {
  'brain': <Brain size={20} />,
  'code': <Code size={20} />,
  'bar-chart': <BarChart3 size={20} />,
  'cpu': <Cpu size={20} />,
  'settings': <Settings size={20} />,
  'trending-up': <TrendingUp size={20} />,
  'briefcase': <Briefcase size={20} />,
  'heart': <Heart size={20} />,
  'scale': <Scale size={20} />,
  'book-open': <BookOpen size={20} />,
  'home': <Globe size={20} />,
  'tv': <Tv size={20} />,
  'globe': <Globe size={20} />,
  'flask-conical': <Hammer size={20} />,
  'truck': <Truck size={20} />,
  'leaf': <Leaf size={20} />
};

export const InterestsStep: React.FC<InterestsStepProps> = ({
  selectedInterests,
  setSelectedInterests,
  selectedCareerGoals,
  setSelectedCareerGoals,
  planToFurtherStudy,
  setPlanToFurtherStudy,
  planToAbroad,
  setPlanToAbroad
}) => {
  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const toggleCareerGoal = (id: string) => {
    if (selectedCareerGoals.includes(id)) {
      setSelectedCareerGoals(selectedCareerGoals.filter(g => g !== id));
    } else if (selectedCareerGoals.length < 3) {
      setSelectedCareerGoals([...selectedCareerGoals, id]);
    }
  };

  return (
    <div className="space-y-8">
      {/* 标题区域 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg shadow-purple-200">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">兴趣与目标</h2>
        <p className="text-gray-500 mt-2">选择您感兴趣的方向和职业规划，帮助系统更精准地推荐</p>
      </div>

      {/* 兴趣选择 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold text-gray-700">
            选择感兴趣的领域
            <span className="ml-2 text-xs text-gray-400">(最多选择5个)</span>
          </label>
          <span className="text-xs text-blue-600">
            已选择 {selectedInterests.length}/5
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {interestOptions.map((interest) => {
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                disabled={!isSelected && selectedInterests.length >= 5}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-200 text-left
                  ${isSelected
                    ? 'border-purple-500 bg-purple-50 shadow-md shadow-purple-100'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'}
                  ${!isSelected && selectedInterests.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center mb-2
                  ${isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  {iconMap[interest.icon]}
                </div>
                <div className={`text-sm font-medium ${isSelected ? 'text-purple-900' : 'text-gray-700'}`}>
                  {interest.name}
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 职业规划 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold text-gray-700">
            职业发展方向
            <span className="ml-2 text-xs text-gray-400">(最多选择3个)</span>
          </label>
          <span className="text-xs text-purple-600">
            已选择 {selectedCareerGoals.length}/3
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {careerGoals.map((goal) => {
            const isSelected = selectedCareerGoals.includes(goal.id);
            return (
              <button
                key={goal.id}
                onClick={() => toggleCareerGoal(goal.id)}
                disabled={!isSelected && selectedCareerGoals.length >= 3}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-200 text-left
                  ${isSelected
                    ? 'border-pink-500 bg-pink-50 shadow-md shadow-pink-100'
                    : 'border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-50'}
                  ${!isSelected && selectedCareerGoals.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center mb-2
                  ${isSelected ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  <Target size={20} />
                </div>
                <div className={`text-sm font-medium ${isSelected ? 'text-pink-900' : 'text-gray-700'}`}>
                  {goal.name}
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 深造计划 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <label className="text-sm font-semibold text-gray-700 block mb-4">
          是否有深造计划？
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setPlanToFurtherStudy(!planToFurtherStudy)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200 text-left
              ${planToFurtherStudy
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-purple-300'}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center mr-3
                  ${planToFurtherStudy ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  <BookOpen size={20} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">国内考研</div>
                  <div className="text-xs text-gray-500 mt-1">继续在国内深造读研</div>
                </div>
              </div>
              {planToFurtherStudy && (
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </button>

          <button
            onClick={() => setPlanToAbroad(!planToAbroad)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200 text-left
              ${planToAbroad
                ? 'border-pink-500 bg-pink-50'
                : 'border-gray-200 bg-white hover:border-pink-300'}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center mr-3
                  ${planToAbroad ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  <Globe size={20} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">出国深造</div>
                  <div className="text-xs text-gray-500 mt-1">计划申请海外高校</div>
                </div>
              </div>
              {planToAbroad && (
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          选择深造计划后，系统会优先推荐具有保研资格或国际交流资源丰富的高校
        </p>
      </div>

      {/* 提示信息 */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
        <div className="flex items-start">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">温馨提示</h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              选择兴趣和职业目标可以帮助系统更好地匹配适合您的专业和院校。
              即使暂时没有明确方向，也可以跳过此步骤，系统会根据您的分数提供基础推荐。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};