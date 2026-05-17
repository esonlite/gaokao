import { RecommendedUniversity, mockUniversities } from '../data/mockData';

/**
 * 根据用户输入计算过往三年同位分
 * 简化版本：使用排名来估算分数范围
 */
export function calculateHistoricalScores(userRank: number): { year: number; estimatedScore: number }[] {
  // 简化算法：假设每年分数波动，根据排名估算历史同位分
  // 实际应用中需要更复杂的算法和历史数据
  const baseScore = 600; // 基准分数
  const rankFactor = Math.max(0, 1 - userRank / 100000); // 排名越靠前，分数越高

  return [
    { year: 2024, estimatedScore: Math.round(baseScore + rankFactor * 100 + Math.random() * 10) },
    { year: 2023, estimatedScore: Math.round(baseScore + rankFactor * 95 + Math.random() * 10) },
    { year: 2022, estimatedScore: Math.round(baseScore + rankFactor * 90 + Math.random() * 10) }
  ];
}

/**
 * 根据同位分划定大学范围 - 冲、稳、保策略
 */
export function classifyUniversitiesByStrategy(
  subjectType: 'liberal' | 'science',
  userRank: number
): { shock: RecommendedUniversity[]; stable: RecommendedUniversity[]; safe: RecommendedUniversity[] } {
  // 根据排名估算当前等效分数
  const estimatedScore = estimateScoreFromRank(userRank, subjectType);

  const shock: RecommendedUniversity[] = []; // 冲：+5~10分
  const stable: RecommendedUniversity[] = []; // 稳：-5~10分
  const safe: RecommendedUniversity[] = []; // 保：-10~20分

  mockUniversities.forEach(university => {
    const scoreDiff = university.minScore - estimatedScore;

    let strategy: '冲击' | '稳妥' | '保底' = '稳妥';
    let admissionProbability = 0;

    if (scoreDiff >= -5 && scoreDiff <= 5) {
      // 稳妥区间：-5到+5分
      strategy = '稳妥';
      admissionProbability = calculateProbability(estimatedScore, university.avgScore, university.minRank, userRank, 'medium');
    } else if (scoreDiff > 5 && scoreDiff <= 15) {
      // 冲击区间：+5到+15分
      strategy = '冲击';
      admissionProbability = calculateProbability(estimatedScore, university.avgScore, university.minRank, userRank, 'low');
    } else if (scoreDiff < -5 && scoreDiff >= -25) {
      // 保底区间：-5到-25分
      strategy = '保底';
      admissionProbability = calculateProbability(estimatedScore, university.avgScore, university.minRank, userRank, 'high');
    }

    if (strategy) {
      const recommended: RecommendedUniversity = {
        university,
        strategy,
        matchScore: calculateMatchScore(estimatedScore, university),
        recommendedMajors: getRecommendedMajors(university, estimatedScore),
        admissionProbability
      };

      if (strategy === '冲击') {
        shock.push(recommended);
      } else if (strategy === '稳妥') {
        stable.push(recommended);
      } else {
        safe.push(recommended);
      }
    }
  });

  // 按匹配度排序
  const sortByMatch = (a: RecommendedUniversity, b: RecommendedUniversity) => b.matchScore - a.matchScore;

  return {
    shock: shock.sort(sortByMatch).slice(0, 15),
    stable: stable.sort(sortByMatch).slice(0, 15),
    safe: safe.sort(sortByMatch).slice(0, 15)
  };
}

/**
 * 根据排名估算等效分数
 */
function estimateScoreFromRank(rank: number, subjectType: 'liberal' | 'science'): number {
  // 简化算法：根据排名估算
  if (rank <= 100) return 700;
  if (rank <= 500) return 680;
  if (rank <= 1000) return 665;
  if (rank <= 2000) return 650;
  if (rank <= 5000) return 630;
  if (rank <= 10000) return 610;
  if (rank <= 20000) return 590;
  if (rank <= 50000) return 560;
  if (rank <= 100000) return 530;
  return 500;
}

/**
 * 计算录取概率（最低60%）
 */
