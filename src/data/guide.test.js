import { describe, expect, it } from 'vitest'
import {
  foodTips,
  generalWarnings,
  guideMeta,
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
    expect(preTripOverview.reservations).toEqual([
      '黄果树门票 + 水帘洞时段（“安旅通”小程序，实名预约，名额有限）',
      '西江千户苗寨门票 + 观光车（官方小程序）',
      '贵州省博物馆（免费，需提前预约）',
      '甲秀楼（“一码游贵州”小程序，免费）',
      '往返高铁票（12306，暑期尽早）',
    ])
    expect(transportComparison).toHaveLength(6)
    expect(staySummary).toHaveLength(6)
    expect(foodTips.length).toBeGreaterThan(0)
    expect(generalWarnings.length).toBeGreaterThan(0)
    expect(preTripOverview.budget.total).toBe('约 2700–4300')
    expect(generalWarnings).toContain('西江苗寨无行李车，大件务必寄存贵阳；房间潮润、虫蚊多，带防蚊、自备洗漱。')
    expect(generalWarnings).toContain('包车选正规公司，谈好“按天/按里程/是否含等候/过路费谁出”再上车。')
    expect(guideMeta.sourceNote).toBe('票价、班次、房价、营业时间以官方实时为准，出行前请二次核实；暑期（7–8 月）整体上浮 30%–50%，建议提前 2–4 周订。')
    expect(guideMeta.pace).toBe('每天车程 ≤ 2.5h，不赶路')
    expect(guideMeta.weather).toContain('18–28℃')
    expect(guideMeta.sourceComposition).toContain('携程 / 新浪旅游 / 搜狐 / 贵阳本地宝 / 贵阳广播电视台')
  })

  it('preserves exact transport prices and the D3 charter/carpool option', () => {
    expect(transportComparison[1]).toEqual({
      segment: 'D2 贵阳→黄果树',
      publicCost: '¥68–76',
      charterCost: '¥300–400 单程 / ¥600–1200 全天',
      advice: '公交 ✅',
    })
    expect(transportComparison[2]).toEqual({
      segment: 'D3 安顺→龙宫→屯堡→贵阳',
      publicCost: '公交极碎（不推荐）',
      charterCost: '¥400–800（安顺段）',
      advice: '包车/一日游 ✅',
    })
    expect(transportComparison[4]).toEqual({
      segment: 'D5 西江→朗德→回',
      publicCost: '¥20–35（公交）',
      charterCost: '拼车 ¥30–50/人 / 包车 ¥100–200',
      advice: '拼车 ✅',
    })

    expect(days[2].transportSections).toContainEqual({
      title: '包车/拼车',
      details: ['安顺周边"龙宫 + 屯堡"一日游约 ¥400–800/车（含接送），傍晚送到安顺西站坐高铁回贵阳。也可黄果树玩完打车去龙宫（¥80–120）再转屯堡。'],
    })
  })

  it('contains six complete day chapters with the new route', () => {
    expect(days).toHaveLength(6)
    expect(days.reduce((count, current) => count + current.schedule.length, 0)).toBe(24)
    expect(days.map(({ title }) => title)).toEqual([
      '贵阳抵达，城市夜游',
      '黄果树瀑布',
      '龙宫与屯堡',
      '西江千户苗寨',
      '西江晨游与朗德上寨',
      '贵阳半日与返程',
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
    expect(foodText).toContain('卤猪脚+糕粑稀饭+冰粉套餐约 ¥30')
  })
})
