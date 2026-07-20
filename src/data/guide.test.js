import { describe, expect, it } from 'vitest'
import {
  foodTips,
  generalWarnings,
  guideMeta,
  intercityTravel,
  preTripOverview,
  staySummary,
  transportComparison,
} from './guide.js'
import { days } from './days.js'

describe('complete six-day Guizhou guide data', () => {
  it('exports the complete guide-level sections', () => {
    expect(guideMeta).toBeTruthy()
    expect(guideMeta.verifiedAt).toBe('出发前二次核验')
    expect(preTripOverview).toMatchObject({ budget: expect.any(Object) })
    expect(intercityTravel.options).toHaveLength(2)
    expect(intercityTravel.options[0]).toMatchObject({
      mode: '高铁',
      price: '广州南→贵阳北 二等座 ¥350–480',
      duration: '4–5h',
    })
    expect(intercityTravel.options[1].note).toContain('夏季雷雨易延误/取消')
    expect(intercityTravel.transfers).toContain('贵阳北/东站→市区 地铁 1 号线 ¥5 / 打车 ¥15–30')
    expect(intercityTravel.booking).toContain('高铁提前 15 天放票')
    expect(preTripOverview.reservations).toHaveLength(6)
    expect(preTripOverview.reservations).toContain('龙宫门票 + 船票（“安旅通”小程序）')
    expect(preTripOverview.reservations).toContain('黔灵山（免费，需线上预约，公众号/小程序）')
    expect(transportComparison).toHaveLength(6)
    expect(staySummary).toHaveLength(6)
    expect(foodTips.length).toBeGreaterThan(0)
    expect(generalWarnings.length).toBeGreaterThan(0)
    expect(preTripOverview.budget.total).toBe('约 2700–4300')
    expect(preTripOverview.budget.roundTrip).toBe('＋广州↔贵阳高铁往返：约 700–960')
    expect(generalWarnings).toContain('西江苗寨无行李车，大件务必寄存贵阳；房间潮润、虫蚊多，带防蚊、自备洗漱。')
    expect(generalWarnings).toContain('包车选正规公司，谈好“按天/按里程/是否含等候/过路费谁出”再上车。')
    expect(guideMeta.sourceNote).toBe('票价、班次、房价、营业时间以官方实时为准，出行前请二次核实；暑期（7–8 月）整体上浮 30%–50%，建议提前 2–4 周订。')
    expect(guideMeta.pace).toBe('每天车程 ≤ 2.5h，松弛不赶')
    expect(guideMeta.weather).toContain('18–28℃')
    expect(guideMeta.sourceComposition).toContain('携程 / 新浪旅游 / 腾讯 / 本地宝')
  })

  it('preserves the source transport comparison and lodging sequence', () => {
    expect(transportComparison[1]).toEqual({
      segment: 'D2 贵阳→黄果树→安顺',
      publicCost: '¥68–76',
      charterCost: '¥300–400 单程 / ¥600–1200 全天',
      advice: '公交 ✅',
    })
    expect(transportComparison[2]).toEqual({
      segment: 'D3 龙宫→屯堡→安顺西→凯里南→下司',
      publicCost: '高铁 ¥105 + 打车 20–30',
      charterCost: '安顺段 ¥400–800',
      advice: '安顺段包车 ✅',
    })
    expect(transportComparison[3]).toEqual({
      segment: 'D4 下司→朗德→西江',
      publicCost: '分段拼车 ¥30–50/人',
      charterCost: '整车 ¥200–400（含等候）',
      advice: '包车 ✅（带行李省事）',
    })

    expect(staySummary.map(({ location }) => location)).toEqual([
      '贵阳', '安顺', '下司古镇', '西江', '贵阳', '返程广州',
    ])
  })

  it('contains six complete day chapters with the new route', () => {
    expect(days).toHaveLength(6)
    expect(days.reduce((count, current) => count + current.schedule.length, 0)).toBe(29)
    expect(days.map(({ title }) => title)).toEqual([
      '贵阳抵达，城市夜游',
      '黄果树瀑布',
      '龙宫与屯堡，转场下司',
      '下司、朗德与西江',
      '西江慢游，返回贵阳',
      '黔灵山与返程广州',
    ])

    expect(days.map(({ stay }) => stay)).toEqual([
      '贵阳', '安顺', '下司古镇', '西江', '贵阳', '返程广州',
    ])

    days.forEach((day) => {
      expect(day).toMatchObject({
        day: expect.any(Number),
        title: expect.any(String),
        mapLabel: expect.any(String),
        location: expect.any(String),
        transit: expect.any(String),
        stay: expect.any(String),
        schedule: expect.any(Array),
        transportSections: expect.any(Array),
        hotels: expect.any(Array),
        foodSections: expect.any(Array),
        tips: expect.any(Array),
      })
    })
  })

  it('contains every source-exclusive long-form route section', () => {
    const allText = JSON.stringify({ intercityTravel, preTripOverview, days })
    for (const phrase of [
      '啤酒小镇',
      '不要进陡坡塘景区',
      '霞客亭',
      '双程大扶梯票',
      '下司古镇 临江民宿',
      '北门牌坊',
      '清水江风雨桥',
      '凯里南 → 贵阳北 高铁',
      '南门 → 索道上山',
      '熊猫馆看“星宝”“海滨”',
      '青岩古镇（备选）',
    ]) {
      expect(allText).toContain(phrase)
    }
  })

  it('preserves all twelve named hotel choices and removes the old Xiaoqikong route', () => {
    const hotels = days.flatMap((day) => day.hotels)
    expect(hotels).toHaveLength(12)
    expect(hotels.map(({ name }) => name)).toContain('贵阳半山酒店（甲秀楼青云市集店）')
    expect(hotels.map(({ name }) => name)).toContain('栗上·Atelier（观景台店）')
    expect(hotels).toContainEqual({
      name: '贵阳半山酒店（甲秀楼青云市集店）',
      rating: '4.8',
      location: '甲秀楼/青云市集',
      highlight: '高档榜 No.1，步行景点逛吃',
      price: '¥400–600',
    })
    expect(hotels).toContainEqual({
      name: '安顺西站美居',
      rating: '4.8',
      location: '安顺西站',
      highlight: '班车直达黄果树/龙宫，D3 出发便',
      price: '¥300–450',
    })
    expect(hotels).toContainEqual({
      name: '悦立达（顾府街店）',
      rating: '4.6',
      location: '顾府街',
      highlight: '出门即古城夜市夺夺粉',
      price: '¥250–400',
    })
    expect(hotels).toContainEqual({
      name: '栗上·Atelier（观景台店）',
      rating: '4.9',
      location: '观景台',
      highlight: '完美夜景，观光车直达',
      price: '¥600–1000',
    })
    expect(JSON.stringify({ days, guideMeta })).not.toContain('小七孔')
  })

  it('keeps named restaurants and their source prices discoverable', () => {
    const foodText = days.flatMap((day) => day.foodSections).flatMap((section) => section.items).join('\n')
    expect(foodText).toContain('包整·丝娃娃（甲秀楼景观店，4.6 / ¥56，边吃边看楼）')
    expect(foodText).toContain('周记留一手烤鱼（¥40、16 年老店）')
    expect(foodText).toContain('金牌罗记肠旺面（蔡家街，¥8 起，凌晨 5 点开）')
    expect(foodText).toContain('王万妈卤猪脚（状元蹄，上过《舌尖》）')
  })
})
