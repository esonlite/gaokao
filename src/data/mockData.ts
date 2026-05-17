export interface University {
  id: string;
  name: string;
  code: string;
  province: string;
  category: '985' | '211' | 'double-first' | 'regular' | 'junior';
  type: 'comprehensive' | 'science' | 'engineering' | 'medical' | 'agriculture' | 'economics' | 'law' | 'education';
  minScore: number;
  avgScore: number;
  minRank: number;
  avgRank: number;
  majorMinScores: { [major: string]: number };
  features: string[];
  location: string;
  tuition: number;
  employmentRate: number;
}

export interface Major {
  id: string;
  name: string;
  category: string;
  suitableInterest: string[];
  avgSalary: number;
  employmentProspects: 'excellent' | 'good' | 'average';
}

export interface UserProfile {
  subjectType: 'liberal' | 'science';
  rank: number;
  province: string;
  selectedMajors: string[];
  interests: string[];
  careerGoals: string[];
  planToFurtherStudy: boolean;
  planToAbroad: boolean;
}

export interface RecommendedUniversity {
  university: University;
  strategy: '冲击' | '稳妥' | '保底';
  matchScore: number;
  recommendedMajors: string[];
  admissionProbability: number;
}

export interface VolunteerPlan {
  universities: RecommendedUniversity[];
  finalList: RecommendedUniversity[];
}

