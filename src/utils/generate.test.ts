import { describe, it, expect } from 'vitest'
import { generateColors } from './generate'
import type { HEXColor } from '@/types/colors'

describe('测试 generateColors 函数', () => {
  it('忽略 stepCount 参数，默认生成 7 个颜色', () => {
    const baseColor: HEXColor = '#E53E3E'
    const colors = generateColors(baseColor)
    expect(colors.length).toBe(7)
  })
  it('传入 baseColor 基色，应当被包含在生成的颜色列表中', () => {
    const baseColor: HEXColor = '#E53E3E'
    const colors = generateColors(baseColor)
    expect(colors.includes(baseColor)).toBe(true)
  })
})
