const guiyangHotels = [
  { name: '贵阳半山酒店（甲秀楼青云市集店）', rating: '4.8', location: '甲秀楼/青云市集', highlight: '高档榜 No.1，步行景点逛吃', price: '¥400–600' },
  { name: '中濠国际（喷水池大十字店）', rating: '4.7', location: '喷水池核心', highlight: '全景落地窗，近地铁美食', price: '¥350–550' },
  { name: '贵阳云岩喷水池希尔顿欢朋', rating: '4.7', location: '喷水池', highlight: '亲子友好、洗衣健身', price: '¥400–600' },
  { name: '丽橙酒店·悦（大十字甲秀楼店）', rating: '4.8', location: '大十字', highlight: '性价比高', price: '¥300–450' },
]

const anshunHotels = [
  { name: '半山酒店（安顺古城黄果树大街店）', rating: '4.7', location: '安顺古城', highlight: '豪华榜 No.2，管家服务', price: '¥300–500' },
  { name: '安顺古城虹山湖路亚朵', rating: '4.5', location: '虹山湖/古城', highlight: '装修新，下楼虹湖', price: '¥350–500' },
  { name: '悦立达（顾府街店）', rating: '4.6', location: '顾府街', highlight: '出门即古城夜市夺夺粉', price: '¥250–400' },
  { name: '安顺西站美居', rating: '4.8', location: '安顺西站', highlight: '班车直达黄果树/龙宫，D3 出发便', price: '¥300–450' },
]

const xijiangHotels = [
  { name: '苗镜隐山别院（1号风雨桥）', rating: '口碑优', location: '1号风雨桥旁', highlight: '半山视野看灯火，少爬坡', price: '¥500–900' },
  { name: '悦枫轻奢（六号风雨桥店）', rating: '4.8', location: '六号风雨桥', highlight: '阳台浴缸看夜景，赠行李接送', price: '¥500–900' },
  { name: '栗上·Atelier（观景台店）', rating: '4.9', location: '观景台', highlight: '完美夜景，观光车直达', price: '¥600–1000' },
  { name: '悦宿轻奢（5号风雨桥）', rating: '口碑优', location: '5号风雨桥', highlight: '苗寨中心，全屋智能+浴缸', price: '¥500–900' },
]