export const mockUniversities: University[] = [
  // 985高校
  {
    id: 'u1',
    name: '北京大学',
    code: '10001',
    province: '全国',
    category: '985',
    type: 'comprehensive',
    minScore: 680,
    avgScore: 695,
    minRank: 50,
    avgRank: 30,
    majorMinScores: { '计算机科学与技术': 692, '人工智能': 694, '经济学': 690, '法学': 685, '汉语言文学': 682 },
    features: ['顶尖师资', '浓厚学术氛围', '国际化资源'],
    location: '北京',
    tuition: 5000,
    employmentRate: 96
  },
  {
    id: 'u2',
    name: '清华大学',
    code: '10003',
    province: '全国',
    category: '985',
    type: 'engineering',
    minScore: 678,
    avgScore: 692,
    minRank: 80,
    avgRank: 50,
    majorMinScores: { '计算机科学与技术': 695, '电子信息类': 690, '机械工程': 685, '经济金融': 692, '建筑学': 688 },
    features: ['工科顶尖', '科研实力强', '创新创业氛围浓厚'],
    location: '北京',
    tuition: 5000,
    employmentRate: 97
  },
  {
    id: 'u3',
    name: '复旦大学',
    code: '10246',
    province: '全国',
    category: '985',
    type: 'comprehensive',
    minScore: 665,
    avgScore: 678,
    minRank: 200,
    avgRank: 150,
    majorMinScores: { '新闻传播学': 672, '经济学': 675, '临床医学': 670, '计算机科学与技术': 673, '汉语言文学': 668 },
    features: ['人文社科强', '海派文化', '国际交流多'],
    location: '上海',
    tuition: 5500,
    employmentRate: 95
  },
  {
    id: 'u4',
    name: '上海交通大学',
    code: '10248',
    province: '全国',
    category: '985',
    type: 'engineering',
    minScore: 668,
    avgScore: 680,
    minRank: 180,
    avgRank: 120,
    majorMinScores: { '人工智能': 682, '机械工程': 675, '电子信息类': 680, '计算机科学与技术': 678, '船舶与海洋工程': 668 },
    features: ['工科领先', '创新实践', '国际化培养'],
    location: '上海',
    tuition: 5000,
    employmentRate: 96
  },
  {
    id: 'u5',
    name: '浙江大学',
    code: '10335',
    province: '全国',
    category: '985',
    type: 'comprehensive',
    minScore: 660,
    avgScore: 672,
    minRank: 300,
    avgRank: 220,
    majorMinScores: { '计算机科学与技术': 675, '软件工程': 670, '人工智能': 672, '光电信息': 665, '生物医学': 662 },
    features: ['综合实力强', '创新创业活跃', '学科全面'],
    location: '浙江',
    tuition: 4800,
    employmentRate: 95
  },
  {
    id: 'u6',
    name: '南京大学',
    code: '10284',
    province: '全国',
    category: '985',
    type: 'comprehensive',
    minScore: 658,
    avgScore: 668,
    minRank: 350,
    avgRank: 280,
    majorMinScores: { '天文学': 658, '物理学': 662, '化学': 660, '计算机科学与技术': 665, '经济学': 663 },
    features: ['基础学科强', '文理见长', '治学严谨'],
    location: '江苏',
    tuition: 4600,
    employmentRate: 94
  },
  {
    id: 'u7',
    name: '中国科学技术大学',
    code: '10358',
    province: '全国',
    category: '985',
    type: 'science',
    minScore: 665,
    avgScore: 675,
    minRank: 250,
    avgRank: 180,
    majorMinScores: { '计算机科学与技术': 678, '物理学': 670, '数学': 672, '化学': 665, '电子信息类': 668 },
    features: ['理工科顶尖', '科研氛围浓', '出国深造率高'],
    location: '安徽',
    tuition: 4800,
    employmentRate: 93
  },
  {
    id: 'u8',
    name: '武汉大学',
    code: '10486',
    province: '全国',
    category: '985',
    type: 'comprehensive',
    minScore: 635,
    avgScore: 648,
    minRank: 800,
    avgRank: 650,
    majorMinScores: { '法学': 645, '测绘科学与技术': 635, '水利工程': 630, '遥感科学与技术': 640, '新闻传播学': 638 },
    features: ['樱花校园', '学科齐全', '中部领军'],
    location: '湖北',
    tuition: 4500,
    employmentRate: 92
  },
  // 211高校
  {
    id: 'u9',
    name: '西安电子科技大学',
    code: '10701',
    province: '全国',
    category: '211',
    type: 'engineering',
    minScore: 620,
    avgScore: 635,
    minRank: 1500,
    avgRank: 1100,
    majorMinScores: { '计算机科学与技术': 638, '电子信息工程': 635, '人工智能': 640, '通信工程': 632, '软件工程': 628 },
    features: ['电子信息强', '就业率高', '行业认可度高'],
    location: '陕西',
    tuition: 4950,
    employmentRate: 95
  },
  {
    id: 'u10',
    name: '北京邮电大学',
    code: '10013',
    province: '全国',
    category: '211',
    type: 'engineering',
    minScore: 628,
    avgScore: 642,
    minRank: 1200,
    avgRank: 900,
    majorMinScores: { '通信工程': 645, '计算机科学与技术': 648, '电子信息类': 640, '人工智能': 642, '网络工程': 635 },
    features: ['信息与通信强', '行业资源丰富', '地理位置优越'],
    location: '北京',
    tuition: 5000,
    employmentRate: 96
  },
  {
    id: 'u11',
    name: '对外经济贸易大学',
    code: '10036',
    province: '全国',
    category: '211',
    type: 'economics',
    minScore: 638,
    avgScore: 650,
    minRank: 700,
    avgRank: 550,
    majorMinScores: { '金融学': 655, '国际经济与贸易': 648, '会计学': 645, '法学': 638, '商务英语': 635 },
    features: ['财经类顶尖', '国际化程度高', '就业前景好'],
    location: '北京',
    tuition: 6000,
    employmentRate: 94
  },
  {
    id: 'u12',
    name: '上海财经大学',
    code: '10272',
    province: '全国',
    category: '211',
    type: 'economics',
    minScore: 642,
    avgScore: 655,
    minRank: 600,
    avgRank: 450,
    majorMinScores: { '金融学': 658, '会计学': 652, '经济学': 648, '财务管理': 645, '统计学': 640 },
    features: ['财经类领先', '地处上海', '行业资源丰富'],
    location: '上海',
    tuition: 6500,
    employmentRate: 95
  },
  {
    id: 'u13',
    name: '南京航空航天大学',
    code: '10287',
    province: '全国',
    category: '211',
    type: 'engineering',
    minScore: 615,
    avgScore: 628,
    minRank: 1800,
    avgRank: 1400,
    majorMinScores: { '航空航天工程': 630, '计算机科学与技术': 632, '机械工程': 625, '电子信息类': 628, '自动化': 620 },
    features: ['航空特色', '国防背景', '工科实力强'],
    location: '江苏',
    tuition: 4600,
    employmentRate: 93
  },
  {
    id: 'u14',
    name: '华中科技大学',
    code: '10487',
    province: '全国',
    category: '211',
    type: 'engineering',
    minScore: 628,
    avgScore: 640,
    minRank: 1100,
    avgRank: 850,
    majorMinScores: { '计算机科学与技术': 645, '人工智能': 642, '光学工程': 638, '机械工程': 635, '电气工程': 630 },
    features: ['工科强校', '科研实力', '光电特色'],
    location: '湖北',
    tuition: 4500,
    employmentRate: 94
  },
  {
    id: 'u15',
    name: '哈尔滨工业大学',
    code: '10213',
    province: '全国',
    category: '985',
    type: 'engineering',
    minScore: 635,
    avgScore: 648,
    minRank: 850,
    avgRank: 650,
    majorMinScores: { '计算机科学与技术': 652, '机械工程': 645, '航空航天': 648, '电气工程': 642, '材料科学': 638 },
    features: ['工科老牌', '航天特色', '学风严谨'],
    location: '黑龙江',
    tuition: 4500,
    employmentRate: 93
  },
  {
    id: 'u16',
    name: '中山大学',
    code: '10558',
    province: '全国',
    category: '985',
    type: 'comprehensive',
    minScore: 632,
    avgScore: 645,
    minRank: 950,
    avgRank: 750,
    majorMinScores: { '临床医学': 648, '计算机科学与技术': 645, '经济学': 640, '管理学': 638, '法学': 635 },
    features: ['南方强校', '医学领先', '综合实力强'],
    location: '广东',
    tuition: 4800,
    employmentRate: 92
  },
  {
    id: 'u17',
    name: '厦门大学',
    code: '10384',
    province: '全国',
    category: '985',
    type: 'comprehensive',
    minScore: 628,
    avgScore: 640,
    minRank: 1100,
    avgRank: 880,
    majorMinScores: { '经济学': 642, '金融学': 638, '法学': 635, '会计学': 632, '海洋科学': 628 },
    features: ['海边校园', '财经法较强', '环境优美'],
    location: '福建',
    tuition: 5000,
    employmentRate: 91
  },
  {
    id: 'u18',
    name: '天津大学',
    code: '10056',
    province: '全国',
    category: '985',
    type: 'engineering',
    minScore: 625,
    avgScore: 638,
    minRank: 1300,
    avgRank: 1000,
    majorMinScores: { '建筑学': 640, '化工与制药': 632, '计算机科学与技术': 635, '机械工程': 628, '精密仪器': 630 },
    features: ['工科见长', '建筑特色', '历史悠久'],
    location: '天津',
    tuition: 4400,
    employmentRate: 92
  },
  {
    id: 'u19',
    name: '同济大学',
    code: '10247',
    province: '全国',
    category: '985',
    type: 'engineering',
    minScore: 640,
    avgScore: 655,
    minRank: 580,
    avgRank: 420,
    majorMinScores: { '建筑学': 660, '城乡规划': 652, '土木工程': 648, '计算机科学与技术': 650, '汽车工程': 645 },
    features: ['建筑王牌', '土木领先', '国际化程度高'],
    location: '上海',
    tuition: 5000,
    employmentRate: 94
  },
  {
    id: 'u20',
    name: '东南大学',
    code: '10286',
    province: '全国',
    category: '985',
    type: 'engineering',
    minScore: 630,
    avgScore: 642,
    minRank: 1000,
    avgRank: 780,
    majorMinScores: { '建筑学': 648, '信息工程': 645, '计算机科学与技术': 642, '交通运输': 638, '生物医学': 635 },
    features: ['建筑交通强', '工科实力', '南京优势'],
    location: '江苏',
    tuition: 4600,
    employmentRate: 93
  },
  // 双一流高校
  {
    id: 'u21',
    name: '北京交通大学',
    code: '10004',
    province: '全国',
    category: 'double-first',
    type: 'engineering',
    minScore: 605,
    avgScore: 620,
    minRank: 2500,
    avgRank: 2000,
    majorMinScores: { '交通运输': 622, '计算机科学与技术': 625, '电子信息类': 620, '通信工程': 618, '轨道交通信号': 615 },
    features: ['交通特色', '信息科技', '地理位置好'],
    location: '北京',
    tuition: 4800,
    employmentRate: 92
  },
  {
    id: 'u22',
    name: '华东理工大学',
    code: '10251',
    province: '全国',
    category: 'double-first',
    type: 'engineering',
    minScore: 598,
    avgScore: 612,
    minRank: 3000,
    avgRank: 2500,
    majorMinScores: { '化学工程': 615, '材料科学': 610, '计算机科学与技术': 612, '机械工程': 605, '生物工程': 608 },
    features: ['化工领先', '材料特色', '上海地域'],
    location: '上海',
    tuition: 5000,
    employmentRate: 90
  },
  {
    id: 'u23',
    name: '南京理工大学',
    code: '10288',
    province: '全国',
    category: 'double-first',
    type: 'engineering',
    minScore: 595,
    avgScore: 608,
    minRank: 3200,
    avgRank: 2700,
    majorMinScores: { '兵器科学与技术': 610, '计算机科学与技术': 612, '电子信息': 608, '自动化': 605, '机械工程': 600 },
    features: ['兵器特色', '工科底蕴', '江苏地域'],
    location: '江苏',
    tuition: 4600,
    employmentRate: 91
  },
  {
    id: 'u24',
    name: '西南交通大学',
    code: '10613',
    province: '全国',
    category: 'double-first',
    type: 'engineering',
    minScore: 585,
    avgScore: 598,
    minRank: 4000,
    avgRank: 3500,
    majorMinScores: { '交通运输': 602, '土木工程': 598, '机械工程': 592, '电气工程': 595, '工程力学': 588 },
    features: ['铁路特色', '西南区域', '工程实力'],
    location: '四川',
    tuition: 4500,
    employmentRate: 90
  },
  {
    id: 'u25',
    name: '哈尔滨工程大学',
    code: '10217',
    province: '全国',
    category: 'double-first',
    type: 'engineering',
    minScore: 580,
    avgScore: 595,
    minRank: 4200,
    avgRank: 3700,
    majorMinScores: { '船舶与海洋工程': 598, '核工程': 595, '计算机科学与技术': 592, '自动化': 588, '机械工程': 585 },
    features: ['船舶特色', '国防背景', '学科独特'],
    location: '黑龙江',
    tuition: 4400,
    employmentRate: 89
  },
  // 普通本科
  {
    id: 'u26',
    name: '杭州电子科技大学',
    code: '10336',
    province: '全国',
    category: 'regular',
    type: 'engineering',
    minScore: 600,
    avgScore: 615,
    minRank: 2800,
    avgRank: 2200,
    majorMinScores: { '计算机科学与技术': 620, '软件工程': 615, '电子信息工程': 612, '人工智能': 618, '网络工程': 608 },
    features: ['电子信息强', 'IT氛围浓', '杭州互联网'],
    location: '浙江',
    tuition: 5500,
    employmentRate: 93
  },
  {
    id: 'u27',
    name: '重庆医科大学',
    code: '10631',
    province: '全国',
    category: 'regular',
    type: 'medical',
    minScore: 595,
    avgScore: 612,
    minRank: 3100,
    avgRank: 2600,
    majorMinScores: { '临床医学': 618, '口腔医学': 615, '儿科学': 608, '医学影像': 602, '麻醉学': 605 },
    features: ['医学专业强', '西南地区', '附属医院多'],
    location: '重庆',
    tuition: 6200,
    employmentRate: 91
  },
  {
    id: 'u28',
    name: '深圳大学',
    code: '10463',
    province: '全国',
    category: 'regular',
    type: 'comprehensive',
    minScore: 605,
    avgScore: 620,
    minRank: 2500,
    avgRank: 1900,
    majorMinScores: { '计算机科学与技术': 628, '电子信息工程': 622, '人工智能': 625, '建筑学': 618, '金融学': 615 },
    features: ['深圳特区', '创新活力', 'IT就业强'],
    location: '广东',
    tuition: 6000,
    employmentRate: 94
  },
  {
    id: 'u29',
    name: '上海理工大学',
    code: '10252',
    province: '全国',
    category: 'regular',
    type: 'engineering',
    minScore: 575,
    avgScore: 590,
    minRank: 4500,
    avgRank: 4000,
    majorMinScores: { '机械设计': 592, '能源与动力': 588, '光电信息': 585, '计算机科学与技术': 590, '自动化': 582 },
    features: ['工科见长', '上海地域', '就业稳定'],
    location: '上海',
    tuition: 5000,
    employmentRate: 89
  },
  {
    id: 'u30',
    name: '浙江工业大学',
    code: '10337',
    province: '全国',
    category: 'regular',
    type: 'engineering',
    minScore: 580,
    avgScore: 598,
    minRank: 4200,
    avgRank: 3600,
    majorMinScores: { '化学工程': 602, '计算机科学与技术': 605, '机械工程': 595, '软件工程': 598, '自动化': 590 },
    features: ['浙江重点', '化工特色', '综合实力'],
    location: '浙江',
    tuition: 4800,
    employmentRate: 90
  },
  {
    id: 'u31',
    name: '南京邮电大学',
    code: '10293',
    province: '全国',
    category: 'double-first',
    type: 'engineering',
    minScore: 598,
    avgScore: 612,
    minRank: 2900,
    avgRank: 2400,
    majorMinScores: { '通信工程': 615, '计算机科学与技术': 612, '电子信息工程': 608, '物联网工程': 605, '人工智能': 610 },
    features: ['通信电子强', 'IT行业认可', '江苏地域'],
    location: '江苏',
    tuition: 5200,
    employmentRate: 92
  },
  {
    id: 'u32',
    name: '广东工业大学',
    code: '11845',
    province: '全国',
    category: 'regular',
    type: 'engineering',
    minScore: 565,
    avgScore: 580,
    minRank: 5000,
    avgRank: 4500,
    majorMinScores: { '机械工程': 585, '计算机科学与技术': 588, '自动化': 580, '电子信息': 578, '土木工程': 572 },
    features: ['广东重点', '工科实用', '制造业对接'],
    location: '广东',
    tuition: 5000,
    employmentRate: 88
  },
  {
    id: 'u33',
    name: '武汉理工大学',
    code: '10497',
    province: '全国',
    category: '211',
    type: 'engineering',
    minScore: 595,
    avgScore: 610,
    minRank: 3200,
    avgRank: 2700,
    majorMinScores: { '材料科学与工程': 612, '船舶与海洋工程': 608, '机械工程': 605, '计算机科学与技术': 608, '车辆工程': 600 },
    features: ['材料船舶强', '中部工科', '综合实力'],
    location: '湖北',
    tuition: 4500,
    employmentRate: 91
  },
  {
    id: 'u34',
    name: '西安理工大学',
    code: '10700',
    province: '全国',
    category: 'regular',
    type: 'engineering',
    minScore: 550,
    avgScore: 565,
    minRank: 5500,
    avgRank: 5000,
    majorMinScores: { '水利工程': 568, '机械工程': 565, '计算机科学与技术': 568, '电子信息': 562, '自动化': 558 },
    features: ['水利特色', '西北工科', '就业稳定'],
    location: '陕西',
    tuition: 4200,
    employmentRate: 87
  },
  {
    id: 'u35',
    name: '成都理工大学',
    code: '10616',
    province: '全国',
    category: 'double-first',
    type: 'science',
    minScore: 545,
    avgScore: 562,
    minRank: 5800,
    avgRank: 5200,
    majorMinScores: { '地质工程': 565, '资源勘查': 560, '计算机科学与技术': 565, '土木工程': 558, '核工程': 562 },
    features: ['地质特色', '西南区域', '特色学科'],
    location: '四川',
    tuition: 4500,
    employmentRate: 85
  },
  // 更多高校以确保覆盖不同分数段
  {
    id: 'u36',
    name: '杭州师范大学',
    code: '10346',
    province: '全国',
    category: 'regular',
    type: 'education',
    minScore: 565,
    avgScore: 578,
    minRank: 4800,
    avgRank: 4300,
    majorMinScores: { '教育学': 580, '心理学': 575, '小学教育': 572, '学前教育': 568, '汉语言文学': 575 },
    features: ['师范特色', '杭州地域', '教育行业稳定'],
    location: '浙江',
    tuition: 4500,
    employmentRate: 88
  },
  {
    id: 'u37',
    name: '福建师范大学',
    code: '10394',
    province: '全国',
    category: 'regular',
    type: 'education',
    minScore: 555,
    avgScore: 568,
    minRank: 5200,
    avgRank: 4700,
    majorMinScores: { '教育学': 570, '汉语言文学': 572, '历史学': 568, '心理学': 565, '英语': 562 },
    features: ['师范老校', '福建重点', '教育底蕴'],
    location: '福建',
    tuition: 4200,
    employmentRate: 86
  },
  {
    id: 'u38',
    name: '上海海事大学',
    code: '10254',
    province: '全国',
    category: 'regular',
    type: 'engineering',
    minScore: 560,
    avgScore: 575,
    minRank: 5000,
    avgRank: 4500,
    majorMinScores: { '航海技术': 578, '物流管理': 572, '交通运输': 568, '轮机工程': 575, '国际航运': 570 },
    features: ['航运特色', '上海地域', '海洋行业'],
    location: '上海',
    tuition: 5000,
    employmentRate: 89
  },
  {
    id: 'u39',
    name: '北方工业大学',
    code: '10009',
    province: '全国',
    category: 'regular',
    type: 'engineering',
    minScore: 570,
    avgScore: 585,
    minRank: 4500,
    avgRank: 4000,
    majorMinScores: { '计算机科学与技术': 588, '电子信息工程': 582, '机械工程': 575, '自动化': 572, '软件工程': 580 },
    features: ['工科应用', '北京地域', 'IT就业好'],
    location: '北京',
    tuition: 4800,
    employmentRate: 88
  },
  {
    id: 'u40',
    name: '重庆邮电大学',
    code: '10617',
    province: '全国',
    category: 'regular',
    type: 'engineering',
    minScore: 575,
    avgScore: 590,
    minRank: 4300,
    avgRank: 3800,
    majorMinScores: { '通信工程': 595, '计算机科学与技术': 592, '电子信息工程': 588, '自动化': 582, '软件工程': 585 },
    features: ['通信电子', '重庆IT', '行业认可'],
    location: '重庆',
    tuition: 4800,
    employmentRate: 90
  }
];

