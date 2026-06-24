import '@/styles/reset.less'
import '@/styles/main.less'
import * as colorsModule from '@/main'
import html2canvas from 'html2canvas'

const createStyleString = (style: Record<string, string>) => {
  return Object.entries(style)
    .map(([key, value]) => `${key}: ${value}`)
    .join(';')
}

const createRootElement = () => {
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
      'background-color': 'var(--xrd-color-gray-0)'
    })
  )
  return rootElement
}

const createColorsElement = () => {
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

const createColorElement = (bgColor: string) => {
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

const createTextElement = (
  index: number,
  baseIndex: number,
  colorType: string,
  bgColor: string
) => {
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
      color: index < baseIndex ? 'var(--xrd-color-gray-6)' : '#fff'
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

const createColorsWrapperElement = () => {
  const colorsWrapperElement = document.createElement('div')
  colorsWrapperElement.setAttribute(
    'style',
    createStyleString({
      display: 'grid',
      'grid-template-columns': 'repeat(4, 1fr)',
      'grid-gap': '16px',
      width: '100%',
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

const creatDownloadLinkElement = async (element: HTMLElement) => {
  try {
    const canvas = await html2canvas(element)
    const image = canvas.toDataURL('image/png')
    const downloadLinkElement = document.createElement('a')
    downloadLinkElement.href = image
    downloadLinkElement.download = 'demo.png'
    downloadLinkElement.innerText = '点此下载截图'
    downloadLinkElement.setAttribute(
      'style',
      createStyleString({
        color: 'var(--xrd-color-blue-3)',
        'margin-top': '16px',
        'text-decoration': 'none'
      })
    )
    return downloadLinkElement
  } catch (error) {
    console.error('Failed to create demo picture:', error)
  }
}

const rootElement = createRootElement()

const colorsWrapperElement = createColorsWrapperElement()

rootElement.appendChild(colorsWrapperElement)

document.body.appendChild(rootElement)

creatDownloadLinkElement(colorsWrapperElement)
  .then((downloadLinkElement) => {
    if (downloadLinkElement) {
      rootElement.appendChild(downloadLinkElement)
    }
  })
  .catch((error) => {
    console.error('Failed to create download link:', error)
  })
