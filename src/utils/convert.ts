import type { HEXColor, RGBColor, HSLColor } from '@/types/colors'

/**
 * 将 HEX 颜色类型（十六进制）转换为 RGB 颜色类型
 * @param   hexColor {@link HEXColor} 类型 - HEX 颜色类型（十六进制）
 * @returns rgbColor {@link RGBColor} 类型 - RGB 颜色类型
 */
export function convertHEXColorToRGBColor(hexColor: HEXColor): RGBColor {
  const rgbColor: RGBColor = [0, 0, 0]

  rgbColor[0] = parseInt(hexColor.slice(1, 3), 16)
  rgbColor[1] = parseInt(hexColor.slice(3, 5), 16)
  rgbColor[2] = parseInt(hexColor.slice(5, 7), 16)

  return rgbColor
}

/**
 * 将 RGB 颜色类型转换为 HEX 颜色类型（十六进制）
 * @param   rgbColor {@link RGBColor} 类型 - RGB 颜色类型
 * @returns hexColor {@link HEXColor} 类型 - HEX 颜色类型（十六进制）
 */
export function convertRGBColorToHEXColor(rgbColor: RGBColor): HEXColor {
  let hexColor: HEXColor = '#'

  hexColor += rgbColor
    .map((n) => n.toString(16).toUpperCase().padStart(2, '0'))
    .join('')

  return hexColor
}

/**
 * 将 HEX 颜色类型（十六进制）转换为 HSL 颜色类型（色相、饱和度、明度）
 * @param   hexColor {@link HEXColor} 类型 - HEX 颜色类型（十六进制）
 * @returns hslColor {@link HSLColor} 类型 - HSL 颜色类型（色相、饱和度、明度）
 */
export function convertHEXColorToHSLColor(hexColor: HEXColor): HSLColor {
  const hslColor: HSLColor = [0, 0, 0]

  const [R, G, B] = convertHEXColorToRGBColor(hexColor)

  const r = R / 255
  const g = G / 255
  const b = B / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h
  let s
  const l = (max + min) / 2

  if (max === min) {
    h = 0
    s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
      default:
        h = 0
    }
  }

  hslColor[0] = Number((h * 360).toFixed(2))
  hslColor[1] = Number((s * 100).toFixed(2))
  hslColor[2] = Number((l * 100).toFixed(2))

  return hslColor
}

/**
 * 将 HSL 颜色类型（色相、饱和度、明度）转换为 HEX 颜色类型（十六进制）
 * @param   hslColor {@link HSLColor} 类型 - HSL 颜色类型（色相、饱和度、明度）
 * @returns hexColor {@link HEXColor} 类型 - HEX 颜色类型（十六进制）
 */
export function convertHSLColorToHEXColor(hslColor: HSLColor): HEXColor {
  const [H, S, L] = hslColor

  const h = H / 360
  const s = S / 100
  const l = L / 100
  const a = s * Math.min(l, 1 - l)

  const f = (n: number): number => {
    const k = (n + h * 12) % 12
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
  }

  const R = Number((f(0) * 255).toFixed(0))
  const G = Number((f(8) * 255).toFixed(0))
  const B = Number((f(4) * 255).toFixed(0))

  const rgbColor: RGBColor = [R, G, B]

  const hexColor = convertRGBColorToHEXColor(rgbColor)

  return hexColor
}
