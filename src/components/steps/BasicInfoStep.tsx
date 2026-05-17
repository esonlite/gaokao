import React from 'react';
import { GraduationCap, Award, Building2, Shield } from 'lucide-react';

interface BasicInfoStepProps {
  subjectType: 'liberal' | 'science' | null;
  setSubjectType: (type: 'liberal' | 'science') => void;
  rank: string;
  setRank: (rank: string) => void;
  province: string;
  setProvince: (province: string) => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  subjectType,
  setSubjectType,
  rank,
  setRank,
  province,
  setProvince
}) => {
  const provinces = [
    '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
    '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
    '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
    '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'
  ];

  return (
    <div className="space-y-6">
      {/* 标题区域 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">基本信息录入</h2>
        <p className="text-gray-500 mt-2">请准确填写以下信息，系统将根据您的成绩进行精准推荐</p>
      </div>

      {/* 科目选择 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          选择科目类别
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setSubjectType('liberal')}
            className={`
              relative p-6 rounded-2xl border-2 transition-all duration-300
              ${subjectType === 'liberal'
                ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'}
            `}
          >
            <div className="flex items-center">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center mr-4
                ${subjectType === 'liberal' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}
              `}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-lg">文科</div>
                <div className="text-sm text-gray-500 mt-1">历史、政治、地理</div>
              </div>
            </div>
            {subjectType === 'liberal' && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </button>

          <button
            onClick={() => setSubjectType('science')}
            className={`
              relative p-6 rounded-2xl border-2 transition-all duration-300
              ${subjectType === 'science'
                ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100'
                : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'}
            `}
          >
            <div className="flex items-center">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center mr-4
                ${subjectType === 'science' ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600'}
              `}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-lg">理科</div>
                <div className="text-sm text-gray-500 mt-1">物理、化学、生物</div>
              </div>
            </div>
            {subjectType === 'science' && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* 省份选择 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          高考所在省份
        </label>
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none bg-white"
        >
          <option value="">请选择省份</option>
          {provinces.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* 排名输入 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          全省位次（排名）
        </label>
        <div className="relative">
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="请输入您的全省排名"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all pr-12"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            名
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          位次是比分数更准确的定位方式，建议从成绩单或考试院官网查询
        </p>
      </div>

      {/* 信息提示卡片 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
        <div className="flex items-start">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">为什么要用位次而非分数？</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              每年高考难度不同，分数会有波动，但位次反映了您在全省考生中的相对位置。
              系统会根据位次换算成过去三年的"同位分"，进行更精准的志愿推荐。
            </p>
          </div>
        </div>
      </div>

      {/* 院校分类说明 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          院校层次说明
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center border border-red-200">
            <Award className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="font-semibold text-red-900">985高校</div>
            <div className="text-xs text-red-600 mt-1">39所顶尖高校</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center border border-orange-200">
            <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="font-semibold text-orange-900">211高校</div>
            <div className="text-xs text-orange-600 mt-1">115所重点高校</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
            <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-blue-900">双一流</div>
            <div className="text-xs text-blue-600 mt-1">137所建设高校</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200">
            <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold text-green-900">普通本科</div>
            <div className="text-xs text-green-600 mt-1">其他本科院校</div>
          </div>
        </div>
      </div>
    </div>
  );
};