import React, { useState, useMemo } from 'react';
import { StepIndicator, stepConfig, NavigationButtons } from './components/common/UIComponents';
import { BasicInfoStep } from './components/steps/BasicInfoStep';
import { InterestsStep } from './components/steps/InterestsStep';
import { MajorSelectionStep } from './components/steps/MajorSelectionStep';
import { RecommendationStep } from './components/steps/RecommendationStep';
import { ResultStep } from './components/steps/ResultStep';
import { classifyUniversitiesByStrategy } from './utils/calculation';
import { RecommendedUniversity } from './data/mockData';

type SubjectType = 'liberal' | 'science' | null;

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  // 步骤1: 基本信息
  const [subjectType, setSubjectType] = useState<SubjectType>(null);
  const [rank, setRank] = useState('');
  const [province, setProvince] = useState('');

  // 步骤2: 兴趣与目标
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedCareerGoals, setSelectedCareerGoals] = useState<string[]>([]);
  const [planToFurtherStudy, setPlanToFurtherStudy] = useState(false);
  const [planToAbroad, setPlanToAbroad] = useState(false);

  // 步骤3: 专业选择
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);

  // 步骤4: 院校推荐结果
  const [selectedUniversities, setSelectedUniversities] = useState<RecommendedUniversity[]>([]);

  // 步骤5: 最终方案
  const [finalList, setFinalList] = useState<RecommendedUniversity[]>([]);

  // 计算推荐结果 - 根据选择的专业和兴趣筛选
  const recommendations = useMemo(() => {
    if (subjectType && rank) {
      return classifyUniversitiesByStrategy(subjectType, parseInt(rank));
    }
    return { shock: [], stable: [], safe: [] };
  }, [subjectType, rank]);

  // 验证步骤完成情况
  const canProceedStep1 = subjectType !== null && rank !== '' && province !== '';
  const canProceedStep2 = true; // 兴趣选择为可选
  const canProceedStep3 = true; // 专业选择为可选（跳过后使用默认推荐）
  const canProceedStep4 = selectedUniversities.length > 0;

  // 处理添加院校
  const handleSelectUniversity = (university: RecommendedUniversity) => {
    if (!selectedUniversities.some(s => s.university.id === university.university.id)) {
      setSelectedUniversities([...selectedUniversities, university]);
    }
  };

  // 处理下一步
  const handleNext = () => {
    if (currentStep < 5) {
      if (currentStep === 4) {
        // 生成最终方案
        setFinalList([...selectedUniversities]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  // 处理上一步
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 重置流程
  const handleReset = () => {
    setCurrentStep(1);
    setSubjectType(null);
    setRank('');
    setProvince('');
    setSelectedInterests([]);
    setSelectedCareerGoals([]);
    setPlanToFurtherStudy(false);
    setPlanToAbroad(false);
    setSelectedMajors([]);
    setSelectedUniversities([]);
    setFinalList([]);
  };

  // 获取下一步按钮的禁用状态
  const getNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return !canProceedStep1;
      case 2:
        return !canProceedStep2;
      case 3:
        return !canProceedStep3;
      case 4:
        return !canProceedStep4;
      default:
        return true;
    }
  };

  // 获取下一步按钮的文字
  const getNextLabel = () => {
    switch (currentStep) {
      case 3:
        return '查看推荐';
      case 4:
        return '生成方案';
      default:
        return '下一步';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 顶部背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 -z-10" />
      <div className="absolute top-0 left-0 w-full h-64 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            高考志愿智能填报系统
          </h1>
          <p className="text-blue-100 text-sm md:text-base">
            基于您的成绩、兴趣和专业偏好，智能推荐最适合的院校和专业
          </p>
        </div>

        {/* 步骤指示器 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <StepIndicator currentStep={currentStep} steps={stepConfig} />

          {/* 步骤内容 */}
          <div className="min-h-[500px]">
            {currentStep === 1 && (
              <BasicInfoStep
                subjectType={subjectType}
                setSubjectType={setSubjectType}
                rank={rank}
                setRank={setRank}
                province={province}
                setProvince={setProvince}
              />
            )}

            {currentStep === 2 && (
              <InterestsStep
                selectedInterests={selectedInterests}
                setSelectedInterests={setSelectedInterests}
                selectedCareerGoals={selectedCareerGoals}
                setSelectedCareerGoals={setSelectedCareerGoals}
                planToFurtherStudy={planToFurtherStudy}
                setPlanToFurtherStudy={setPlanToFurtherStudy}
                planToAbroad={planToAbroad}
                setPlanToAbroad={setPlanToAbroad}
              />
            )}

            {currentStep === 3 && (
              <MajorSelectionStep
                selectedMajors={selectedMajors}
                setSelectedMajors={setSelectedMajors}
              />
            )}

            {currentStep === 4 && (
              <RecommendationStep
                recommendations={recommendations}
                onSelectUniversity={handleSelectUniversity}
                selectedUniversities={selectedUniversities}
              />
            )}

            {currentStep === 5 && (
              <ResultStep
                selectedUniversities={finalList}
                userProfile={{ subjectType, rank, province }}
              />
            )}
          </div>

          {/* 导航按钮 */}
          {currentStep < 5 && (
            <NavigationButtons
              onPrev={currentStep > 1 ? handlePrev : undefined}
              onNext={handleNext}
              nextLabel={getNextLabel()}
              prevDisabled={currentStep === 1}
              nextDisabled={getNextDisabled()}
            />
          )}

          {currentStep === 5 && (
            <div className="flex justify-center mt-6 pt-6 border-t">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200 font-medium"
              >
                重新开始
              </button>
            </div>
          )}
        </div>

        {/* 底部信息 */}
        <div className="text-center text-white/60 text-sm mt-6">
          <p>数据仅供参考，请以各高校官方公布信息为准</p>
          <p className="mt-1">祝各位考生都能被理想大学录取！</p>
        </div>
      </div>

      {/* 右侧装饰 */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10" />
      <div className="fixed right-20 top-1/3 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl -z-10" />
    </div>
  );
}

export default App;