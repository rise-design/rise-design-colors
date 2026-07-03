/**
 * HEX 颜色类型（十六进制）
 */
export type HEXColor = string

/**
 * RGB 颜色类型
 */
export type RGBColor = [R: number, G: number, B: number]

/**
 * HSL 颜色类型（色相、饱和度、亮度）
 */
export type HSLColor = [H: number, S: number, L: number]

/**
 * ColorType 类型
 */
export interface ColorType {
  base: HEXColor // 基色色值
  colors: HEXColor[] // 色阶列表
}
