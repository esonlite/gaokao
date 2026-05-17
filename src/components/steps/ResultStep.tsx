import React, { useState, useMemo } from 'react';
import { CheckCircle, Download, Share2, ArrowUp, ArrowDown, AlertTriangle, Info, MapPin, Star, GraduationCap, Award, Target, TrendingUp, Shield } from 'lucide-react';
import { RecommendedUniversity } from '../../data/mockData';
import { validateVolunteerList } from '../../utils/calculation';

interface ResultStepProps {
  selectedUniversities: RecommendedUniversity[];
  userProfile: {
    subjectType: 'liberal' | 'science' | null;
    rank: string;
    province: string;
  };
}

export const ResultStep: React.FC<ResultStepProps> = ({ selectedUniversities, userProfile }) => {
  const [sortBy, setSortBy] = useState<'probability' | 'score' | 'match'>('probability');

  const validation = useMemo(() => validateVolunteerList(selectedUniversities), [selectedUniversities]);

  const sortedList = useMemo(() => {
    const list = [...selectedUniversities];
    switch (sortBy) {
      case 'probability':
        return list.sort((a, b) => b.admissionProbability - a.admissionProbability);
      case 'score':
        return list.sort((a, b) => b.university.minScore - a.university.minScore);
      case 'match':
        return list.sort((a, b) => b.matchScore - a.matchScore);
      default:
        return list;
    }
  }, [selectedUniversities, sortBy]);

  const getCategoryConfig = (category: string) => {
    const config: { [key: string]: { bg: string; text: string; label: string } } = {
      '985': { bg: 'bg-red-100', text: 'text-red-700', label: '985' },
      '211': { bg: 'bg-orange-100', text: 'text-orange-700', label: '211' },
      'double-first': { bg: 'bg-blue-100', text: 'text-blue-700', label: '双一流' },
      'regular': { bg: 'bg-green-100', text: 'text-green-700', label: '普通本科' }
    };
    return config[category] || config['regular'];
  };

  const getStrategyIcon = (strategy: string) => {
    switch (strategy) {
      case '冲击':
        return <TrendingUp size={16} />;
      case '稳妥':
        return <Target size={16} />;
      case '保底':
        return <Shield size={16} />;
      default:
        return <Star size={16} />;
    }
  };

  const exportPlan = () => {
    const content = `高考志愿填报方案\n`;
    const info = `考生信息：${userProfile.subjectType === 'liberal' ? '文科' : '理科'} | 位次：${userProfile.rank} | 省份：${userProfile.province}\n`;
    const header = `\n序号 | 院校名称 | 层次 | 策略 | 录取概率 | 推荐专业\n`;
    const rows = sortedList.map((item, idx) =>
      `${idx + 1} | ${item.university.name} | ${getCategoryConfig(item.university.category).label} | ${item.strategy} | ${item.admissionProbability}% | ${item.recommendedMajors.join('、')}`
    ).join('\n');

    const blob = new Blob([content + info + header + rows], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '高考志愿方案.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 成功提示 */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">志愿方案已生成</h2>
            <p className="text-emerald-100 mt-1">
              基于您的成绩和偏好，系统为您推荐了 {selectedUniversities.length} 所院校
            </p>
          </div>
        </div>
      </div>

      {/* 用户信息摘要 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
          <Info size={18} className="mr-2" />
          考生信息
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xs text-gray-500">科目类别</div>
            <div className="font-semibold text-gray-900 mt-1">
              {userProfile.subjectType === 'liberal' ? '文科' : userProfile.subjectType === 'science' ? '理科' : '-'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">全省位次</div>
            <div className="font-semibold text-gray-900 mt-1">{userProfile.rank || '-'}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">所在省份</div>
            <div className="font-semibold text-gray-900 mt-1">{userProfile.province || '-'}</div>
          </div>
        </div>
      </div>

      {/* 风险提示 */}
      {validation.warnings.length > 0 && (
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
          <h3 className="font-semibold text-amber-900 mb-3 flex items-center">
            <AlertTriangle size={18} className="mr-2" />
            填报建议
          </h3>
          <ul className="space-y-2">
            {validation.warnings.map((warning, idx) => (
              <li key={idx} className="flex items-start">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-sm text-amber-800">{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={exportPlan}
          className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all shadow-lg shadow-blue-200"
        >
          <Download size={18} className="mr-2" />
          导出方案
        </button>
        <button
          onClick={() => {
            const text = `我的高考志愿方案：${sortedList.map((item, idx) => `${idx + 1}. ${item.university.name}(${item.admissionProbability}%)`).join(' | ')}`;
            navigator.clipboard.writeText(text);
          }}
          className="flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-all"
        >
          <Share2 size={18} className="mr-2" />
          复制分享
        </button>
      </div>

      {/* 排序控制 */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">
          志愿排序（共 {sortedList.length} 所）
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">排序方式：</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg border-2 border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
          >
            <option value="probability">按录取概率</option>
            <option value="score">按录取分数</option>
            <option value="match">按匹配度</option>
          </select>
        </div>
      </div>

      {/* 志愿列表 */}
      <div className="space-y-4">
        {sortedList.map((item, index) => {
          const categoryConfig = getCategoryConfig(item.university.category);

          return (
            <div
              key={item.university.id}
              className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="p-5">
                {/* 顶部信息 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center mr-3 font-bold text-lg
                      ${item.strategy === '冲击' ? 'bg-red-100 text-red-600' :
                        item.strategy === '稳妥' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'}
                    `}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.university.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryConfig.bg} ${categoryConfig.text}`}>
                          {categoryConfig.label}
                        </span>
                        <span className={`
                          px-2 py-0.5 rounded text-xs font-medium flex items-center
                          ${item.strategy === '冲击' ? 'bg-red-100 text-red-700' :
                            item.strategy === '稳妥' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'}
                        `}>
                          {getStrategyIcon(item.strategy)}
                          <span className="ml-1">{item.strategy}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 概率指示 */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">录取概率</div>
                    <div className={`
                      text-2xl font-bold
                      ${item.admissionProbability >= 80 ? 'text-green-600' :
                        item.admissionProbability >= 60 ? 'text-blue-600' :
                        item.admissionProbability >= 40 ? 'text-orange-600' :
                        'text-red-600'}
                    `}>
                      {item.admissionProbability}%
                    </div>
                  </div>
                </div>

                {/* 详细信息 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">最低录取分</div>
                    <div className="font-semibold text-gray-900">{item.university.minScore}分</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">院校代码</div>
                    <div className="font-semibold text-gray-900">{item.university.code}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">所在地</div>
                    <div className="font-semibold text-gray-900 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {item.university.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">就业率</div>
                    <div className="font-semibold text-gray-900 flex items-center">
                      <Award size={14} className="mr-1" />
                      {item.university.employmentRate}%
                    </div>
                  </div>
                </div>

                {/* 推荐专业 */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center mb-2">
                    <GraduationCap size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700">推荐专业</span>
                    <span className="ml-auto text-sm text-gray-500">
                      匹配度：{item.matchScore}%
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.recommendedMajors.map((major, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                      >
                        {major}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 院校特色 */}
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {item.university.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs flex items-center"
                      >
                        <Star size={12} className="mr-1" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 填报说明 */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <CheckCircle size={18} className="mr-2 text-blue-600" />
          填报注意事项
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 flex-shrink-0">1</span>
            <span className="text-sm text-gray-700">建议将志愿按照"冲-稳-保"的顺序排列，把录取概率高的放在后面</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 flex-shrink-0">2</span>
            <span className="text-sm text-gray-700">每个学校要勾选"专业服从调剂"，降低退档风险</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 flex-shrink-0">3</span>
            <span className="text-sm text-gray-700">登录本省教育考试院官网完成最终志愿填报</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 flex-shrink-0">4</span>
            <span className="text-sm text-gray-700">志愿填报时间有限，请提前准备好所有信息</span>
          </li>
        </ul>
      </div>

      {/* 完成提示 */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">志愿方案已完成</h3>
        <p className="text-gray-500">请按照建议顺序登录考试院网站完成最终填报</p>
        <p className="text-sm text-gray-400 mt-4">祝您被理想大学录取！</p>
      </div>
    </div>
  );
};