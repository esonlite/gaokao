import React, { useState, useMemo } from 'react';
import { Target, TrendingUp, Shield, ChevronDown, ChevronUp, Filter, Search, Star, MapPin, GraduationCap, Award } from 'lucide-react';
import { RecommendedUniversity } from '../../data/mockData';

interface RecommendationStepProps {
  recommendations: {
    shock: RecommendedUniversity[];
    stable: RecommendedUniversity[];
    safe: RecommendedUniversity[];
  };
  onSelectUniversity: (university: RecommendedUniversity) => void;
  selectedUniversities: RecommendedUniversity[];
}

export const RecommendationStep: React.FC<RecommendationStepProps> = ({
  recommendations,
  onSelectUniversity,
  selectedUniversities
}) => {
  const [activeTab, setActiveTab] = useState<'shock' | 'stable' | 'safe'>('stable');
  const [expandedUniversity, setExpandedUniversity] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  const categories = ['all', '985', '211', 'double-first', 'regular'];

  const filteredData = useMemo(() => {
    const currentList = recommendations[activeTab];
    return currentList.filter(item => {
      const matchCategory = filterCategory === 'all' || item.university.category === filterCategory;
      const matchSearch = !searchKeyword ||
        item.university.name.includes(searchKeyword) ||
        item.recommendedMajors.some(m => m.includes(searchKeyword));
      return matchCategory && matchSearch;
    });
  }, [recommendations, activeTab, filterCategory, searchKeyword]);

  const tabConfig = [
    { key: 'shock' as const, label: '冲刺', icon: <TrendingUp size={18} />, color: 'red', description: '录取概率较低但值得一试' },
    { key: 'stable' as const, label: '稳妥', icon: <Target size={18} />, color: 'blue', description: '录取概率较高' },
    { key: 'safe' as const, label: '保底', icon: <Shield size={18} />, color: 'green', description: '录取概率很高' }
  ];

  const getCategoryBadge = (category: string) => {
    const config: { [key: string]: { bg: string; text: string; label: string } } = {
      '985': { bg: 'bg-red-100', text: 'text-red-700', label: '985' },
      '211': { bg: 'bg-orange-100', text: 'text-orange-700', label: '211' },
      'double-first': { bg: 'bg-blue-100', text: 'text-blue-700', label: '双一流' },
      'regular': { bg: 'bg-green-100', text: 'text-green-700', label: '普通本科' }
    };
    const c = config[category] || config['regular'];
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* 标题区域 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg shadow-emerald-200">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">智能推荐结果</h2>
        <p className="text-gray-500 mt-2">基于您的成绩和兴趣，系统为您推荐以下院校</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center border border-red-200">
          <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-red-900">{recommendations.shock.length}</div>
          <div className="text-xs text-red-600 mt-1">冲刺院校</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
          <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-900">{recommendations.stable.length}</div>
          <div className="text-xs text-blue-600 mt-1">稳妥院校</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200">
          <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-900">{recommendations.safe.length}</div>
          <div className="text-xs text-green-600 mt-1">保底院校</div>
        </div>
      </div>

      {/* Tab切换 */}
      <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
        {tabConfig.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2
              ${activeTab === tab.key
                ? tab.color === 'red' ? 'bg-red-500 text-white shadow-lg'
                  : tab.color === 'blue' ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-green-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-white hover:shadow'}
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 策略说明 */}
      <div className={`rounded-xl p-4 ${
        activeTab === 'shock' ? 'bg-red-50 border border-red-200' :
        activeTab === 'stable' ? 'bg-blue-50 border border-blue-200' :
        'bg-green-50 border border-green-200'
      }`}>
        <div className="flex items-center">
          {activeTab === 'shock' ? <TrendingUp className="w-5 h-5 text-red-600 mr-2" /> :
           activeTab === 'stable' ? <Target className="w-5 h-5 text-blue-600 mr-2" /> :
           <Shield className="w-5 h-5 text-green-600 mr-2" />}
          <span className={`text-sm font-medium ${
            activeTab === 'shock' ? 'text-red-800' :
            activeTab === 'stable' ? 'text-blue-800' :
            'text-green-800'
          }`}>
            {tabConfig.find(t => t.key === activeTab)?.description}
          </span>
        </div>
      </div>

      {/* 筛选和搜索 */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="搜索院校名称或专业..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
          >
            <option value="all">全部层次</option>
            <option value="985">985高校</option>
            <option value="211">211高校</option>
            <option value="double-first">双一流</option>
            <option value="regular">普通本科</option>
          </select>
        </div>
      </div>

      {/* 大学列表 */}
      <div className="space-y-4">
        {filteredData.map((item) => {
          const isSelected = selectedUniversities.some(s => s.university.id === item.university.id);
          const isExpanded = expandedUniversity === item.university.id;

          return (
            <div
              key={item.university.id}
              className={`
                bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden
                ${isSelected ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              {/* 主卡片 */}
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getCategoryBadge(item.university.category)}
                      <span className={`
                        px-2 py-0.5 rounded text-xs font-medium
                        ${item.strategy === '冲击' ? 'bg-red-100 text-red-700' :
                          item.strategy === '稳妥' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'}
                      `}>
                        {item.strategy}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.university.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {item.university.location}
                      </span>
                      <span className="flex items-center">
                        <GraduationCap size={14} className="mr-1" />
                        最低{item.university.minScore}分
                      </span>
                      <span className="flex items-center">
                        <Award size={14} className="mr-1" />
                        就业率{item.university.employmentRate}%
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-right">
                      <div className="text-xs text-gray-500">录取概率</div>
                      <div className={`text-xl font-bold ${
                        item.admissionProbability >= 80 ? 'text-green-600' :
                        item.admissionProbability >= 60 ? 'text-blue-600' :
                        item.admissionProbability >= 40 ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {item.admissionProbability}%
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (!isSelected) {
                          onSelectUniversity(item);
                        }
                      }}
                      disabled={isSelected}
                      className={`
                        px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                        ${isSelected
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'}
                      `}
                    >
                      {isSelected ? '已添加' : '添加'}
                    </button>
                  </div>
                </div>

                {/* 推荐专业 */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">推荐专业</span>
                    <button
                      onClick={() => setExpandedUniversity(isExpanded ? null : item.university.id)}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                    >
                      {isExpanded ? '收起' : '查看详情'}
                      {isExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.recommendedMajors.map((major, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {major}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 院校特色 */}
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {item.university.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 扩展详情 */}
              {isExpanded && (
                <div className="px-5 pb-5 bg-gray-50 border-t">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">院校代码</div>
                      <div className="font-medium text-gray-900">{item.university.code}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">院校类型</div>
                      <div className="font-medium text-gray-900">{item.university.type}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">平均录取分</div>
                      <div className="font-medium text-gray-900">{item.university.avgScore}分</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">学费</div>
                      <div className="font-medium text-gray-900">¥{item.university.tuition}/年</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-xs text-gray-500 mb-2">专业录取线</div>
                    <div className="space-y-2">
                      {Object.entries(item.university.majorMinScores).slice(0, 5).map(([major, score]) => (
                        <div key={major} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-0">
                          <span className="text-sm text-gray-700">{major}</span>
                          <span className="text-sm font-medium text-gray-900">{score as number}分</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">未找到符合条件的院校</h3>
          <p className="text-gray-500 mt-2">请尝试调整筛选条件</p>
        </div>
      )}

      {/* 已选院校预览 */}
      {selectedUniversities.length > 0 && (
        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200 sticky bottom-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold">{selectedUniversities.length}</span>
              </div>
              <span className="font-semibold text-blue-900">已选择 {selectedUniversities.length} 所院校</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedUniversities.slice(0, 5).map((item) => (
              <span
                key={item.university.id}
                className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-blue-200"
              >
                {item.university.name}
              </span>
            ))}
            {selectedUniversities.length > 5 && (
              <span className="px-3 py-1 bg-blue-100 rounded-full text-sm text-blue-700">
                +{selectedUniversities.length - 5} 更多
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};