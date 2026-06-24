import type { HEXColor, HSLColor } from '@/types/colors'
import { convertHEXColorToHSLColor, convertHSLColorToHEXColor } from './convert'

/**
 * 根据基础颜色生成色阶颜色列表
 * @param   baseColor {@link HEXColor} 类型   - 基础颜色
 * @param   stepCount number 类型             - 色阶数量（少于 7 个时，自动补齐为 7 个）
 * @returns hexColors {@link HEXColor}[] 类型 - 色阶颜色列表
 */
export function generateColors(
  baseColor: HEXColor,
  stepCount?: number
): HEXColor[] {
  const hexColors: HEXColor[] = []

  const [rawH, rawS, rawL] = convertHEXColorToHSLColor(baseColor)

  const levelCount = Number(stepCount || 0) < 7 ? 7 : Number(stepCount)

  const minL = 20
  const maxL = 90
  const palette: { hsl: HSLColor; hex: HEXColor; level?: number }[] = []

  /**
   * 总阶数减去主色1阶，剩余分给浅色、深色两侧
   */
  const sideTotal = levelCount - 1
  const lightSideCount = Math.ceil(sideTotal / 2)
  const darkSideCount = Math.floor(sideTotal / 2)

  const getNewS = (rawS: number, newL: number): number => {
    let newS: number

    switch (true) {
      case rawS < 2:
        newS = 0
        break
      case newL > 70:
        newS = rawS * 0.85
        break
      case newL < 30:
        newS = rawS * 1.15
        break
      default:
        newS = rawS
    }

    return newS
  }

  /**
   * 生成浅色段：maxL → rawL，不包含 rawL
   */
  if (lightSideCount > 0) {
    const lightStep = (maxL - rawL) / lightSideCount
    for (let i = 0; i < lightSideCount; i += 1) {
      const newL = Number((maxL - lightStep * i).toFixed(2))
      const newS = Number(getNewS(rawS, newL).toFixed(2))
      const hslColor: HSLColor = [rawH, newS, newL]
      const hexColor: HEXColor = convertHSLColorToHEXColor(hslColor)
      palette.push({ hsl: hslColor, hex: hexColor })
      hexColors.push(hexColor)
    }
  }

  /**
   * 插入基础颜色（保证一定存在）
   */
  const newS = rawS < 2 ? 0 : rawS
  palette.push({ hsl: [rawH, newS, rawL], hex: baseColor })
  hexColors.push(baseColor)

  /**
   * 生成深色段：rawL → minL，不包含 rawL
   */
  if (darkSideCount > 0) {
    const darkStep = (rawL - minL) / darkSideCount
    for (let i = 1; i <= darkSideCount; i += 1) {
      const newL = Number((rawL - darkStep * i).toFixed(2))
      const newS = Number(getNewS(rawS, newL).toFixed(2))
      const hslColor: HSLColor = [rawH, newS, newL]
      const hexColor: HEXColor = convertHSLColorToHEXColor(hslColor)
      palette.push({ hsl: hslColor, hex: hexColor })
      hexColors.push(hexColor)
    }
  }

  /**
   * 补充 level 序号，从 0 开始递增
   */
  palette.forEach((item, idx) => {
    item.level = idx
  })

  return hexColors
}