export const mockMajors: Major[] = [
  // 计算机类
  { id: 'm1', name: '计算机科学与技术', category: '计算机类', suitableInterest: ['计算机', '人工智能', '编程', '数据分析'], avgSalary: 15000, employmentProspects: 'excellent' },
  { id: 'm2', name: '软件工程', category: '计算机类', suitableInterest: ['计算机', '编程', '软件开发', '互联网'], avgSalary: 14500, employmentProspects: 'excellent' },
  { id: 'm3', name: '人工智能', category: '计算机类', suitableInterest: ['人工智能', '机器学习', '数据分析', '计算机'], avgSalary: 18000, employmentProspects: 'excellent' },
  { id: 'm4', name: '数据科学与大数据技术', category: '计算机类', suitableInterest: ['数据分析', '统计', '计算机', '人工智能'], avgSalary: 16000, employmentProspects: 'excellent' },
  { id: 'm5', name: '网络工程', category: '计算机类', suitableInterest: ['网络技术', '信息安全', '计算机', '通信'], avgSalary: 12000, employmentProspects: 'good' },
  { id: 'm6', name: '信息安全', category: '计算机类', suitableInterest: ['网络安全', '计算机', '信息技术', '加密'], avgSalary: 14000, employmentProspects: 'excellent' },

  // 电子信息类
  { id: 'm7', name: '电子信息工程', category: '电子信息类', suitableInterest: ['电子技术', '通信', '硬件', '信息技术'], avgSalary: 13000, employmentProspects: 'good' },
  { id: 'm8', name: '通信工程', category: '电子信息类', suitableInterest: ['通信技术', '网络', '电子', '信息技术'], avgSalary: 12500, employmentProspects: 'good' },
  { id: 'm9', name: '微电子科学与工程', category: '电子信息类', suitableInterest: ['芯片', '半导体', '电子技术', '物理'], avgSalary: 14000, employmentProspects: 'excellent' },
  { id: 'm10', name: '光电信息科学与工程', category: '电子信息类', suitableInterest: ['光学', '光电技术', '电子', '物理'], avgSalary: 12500, employmentProspects: 'good' },

  // 机械类
  { id: 'm11', name: '机械工程', category: '机械类', suitableInterest: ['机械设计', '制造', '工程', '物理'], avgSalary: 10000, employmentProspects: 'good' },
  { id: 'm12', name: '机械设计制造及其自动化', category: '机械类', suitableInterest: ['机械设计', '自动化', '制造', '工程'], avgSalary: 10500, employmentProspects: 'good' },
  { id: 'm13', name: '车辆工程', category: '机械类', suitableInterest: ['汽车', '交通', '机械', '新能源'], avgSalary: 11000, employmentProspects: 'good' },
  { id: 'm14', name: '精密仪器', category: '机械类', suitableInterest: ['仪器', '精密制造', '测量', '工程'], avgSalary: 11500, employmentProspects: 'good' },

  // 经济管理类
  { id: 'm15', name: '金融学', category: '经济管理类', suitableInterest: ['金融', '投资', '经济', '财务管理'], avgSalary: 14000, employmentProspects: 'excellent' },
  { id: 'm16', name: '会计学', category: '经济管理类', suitableInterest: ['会计', '财务', '审计', '企业管理'], avgSalary: 10000, employmentProspects: 'good' },
  { id: 'm17', name: '工商管理', category: '经济管理类', suitableInterest: ['管理', '商业', '企业', '市场营销'], avgSalary: 11000, employmentProspects: 'good' },
  { id: 'm18', name: '国际经济与贸易', category: '经济管理类', suitableInterest: ['国际贸易', '经济', '商务', '外语'], avgSalary: 11500, employmentProspects: 'good' },
  { id: 'm19', name: '人力资源管理', category: '经济管理类', suitableInterest: ['人力资源', '管理', '企业', '心理学'], avgSalary: 9000, employmentProspects: 'average' },

  // 医学类
  { id: 'm20', name: '临床医学', category: '医学类', suitableInterest: ['医学', '临床', '健康', '生物'], avgSalary: 12000, employmentProspects: 'excellent' },
  { id: 'm21', name: '口腔医学', category: '医学类', suitableInterest: ['口腔', '医学', '健康', '牙科'], avgSalary: 15000, employmentProspects: 'excellent' },
  { id: 'm22', name: '药学', category: '医学类', suitableInterest: ['药学', '化学', '医学', '生物'], avgSalary: 10000, employmentProspects: 'good' },
  { id: 'm23', name: '护理学', category: '医学类', suitableInterest: ['护理', '医学', '健康', '服务'], avgSalary: 8000, employmentProspects: 'good' },

  // 法学类
  { id: 'm24', name: '法学', category: '法学类', suitableInterest: ['法律', '司法', '法学', '社会'], avgSalary: 9000, employmentProspects: 'average' },
  { id: 'm25', name: '知识产权', category: '法学类', suitableInterest: ['知识产权', '法律', '专利', '创新'], avgSalary: 10000, employmentProspects: 'good' },

  // 建筑类
  { id: 'm26', name: '建筑学', category: '建筑类', suitableInterest: ['建筑', '设计', '城市规划', '美学'], avgSalary: 12000, employmentProspects: 'good' },
  { id: 'm27', name: '城乡规划', category: '建筑类', suitableInterest: ['城市规划', '设计', '建筑', '地理'], avgSalary: 11000, employmentProspects: 'good' },
  { id: 'm28', name: '土木工程', category: '建筑类', suitableInterest: ['土木', '建筑', '结构', '工程'], avgSalary: 10500, employmentProspects: 'good' },

  // 交通运输类
  { id: 'm29', name: '交通运输', category: '交通运输类', suitableInterest: ['交通', '物流', '运输', '规划'], avgSalary: 10000, employmentProspects: 'good' },
  { id: 'm30', name: '航海技术', category: '交通运输类', suitableInterest: ['航海', '船舶', '物流', '海洋'], avgSalary: 14000, employmentProspects: 'good' },

  // 教育类
  { id: 'm31', name: '教育学', category: '教育类', suitableInterest: ['教育', '教学', '心理学', '培训'], avgSalary: 8000, employmentProspects: 'average' },
  { id: 'm32', name: '小学教育', category: '教育类', suitableInterest: ['教育', '小学', '教学', '孩子'], avgSalary: 7500, employmentProspects: 'good' },
  { id: 'm33', name: '学前教育', category: '教育类', suitableInterest: ['教育', '学前', '孩子', '幼教'], avgSalary: 7000, employmentProspects: 'good' },

  // 文学类
  { id: 'm34', name: '汉语言文学', category: '文学类', suitableInterest: ['文学', '写作', '语言', '教育'], avgSalary: 8000, employmentProspects: 'average' },
  { id: 'm35', name: '英语', category: '文学类', suitableInterest: ['英语', '语言', '翻译', '外贸'], avgSalary: 9000, employmentProspects: 'good' },
  { id: 'm36', name: '新闻学', category: '文学类', suitableInterest: ['新闻', '传媒', '写作', '传播'], avgSalary: 8500, employmentProspects: 'average' },

  // 航空航天类
  { id: 'm37', name: '航空航天工程', category: '航空航天类', suitableInterest: ['航空', '航天', '工程', '机械'], avgSalary: 13000, employmentProspects: 'excellent' },
  { id: 'm38', name: '飞行器设计与工程', category: '航空航天类', suitableInterest: ['飞行器', '设计', '航空', '工程'], avgSalary: 13500, employmentProspects: 'excellent' },

  // 材料类
  { id: 'm39', name: '材料科学与工程', category: '材料类', suitableInterest: ['材料', '化学', '物理', '工程'], avgSalary: 10000, employmentProspects: 'good' },
  { id: 'm40', name: '新能源材料与器件', category: '材料类', suitableInterest: ['新能源', '材料', '化学', '环保'], avgSalary: 11000, employmentProspects: 'excellent' }
];

