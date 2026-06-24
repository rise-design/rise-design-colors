import { BASE_COLORS } from '@/constants/colors'
import { generateColors } from '@/utils/generate'

function createColorType(colorType: string) {
  const COLOR_TYPE = colorType.toUpperCase()
  const baseColor = BASE_COLORS[COLOR_TYPE]
  return {
    base: baseColor,
    colors: generateColors(baseColor)
  }
}

export const red = createColorType('red')
export const orange = createColorType('orange')
export const yellow = createColorType('yellow')
export const green = createColorType('green')
export const cyan = createColorType('cyan')
export const blue = createColorType('blue')
export const purple = createColorType('purple')
export const gray = createColorType('gray')