function calculateProbability(
  userScore: number,
  avgScore: number,
  minRank: number,
  userRank: number,
  riskLevel: 'low' | 'medium' | 'high'
): number {
  const scoreDiff = userScore - avgScore;
  let baseProbability = 60; // 最低60%

  if (riskLevel === 'high') {
    // 保底志愿：75%-95%
    baseProbability = 80;
  } else if (riskLevel === 'medium') {
    // 稳妥志愿：60%-85%
    if (scoreDiff >= 0) baseProbability = 85;
    else if (scoreDiff >= -10) baseProbability = 75;
    else baseProbability = 65;
  } else {
    // 冲击志愿：60%-70%
    if (scoreDiff >= 10) baseProbability = 60;
    else if (scoreDiff >= 5) baseProbability = 65;
    else baseProbability = 70;
  }

  return Math.min(95, Math.max(60, baseProbability));
}

/**
 * 计算匹配度得分
 */
function calculateMatchScore(userScore: number, university: any): number {
  const scoreDiff = Math.abs(userScore - university.avgScore);

  // 分数差距越小，匹配度越高
  if (scoreDiff <= 5) return 95;
  if (scoreDiff <= 10) return 88;
  if (scoreDiff <= 15) return 80;
  if (scoreDiff <= 20) return 72;
  if (scoreDiff <= 30) return 65;
  return 60;
}

/**
 * 根据用户分数获取推荐专业
 */
function getRecommendedMajors(university: any, userScore: number): string[] {
  const majors = Object.entries(university.majorMinScores)
    .filter(([_, minScore]) => (minScore as number) <= userScore + 15)
    .sort((a, b) => (a[1] as number) - (b[1] as number))
    .slice(0, 3)
    .map(([major]) => major);

  return majors.length > 0 ? majors : ['专业组内任选'];
}

/**
 * 根据用户兴趣筛选推荐大学
 */
export function filterByInterests(
  universities: RecommendedUniversity[],
  userInterests: string[]
): RecommendedUniversity[] {
  if (userInterests.length === 0) return universities;

  return universities.filter(rec => {
    const uni = rec.university;
    const uniFeatures = uni.features.join(' ');
    return userInterests.some(interest =>
      uniFeatures.toLowerCase().includes(interest.toLowerCase()) ||
      uni.type.toLowerCase().includes(interest.toLowerCase())
    );
  });
}

/**
 * 生成最终志愿清单
 */
export function generateFinalList(
  allUniversities: { shock: RecommendedUniversity[]; stable: RecommendedUniversity[]; safe: RecommendedUniversity[] },
  userPreferences: { interests: string[]; careerGoals: string[]; planToFurtherStudy: boolean }
): RecommendedUniversity[] {
  const finalList: RecommendedUniversity[] = [];

  // 按策略选择大学，确保梯度合理
  // 建议：冲2-3所，稳4-6所，保2-3所

  // 优先选择与用户兴趣匹配的
  const matchedShock = filterByInterests(allUniversities.shock, userPreferences.interests);
  const matchedStable = filterByInterests(allUniversities.stable, userPreferences.interests);
  const matchedSafe = filterByInterests(allUniversities.safe, userPreferences.interests);

  // 添加冲击志愿
  finalList.push(...matchedShock.slice(0, 3));

  // 添加稳妥志愿
  finalList.push(...matchedStable.slice(0, 5));

  // 添加保底志愿
  finalList.push(...matchedSafe.slice(0, 2));

  return finalList;
}

/**
 * 验证志愿合理性
 */
export function validateVolunteerList(list: RecommendedUniversity[]): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  if (list.length === 0) {
    return { isValid: false, warnings: ['志愿列表为空'] };
  }

  if (list.length > 10) {
    warnings.push('建议选择不超过10所院校');
  }

  // 检查梯度
  const strategies = list.map(u => u.strategy);
  const hasShock = strategies.includes('冲击');
  const hasStable = strategies.includes('稳妥');
  const hasSafe = strategies.includes('保底');

  if (!hasSafe) {
    warnings.push('建议至少选择1所保底院校，降低滑档风险');
  }

  // 检查分数梯度
  const scores = list.map(u => u.university.minScore);
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);

  if (maxScore - minScore > 50) {
    warnings.push('院校分数梯度较大，建议优化志愿顺序');
  }

  return { isValid: true, warnings };
}

/**
 * 排序志愿（按录取概率从高到低）
 */
export function sortVolunteerList(list: RecommendedUniversity[]): RecommendedUniversity[] {
  return [...list].sort((a, b) => b.admissionProbability - a.admissionProbability);
}