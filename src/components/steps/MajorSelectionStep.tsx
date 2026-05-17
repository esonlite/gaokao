import React from 'react';
import { GraduationCap, BookOpen, Code, Stethoscope, Scale, Building, TrendingUp, Microscope } from 'lucide-react';
import { mockMajors } from '../../data/mockData';

interface MajorSelectionStepProps {
  selectedMajors: string[];
  setSelectedMajors: (majors: string[]) => void;
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  '计算机类': <Code size={20} />,
  '电子信息类': <BookOpen size={20} />,
  '机械类': <Building size={20} />,
  '经济管理类': <TrendingUp size={20} />,
  '医学类': <Stethoscope size={20} />,
  '法学类': <Scale size={20} />,
  '建筑类': <Building size={20} />,
  '交通运输类': <BookOpen size={20} />,
  '教育类': <GraduationCap size={20} />,
  '文学类': <BookOpen size={20} />,
  '航空航天类': <Microscope size={20} />,
  '材料类': <Microscope size={20} />,
};

export const MajorSelectionStep: React.FC<MajorSelectionStepProps> = ({
  selectedMajors,
  setSelectedMajors
}) => {
  // 按类别分组专业
  const majorsByCategory = mockMajors.reduce((acc, major) => {
    if (!acc[major.category]) {
      acc[major.category] = [];
    }
    acc[major.category].push(major);
    return acc;
  }, {} as { [key: string]: typeof mockMajors });

  const toggleMajor = (majorId: string) => {
    if (selectedMajors.includes(majorId)) {
      setSelectedMajors(selectedMajors.filter(m => m !== majorId));
    } else if (selectedMajors.length < 5) {
      setSelectedMajors([...selectedMajors, majorId]);
    }
  };

  const getEmploymentColor = (prospects: string) => {
    switch (prospects) {
      case 'excellent':
        return 'bg-green-100 text-green-700';
      case 'good':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* 标题区域 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-violet-200">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">选择感兴趣的专业</h2>
        <p className="text-gray-500 mt-2">选择您感兴趣的专业方向，系统将优先推荐相关优势院校</p>
      </div>

      {/* 已选专业预览 */}
      {selectedMajors.length > 0 && (
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-5 border border-violet-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-violet-900">已选专业 ({selectedMajors.length}/5)</span>
            <button
              onClick={() => setSelectedMajors([])}
              className="text-sm text-violet-600 hover:text-violet-700"
            >
              清空全部
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedMajors.map(majorId => {
              const major = mockMajors.find(m => m.id === majorId);
              return major ? (
                <span
                  key={majorId}
                  className="px-3 py-1.5 bg-white rounded-full text-sm text-violet-700 border border-violet-200 flex items-center"
                >
                  {categoryIcons[major.category] && (
                    <span className="mr-1.5">{categoryIcons[major.category]}</span>
                  )}
                  {major.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* 专业分类选择 */}
      <div className="space-y-6">
        {Object.entries(majorsByCategory).map(([category, majors]) => (
          <div key={category} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center mr-3">
                {categoryIcons[category] || <BookOpen size={20} className="text-violet-600" />}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
              <span className="ml-2 text-sm text-gray-400">({majors.length}个专业)</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {majors.map((major) => {
                const isSelected = selectedMajors.includes(major.id);
                const isDisabled = !isSelected && selectedMajors.length >= 5;

                return (
                  <button
                    key={major.id}
                    onClick={() => toggleMajor(major.id)}
                    disabled={isDisabled}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all duration-200 text-left
                      ${isSelected
                        ? 'border-violet-500 bg-violet-50 shadow-md shadow-violet-100'
                        : 'border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50'}
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <div className="font-medium text-gray-900 mb-2">{major.name}</div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-0.5 rounded ${getEmploymentColor(major.employmentProspects)}`}>
                        {major.employmentProspects === 'excellent' ? '就业很好' :
                         major.employmentProspects === 'good' ? '就业较好' : '就业一般'}
                      </span>
                      <span className="text-xs text-gray-500">
                        平均薪资 ¥{major.avgSalary.toLocaleString()}/月
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <div className="w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center">
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
        ))}
      </div>

      {/* 说明提示 */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
        <div className="flex items-start">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">选择建议</h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              建议选择2-3个感兴趣的专业方向即可。选择过多可能导致推荐结果过于分散。
              专业选择将帮助系统更精准地匹配合适的院校和专业。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};