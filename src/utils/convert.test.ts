import { describe, it, expect } from 'vitest'
import type { HEXColor, RGBColor, HSLColor } from '@/types/colors'
import {
  convertHEXColorToRGBColor,
  convertRGBColorToHEXColor,
  convertHEXColorToHSLColor,
  convertHSLColorToHEXColor
} from './convert'

describe('测试 convertHEXColorToRGBColor 函数', () => {
  it('#E53E3E -> [229, 62, 62]', () => {
    const hexColor: HEXColor = '#E53E3E'
    const rgbColor: RGBColor = [229, 62, 62]
    expect(convertHEXColorToRGBColor(hexColor)).toEqual(rgbColor)
  })
})

describe('测试 convertRGBColorToHEXColor 函数', () => {
  it('[229, 62, 62] -> #E53E3E', () => {
    const rgbColor: RGBColor = [229, 62, 62]
    const hexColor: HEXColor = '#E53E3E'
    expect(convertRGBColorToHEXColor(rgbColor)).toEqual(hexColor)
  })
})

describe('测试 convertHEXColorToHSLColor 函数', () => {
  it('#ED8936 -> [27.21, 83.56, 57.06]', () => {
    const hexColor: HEXColor = '#ED8936'
    const hslColor: HSLColor = [27.21, 83.56, 57.06]
    expect(convertHEXColorToHSLColor(hexColor)).toEqual(hslColor)
  })
})

describe('测试 convertHSLColorToHEXColor 函数', () => {
  it('[27.21, 83.56, 57.06] -> #ED8936', () => {
    const hslColor: HSLColor = [27.21, 83.56, 57.06]
    const hexColor: HEXColor = '#ED8936'
    expect(convertHSLColorToHEXColor(hslColor)).toEqual(hexColor)
  })
})
