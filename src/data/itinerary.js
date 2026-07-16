/**
 * @typedef {Object} DayPlan
 * @property {number} day
 * @property {string} title
 * @property {string} location
 * @property {string} transit
 * @property {string} stay
 * @property {{ label: string, time: string, detail: string }[]} periods
 * @property {string[]} highlights
 * @property {string[]} tips
 */

/** @type {DayPlan[]} */
export const itinerary = [
  {
    day: 1,
    title: "抵达贵阳",
    location: "贵阳",
    transit: "出发地 → 贵阳北站",
    stay: "贵阳北站或市中心",
    periods: [
      { label: "抵达", time: "按车次", detail: "高铁抵达贵阳，前往酒店寄存行李。" },
      { label: "傍晚", time: "17:00–19:00", detail: "沿南明河步行至甲秀楼，看城市灯光渐亮。" },
      { label: "夜间", time: "19:00–21:00", detail: "青云市集尝丝娃娃、豆腐圆子，早点休息。" },
    ],
    highlights: ["甲秀楼", "青云市集", "贵州初味"],
    tips: ["晚到可直接休息", "把第二天雨具与证件装入随身包"],
  },
  {
    day: 2,
    title: "黄果树瀑布",
    location: "安顺 · 镇宁",
    transit: "贵阳 → 黄果树 → 贵阳",
    stay: "贵阳",
    periods: [
      { label: "清晨", time: "06:30–08:30", detail: "早出发，包车或高铁转景区接驳抵达游客中心。" },
      { label: "上午", time: "09:00–11:00", detail: "先游陡坡塘，沿西游步道感受丰水期声浪。" },
      { label: "午后", time: "11:30–15:00", detail: "天星桥择精华段游览，注意湿滑台阶。" },
      { label: "傍晚", time: "15:20–17:30", detail: "大瀑布与水帘洞，结束后返回贵阳。" },
    ],
    highlights: ["陡坡塘", "天星桥", "黄果树大瀑布"],
    tips: ["门票与水帘洞分时实名预约", "穿防滑鞋，电子设备准备防水袋"],
  },
  {
    day: 3,
    title: "荔波小七孔",
    location: "黔南 · 荔波",
    transit: "贵阳北 → 荔波站 → 小七孔",
    stay: "荔波古镇或景区东门",
    periods: [
      { label: "清晨", time: "07:00–10:00", detail: "高铁至荔波站，接驳到景区并从西门进入。" },
      { label: "上午", time: "10:00–12:30", detail: "卧龙潭、鸳鸯湖，顺地势开始山水漫游。" },
      { label: "午后", time: "12:30–17:30", detail: "翠谷瀑布、水上森林、68级跌水与小七孔古桥。" },
      { label: "夜间", time: "18:30–20:30", detail: "住荔波，吃酸汤鱼或瑶山风味。" },
    ],
    highlights: ["卧龙潭", "水上森林", "小七孔古桥"],
    tips: ["优先西门进、东门出", "雨后关注临时封闭公告"],
  },
  {
    day: 4,
    title: "西江千户苗寨",
    location: "黔东南 · 雷山",
    transit: "荔波 → 西江千户苗寨",
    stay: "西江景区内",
    periods: [
      { label: "上午", time: "08:30–12:00", detail: "包车或拼车前往西江，途中休息一次。" },
      { label: "午后", time: "13:00–16:30", detail: "轻装入寨，参观苗族博物馆、风雨桥与古街。" },
      { label: "黄昏", time: "17:00–19:30", detail: "上观景台等日落，蓝调时刻看万家灯火。" },
      { label: "夜间", time: "19:30–21:00", detail: "长桌宴或酸汤菜，沿白水河慢慢散步。" },
    ],
    highlights: ["苗族博物馆", "风雨桥", "观景台夜景"],
    tips: ["只带一晚轻便行李", "优先选择靠近一号风雨桥的住宿"],
  },
  {
    day: 5,
    title: "苗寨慢游与晚归贵阳",
    location: "西江 → 贵阳",
    transit: "西江 → 凯里南 → 贵阳北",
    stay: "贵阳",
    periods: [
      { label: "清晨", time: "07:00–09:00", detail: "趁人少走进村巷，拍吊脚楼与晨雾。" },
      { label: "上午", time: "09:30–12:00", detail: "沿白水河与风雨桥慢走，补看前一日错过的展馆与村巷。" },
      { label: "午后", time: "12:00–16:30", detail: "午餐后继续体验苗寨，留足时间取行李并乘接驳出寨。" },
      { label: "傍晚", time: "17:00–20:30", detail: "傍晚经凯里南返回贵阳，晚上抵达酒店休息。" },
    ],
    highlights: ["苗寨晨雾", "村巷慢游", "晚归贵阳"],
    tips: ["接驳与高铁车次按实际出发日衔接", "大件行李继续寄存在贵阳酒店更省力"],
  },
  {
    day: 6,
    title: "贵阳半日与高铁返程",
    location: "贵阳",
    transit: "贵阳市区 → 贵阳北站 → 出发地",
    stay: "返程",
    periods: [
      { label: "上午", time: "08:30–11:30", detail: "早餐后轻逛文昌阁、电台街；若 D1 未去甲秀楼，可顺路补游。" },
      { label: "午间", time: "11:30–13:30", detail: "在老城吃一碗肠旺面或贵阳粉，随后回酒店取行李。" },
      { label: "下午", time: "按车次", detail: "前往贵阳北站并预留至少60分钟进站，下午乘高铁返程。" },
    ],
    highlights: ["文昌阁", "电台街", "贵阳早餐"],
    tips: ["D1 已游甲秀楼则 D6 不再重复", "按返程车次倒推取行李和进站时间"],
  },
];
