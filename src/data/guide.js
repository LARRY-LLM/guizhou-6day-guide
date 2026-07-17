export const guideMeta = {
  title: '贵州六日完整旅行手记',
  subtitle: '黄果树 · 西江苗寨 · 贵阳',
  season: '7–8 月',
  duration: '6 天 5 晚',
  verifiedAt: '出发前二次核验',
  route: '贵阳 → 黄果树/安顺 → 龙宫/屯堡 → 贵阳 → 西江 → 朗德 → 贵阳返程',
  pace: '每天车程 ≤ 2.5h，不赶路',
  weather: '7–8 月，18–28℃，避暑但多变',
  sourceComposition: '本文整合自行程主线、逐段交通攻略、每晚住宿推荐、贵阳美食逛吃地图；信息综合自携程 / 新浪旅游 / 搜狐 / 贵阳本地宝 / 贵阳广播电视台等公开游记与攻略（含小红书、抖音风格游客真实反馈）。',
  sourceDisclaimer: '以上信息基于公开资料整理，实际票价、班次、房价、预约政策以各景区 / 平台官方发布为准。',
  sourceNote: '票价、班次、房价、营业时间以官方实时为准，出行前请二次核实；暑期（7–8 月）整体上浮 30%–50%，建议提前 2–4 周订。',
  navigation: ['路线地图', '行前总览', '每日行程', '交通住宿', '吃喝避坑'],
}

export const preTripOverview = {
  clothing: [
    '短袖 T × 3–4、薄长袖 × 1–2（防晒 / 早晚）',
    '薄外套 × 1（必备：溶洞 16℃、山顶风、车内空调）',
    '薄长裤 × 2（防晒防蚊）、短裤 × 1（玩水）、防滑运动鞋、凉鞋（玩水）',
    '轻便雨衣 + 折叠伞（7–8 月阵雨频繁）、手机防水袋',
    '帽子、墨镜、防晒霜（高原紫外线强）、充电宝',
  ],
  essentials: [
    '贵州山路弯道多，易晕车备药；酸辣度主动沟通，避免水土不服。',
    '不坐黑车，用合规直通车 / 12306；西江寨内无行李车，大箱寄存贵阳。',
    '折耳根贵阳无处不在，不吃的一定提前说忌口。',
  ],
  budget: {
    rows: [
      { label: '交通', value: '600–900' },
      { label: '住宿（5 晚）', value: '900–1500' },
      { label: '门票', value: '500–700' },
      { label: '餐饮', value: '500–800' },
      { label: '其他', value: '200–400' },
    ],
    total: '约 2700–4300',
    note: '人均，不含往返大交通；暑期周末上浮。',
  },
  reservations: [
    '黄果树门票 + 水帘洞时段（“安旅通”小程序，实名预约，名额有限）',
    '西江千户苗寨门票 + 观光车（官方小程序）',
    '贵州省博物馆（免费，需提前预约）',
    '甲秀楼（“一码游贵州”小程序，免费）',
    '往返高铁票（12306，暑期尽早）',
  ],
}

export const transportComparison = [
  { segment: 'D1 抵达贵阳', publicCost: '打车 30–50', charterCost: '—', advice: '地铁/打车' },
  { segment: 'D2 贵阳→黄果树', publicCost: '¥68–76', charterCost: '¥300–400 单程 / ¥600–1200 全天', advice: '公交 ✅' },
  { segment: 'D3 安顺→龙宫→屯堡→贵阳', publicCost: '公交极碎（不推荐）', charterCost: '¥400–800（安顺段）', advice: '包车/一日游 ✅' },
  { segment: 'D4 贵阳→西江', publicCost: '¥180–250', charterCost: '¥300–400', advice: '公交 ✅' },
  { segment: 'D5 西江→朗德→回', publicCost: '¥20–35（公交）', charterCost: '拼车 ¥30–50/人 / 包车 ¥100–200', advice: '拼车 ✅' },
  { segment: 'D6 西江/凯里→贵阳', publicCost: '¥180–250', charterCost: '¥300–400', advice: '公交 ✅' },
]

export const staySummary = [
  { night: 'D1', location: '贵阳', recommendation: '贵阳半山酒店（甲秀楼青云市集店）' },
  { night: 'D2', location: '安顺', recommendation: '半山酒店（安顺古城店）或 悦立达（顾府街）' },
  { night: 'D3', location: '贵阳', recommendation: '同 D1（连住问续住价）' },
  { night: 'D4', location: '西江', recommendation: '苗镜隐山别院（1号风雨桥）' },
  { night: 'D5', location: '西江', recommendation: '同 D4（续住）' },
  { night: 'D6', location: '贵阳', recommendation: '同 D1（返程前取行李）' },
]

export const foodTips = [
  { title: '折耳根', detail: '贵阳几乎无处不在，不吃的一定提前说“不要折耳根”。' },
  { title: '辣度', detail: '“微辣”刚好，“不辣”会少灵魂；不能吃辣选麻酱蘸水（甜咸口，游客友好）。' },
  { title: '伴手礼', detail: '但家香酥鸭、丁家/徐家脆哨、青岩玫瑰糖、鸡辣椒、刺梨干。' },
  { title: '预算', detail: '餐饮人均约 500–800（6 天），正餐人均 40–80，小吃 10–30，夜市可拼着吃多样。' },
]

export const generalWarnings = [
  '西江苗寨无行李车，大件务必寄存贵阳；房间潮润、虫蚊多，带防蚊、自备洗漱。',
  '水帘洞路窄湿滑、排队久，旺季可取舍；黄果树早 8 点前到避开团。',
  '不坐景区门口/酒店拉客的“拼车黑车”，只走合规客运/旅行社专线（12306、好行、携程汽车票）。',
  '西江寨内住宿暑期提前约 1 个月订；想省力选 1号/5号风雨桥附近，别硬住最高观景台（爬坡累）。',
  '包车选正规公司，谈好“按天/按里程/是否含等候/过路费谁出”再上车。',
]
