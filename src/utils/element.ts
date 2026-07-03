import type { ColorType } from '@/types/colors'
import { downloadElementScreenshot } from '@/utils/download'

/**
 * 创建样式字符串
 * @param   styleObject Record<string, string> 类型 - 样式对象
 * @returns styleString                 string 类型 - 样式字符串
 */
function createStyleString(styleObject: Record<string, string>): string {
  const styleString = Object.entries(styleObject)
    .map(([key, value]) => `${key}: ${value}`)
    .join(';')
  return styleString
}

/**
 * 创建 root 元素
 * @returns rootElement HTMLDivElement 类型 - root 元素
 */
export function createRootElement(): HTMLDivElement {
  const rootElement = document.createElement('div')
  rootElement.setAttribute('id', 'root')
  rootElement.setAttribute(
    'style',
    createStyleString({
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'center',
      width: '100%',
      height: '100vh',
      'background-color': 'var(--rd-color-gray-0)'
    })
  )
  return rootElement
}

/**
 * 创建 colors 元素
 * @returns colorsElement HTMLDivElement 类型 - colors 元素
 */
function createColorsElement(): HTMLDivElement {
  const colorsElement = document.createElement('div')
  colorsElement.setAttribute(
    'style',
    createStyleString({
      'border-radius': '16px',
      overflow: 'hidden'
    })
  )
  return colorsElement
}

/**
 * 创建 color 元素
 * @param   bgColor              string 类型 - color 元素背景色
 * @returns colorElement HTMLDivElement 类型 - color 元素
 */
function createColorElement(bgColor: string): HTMLDivElement {
  const colorElement = document.createElement('div')
  colorElement.setAttribute(
    'style',
    createStyleString({
      width: '100%',
      height: 'auto',
      'background-color': bgColor,
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'center',
      'box-sizing': 'border-box',
      padding: '16px'
    })
  )
  return colorElement
}

/**
 * 创建 text 元素
 * @param   index                number 类型 - 色阶位置
 * @param   baseIndex            number 类型 - 基色位置
 * @param   colorType            string 类型 - 颜色类型
 * @param   bgColor              string 类型 - 颜色色值
 * @returns textElement HTMLSpanElement 类型 - text 元素
 */
function createTextElement(
  index: number,
  baseIndex: number,
  colorType: string,
  bgColor: string
): HTMLSpanElement {
  const textElement = document.createElement('span')
  textElement.setAttribute(
    'style',
    createStyleString({
      display: 'flex',
      'flex-direction': 'row',
      'align-items': 'center',
      'justify-content': 'space-between',
      width: '100%',
      height: 'auto',
      'font-size': '12px',
      'font-weight': 'normal',
      color: index < baseIndex ? 'var(--rd-color-gray-6)' : '#fff'
    })
  )
  const colorLevelTextElement = document.createElement('span')
  colorLevelTextElement.innerText = `${colorType}-${index}`
  const colorNameTextElement = document.createElement('span')
  colorNameTextElement.innerText = bgColor
  textElement.appendChild(colorLevelTextElement)
  textElement.appendChild(colorNameTextElement)
  return textElement
}

/**
 * 创建 colorsWrapper 元素
 * @param   colorsModule Record<string, {@link ColorType}> 类型 - colors 模块
 * @returns colorsWrapperElement            HTMLDivElement 类型 - colorsWrapper 元素
 */
export function createColorsWrapperElement(
  colorsModule: Record<string, ColorType>
): HTMLDivElement {
  const colorsWrapperElement = document.createElement('div')
  colorsWrapperElement.setAttribute(
    'style',
    createStyleString({
      display: 'grid',
      'grid-template-columns': 'repeat(4, 1fr)',
      'grid-gap': '16px',
      width: '1200px',
      height: 'auto',
      'box-sizing': 'border-box',
      padding: '16px',
      'background-color': '#fff'
    })
  )
  Object.entries(colorsModule).forEach(([colorType, colorItem]) => {
    const { base, colors } = colorItem
    const baseIndex = colors.findIndex((color) => color === base)
    const colorsElement = createColorsElement()
    colors.forEach((bgColor, index) => {
      const colorElement = createColorElement(bgColor)
      const textElement = createTextElement(
        index,
        baseIndex,
        colorType,
        bgColor
      )
      colorElement.appendChild(textElement)
      colorsElement.appendChild(colorElement)
    })
    colorsWrapperElement.appendChild(colorsElement)
  })
  return colorsWrapperElement
}

/**
 * 创建 downloadLink 元素
 * @param   element                   HTMLElement 类型 - 待截图的 HTML 元素
 * @returns downloadLinkElement HTMLButtonElement 类型 - downloadLink 元素
 */
export function creatDownloadLinkElement(element: HTMLElement) {
  const downloadLinkElement = document.createElement('button')
  downloadLinkElement.innerText = '点此下载截图'
  downloadLinkElement.setAttribute(
    'style',
    createStyleString({
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      'font-size': '16px',
      color: 'var(--rd-color-blue-3)',
      'margin-top': '16px'
    })
  )
  downloadLinkElement.addEventListener('click', () => {
    downloadElementScreenshot(element, `demo_${Date.now()}.png`)
  })
  return downloadLinkElement
}