export const interestOptions = [
  { id: 'ai', name: '人工智能/机器学习', icon: 'brain' },
  { id: 'programming', name: '编程/软件开发', icon: 'code' },
  { id: 'data', name: '数据分析/统计', icon: 'bar-chart' },
  { id: 'electronics', name: '电子/硬件技术', icon: 'cpu' },
  { id: 'mechanical', name: '机械/制造工程', icon: 'settings' },
  { id: 'finance', name: '金融/投资', icon: 'trending-up' },
  { id: 'business', name: '商业/企业管理', icon: 'briefcase' },
  { id: 'medical', name: '医学/健康', icon: 'heart' },
  { id: 'law', name: '法律/司法', icon: 'scale' },
  { id: 'education', name: '教育/培训', icon: 'book-open' },
  { id: 'architecture', name: '建筑/设计', icon: 'home' },
  { id: 'media', name: '传媒/新闻', icon: 'tv' },
  { id: 'language', name: '语言/翻译', icon: 'globe' },
  { id: 'science', name: '基础科学研究', icon: 'flask-conical' },
  { id: 'transport', name: '交通运输/物流', icon: 'truck' },
  { id: 'energy', name: '能源/环保', icon: 'leaf' }
];

export const careerGoals = [
  { id: 'tech', name: '进入互联网/科技公司', icon: 'monitor' },
  { id: 'finance', name: '进入金融行业', icon: 'landmark' },
  { id: 'government', name: '考公务员/事业单位', icon: 'building' },
  { id: 'research', name: '继续深造/考研', icon: 'graduation-cap' },
  { id: 'abroad', name: '出国深造', icon: 'plane' },
  { id: 'startup', name: '创业', icon: 'rocket' },
  { id: 'state-owned', name: '进入国企央企', icon: 'building-2' },
  { id: 'foreign', name: '进入外企', icon: 'globe-2' }
];