export const days = [
  {
    day: 1, title: '贵阳抵达，城市夜游', mapLabel: '贵阳', location: '贵阳', transit: '龙洞堡机场 / 贵阳北站 / 贵阳站 → 市区', stay: '贵阳（喷水池 / 大十字）',
    schedule: [
      { time: '按车次', activity: '抵达贵阳，酒店寄存行李', duration: '—', tip: '住喷水池 / 大十字' },
      { time: '17:00–19:00', activity: '沿南明河步行至甲秀楼（免费，夜景最美）', duration: '2h', tip: '南明河对岸取景更出片' },
      { time: '19:00–21:00', activity: '青云市集：丝娃娃、豆腐圆子、冰浆', duration: '2h', tip: '贵阳最火夜市，24h 营业' },
    ],
    transportSections: [{ title: '落地后进市区', details: ['地铁 2 号线（机场→市区约 30min）、打车约 30–50 元。', '大件行李直接寄存酒店，后面几天只带随身小包。'] }],
    hotels: guiyangHotels,
    foodSections: [{ title: '甲秀楼 + 青云市集', items: ['包整·丝娃娃（甲秀楼景观店，4.6 / ¥56，边吃边看楼）、菌壹堂野生菌火锅、阿婆烧椒牛肉（下饭、饭点排队）、小娴番茄鸡。', '余孃洋芋粑、小平香辣素粉（民生路老字号）。', '周记留一手烤鱼（¥40、16 年老店）、胡佬陆铁签烤牛肉（折耳根蘸水）、雷家豆腐圆子（非遗）、但家香酥鸭、刘二妈米皮、何记冰粉、贵厨酸汤牛肉（排队王）、珍珍水果豆花、老幺夜市鸡丝豆花面、任姨妈牛肉粉。', '先嗦烤鱼/烤肉 → 卷份丝娃娃 → 豆腐圆子 → 冰粉解辣。'] }],
    tips: ['青云市集 18:00–22:00 最热闹。'],
  },
  {
    day: 2, title: '黄果树瀑布', mapLabel: '黄果树 / 安顺', location: '黄果树 → 安顺', transit: '贵阳 → 黄果树 → 安顺', stay: '安顺',
    schedule: [
      { time: '07:30', activity: '贵阳出发（景区直通车 / 高铁+汽车）', duration: '2–2.5h', tip: '早出发避团' },
      { time: '10:00', activity: '陡坡塘（86 版《西游记》取景）', duration: '30–45min', tip: '' },
      { time: '11:00', activity: '天星桥（下半程：银链坠潭、天星洞）', duration: '2–2.5h', tip: '台阶湿滑' },
      { time: '14:00', activity: '大瀑布 + 水帘洞（需提前约时段）', duration: '3h', tip: '备雨衣防水' },
      { time: '17:30', activity: '赴安顺市区入住，逛顾府街夜市', duration: '—', tip: '住安顺比住景区便宜' },
    ],
    transportSections: [{ title: '方案 A：高铁 + 接驳', details: ['贵阳北 → 安顺西（二等座约 ¥46.5，31–46min）→ 安顺西客运枢纽换景区巴士（约 1h/班，车程 1h）。', '人均 ¥68–76。'] }, { title: '方案 B：景区直通车', details: ['贵阳旅游集散中心（延安西路）/ 金阳客运站 → 黄果树，单程 ¥60–66，往返 ¥130，约 2–2.5h。', '“好行景区直通车”“贵州畅行”购票。'] }, { title: '包车', details: ['网约车单程 ¥300–400；全天包车 ¥600–1200/车。2–4 人正常出游选公共交通。'] }],
    hotels: anshunHotels,
    foodSections: [{ title: '顾府街夜市', items: ['夺夺粉（必吃）、裹卷、儒林路小吃。', '悦立达出门即达。'] }],
    tips: ['水帘洞需提前预约时段。'],
  },
  {
    day: 3, title: '龙宫与屯堡', mapLabel: '龙宫 · 天龙屯堡', location: '安顺 → 贵阳', transit: '安顺 → 龙宫 → 天龙屯堡 / 旧州古镇 → 安顺西 → 贵阳北', stay: '贵阳（同 D1）',
    schedule: [
      { time: '09:00', activity: '龙宫（乘船进地下暗河，洞内约 16℃）', duration: '4h', tip: '带薄外套' },
      { time: '14:00', activity: '天龙屯堡 / 旧州古镇（明代汉人后裔、地戏、石头寨）', duration: '2–3h', tip: '距安顺约 40–60min' },
      { time: '17:30', activity: '返贵阳入住', duration: '31–46min', tip: '高铁安顺西→贵阳北（¥46.5）' },
    ],
    transportSections: [
      { title: '路线', details: ['主线从安顺住宿点出发串联龙宫与屯堡；龙宫 → 天龙屯堡约 28km/30min；屯堡 → 安顺西站高铁回贵阳。', '若从黄果树景区直接转场：黄果树 → 龙宫约 30km/30min。'] },
      { title: '公共交通', details: ['公共交通需先回安顺中转，班次少、绕路，不推荐。'] },
      { title: '包车/拼车', details: ['安顺周边"龙宫 + 屯堡"一日游约 ¥400–800/车（含接送），傍晚送到安顺西站坐高铁回贵阳。也可黄果树玩完打车去龙宫（¥80–120）再转屯堡。'] },
    ],
    hotels: [], hotelNote: '同 D1，连住可问续住价：贵阳半山 / 中濠国际 / 希尔顿欢朋 / 丽橙，挑 1。',
    foodSections: [{ title: '安顺与贵阳晚餐', items: ['午餐在安顺市区吃儒林路小吃、裹卷。', '晚上回贵阳可去民生路/青云市集补一顿。'] }],
    tips: ['洞内避暑但温度低，薄外套随身带。'],
  },
  {
    day: 4, title: '西江千户苗寨', mapLabel: '西江千户苗寨', location: '贵阳 → 凯里南 → 西江', transit: '贵阳北 → 凯里南 → 西江景区', stay: '西江',
    schedule: [
      { time: '08:30', activity: '贵阳北 → 凯里南高铁（约 40–60min）', duration: '1h', tip: '12306' },
      { time: '10:00', activity: '凯里南 → 西江景区直通车 / 打车', duration: '40min', tip: '西门近观景台、北门近商业街' },
      { time: '13:00', activity: '轻装入寨：苗族博物馆、风雨桥、古街', duration: '2–3h', tip: '只带一晚行李' },
      { time: '17:00', activity: '观景台等日落，蓝调看万家灯火', duration: '1.5h', tip: '住一号风雨桥附近少爬坡' },
      { time: '19:30', activity: '长桌宴 / 酸汤鱼，白水河散步', duration: '2h', tip: '尝高山流水敬酒礼仪' },
    ],
    transportSections: [{ title: '贵阳→西江，公共交通推荐', details: ['贵阳北 → 凯里南（二等座约 ¥58，最快 38min）→ 凯里南站右转乘西江直通车（每 1h 一班，¥35，约 50min，班次 8:30–17:40）。', '全程约 4–4.5h，人均约 ¥180–250。', '自驾不推荐（停车 ¥20/天 + 山上还要步行/观光车，不如高铁）。'] }],
    hotels: xijiangHotels,
    foodSections: [{ title: '寨内晚餐', items: ['长桌宴 / 酸汤鱼 / 酸汤牛肉（苗家特色，傍晚前解决，夜间餐饮有限）。', '配糯米饭、腊肉、苗家酸肉。', '想省力选 1号/5号风雨桥附近餐厅，看夜景方便。'] }],
    tips: ['带“行李接送”的住宿优先。'],
  },
  {
    day: 5, title: '西江晨游与朗德上寨', mapLabel: '朗德上寨', location: '西江 → 朗德上寨 → 西江', transit: '西江 ↔ 朗德上寨', stay: '西江（同 D4 续住）',
    schedule: [
      { time: '07:00', activity: '趁人少拍晨雾吊脚楼', duration: '1h', tip: '' },
      { time: '09:30', activity: '村巷慢游、补看展馆', duration: '2h', tip: '' },
      { time: '12:00', activity: '包车/拼车赴朗德上寨（约 40min）', duration: '40min', tip: '12 道拦门酒迎客' },
      { time: '15:00', activity: '朗德原生态苗寨、风雨桥、田园', duration: '2h', tip: '比西江安静、商业化低' },
      { time: '17:30', activity: '返回西江续住，取行李', duration: '—', tip: '本路线固定回西江；原稿另列“住朗德”为备选' },
    ],
    transportSections: [{ title: '西江→朗德，拼车推荐', details: ['朗德在凯里→西江途中（距西江约 17–20km），公共交通班次少、耗等；拼车约 ¥30–50/人、包车约 ¥100–200/车，30–40min 直达，随玩随走。', '玩完建议回西江续住（D6 直通车→凯里南→高铁回贵阳），或顺去凯里南住一晚（更顺，少一次换乘）。'] }],
    hotels: [], hotelNote: '主路线同 D4 续住；若临时改线，也可住朗德（非本路线主住宿方案）。',
    foodSections: [{ title: '朗德与西江', items: ['朗德体验 12 道拦门酒迎客仪式；午餐尝苗家土菜、糯米饭。', '西江/朗德餐饮偏简朴，辣度主动沟通。'] }],
    tips: ['朗德比西江安静、商业化低。'],
  },
  {
    day: 6, title: '贵阳半日与返程', mapLabel: '贵阳返程', location: '西江 → 凯里南 → 贵阳', transit: '西江 → 凯里南 → 贵阳北 → 返程', stay: '返程前取行李（同 D1）',
    schedule: [
      { time: '08:30', activity: '西江 → 凯里南 → 贵阳北', duration: '1.5h', tip: '直通车 ¥35 + 高铁 ¥58' },
      { time: '上午', activity: '贵州省博物馆（需预约）/ 或青岩古镇', duration: '2–3h', tip: '二选一即可' },
      { time: '下午', activity: '民生路吃肠旺面，回酒店取行李', duration: '60min', tip: '预留进站时间' },
    ],
    transportSections: [{ title: '西江/凯里→贵阳，公共交通', details: ['西江直通车 → 凯里南（¥35，50min）→ 高铁凯里南 → 贵阳北（¥58，38min）；或西江直达贵阳直通车（约 4h）。', '到点返程选公共交通。'] }],
    hotels: [], hotelNote: '同 D1，返程前取行李。',
    foodSections: [{ title: '民生路 / 蔡家街 / 二七路', items: ['金牌罗记肠旺面（蔡家街，¥8 起，凌晨 5 点开）、南门口肠旺面（护国路）、民生路香酥鸭/碗饵糕/张记豆腐圆子、二七路丝娃娃/雷家豆腐圆子/冰浆/蛋包洋芋、六广门毛阿姨糯米饭、丁家·徐家脆哨（伴手礼）。'] }, { title: '青岩古镇（若 D6 选青岩）', items: ['王万妈卤猪脚（状元蹄，上过《舌尖》）、金必轩（本地人性价比）、谢家百年糕粑稀饭、黄老伯玫瑰糖（伴手礼）、双双酸萝卜、青岩米豆腐/玫瑰冰粉。', '别在入口主街吃，往里走更便宜；卤猪脚+糕粑稀饭+冰粉套餐约 ¥30。'] }, { title: '省博物馆附近（若 D6 选省博）', items: ['看完展去新印 1950 文创园吃酸汤牛肉、豆花渎鱼（观山湖片区，安静正餐不挤夜市）。'] }],
    tips: ['贵州省博物馆需提前预约。'],
  },
]
