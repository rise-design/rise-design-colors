import '@/styles/reset.less'
import '@/styles/variables.less'
import * as colorsModule from '@/main'
import {
  createRootElement,
  createColorsWrapperElement,
  creatDownloadLinkElement
} from '@/utils/element'

/**
 * 1. 加载 root element
 */
const rootElement = createRootElement()
document.body.appendChild(rootElement)

/**
 * 2. 加载 colors wrapper element
 */
const colorsWrapperElement = createColorsWrapperElement(colorsModule)
rootElement.appendChild(colorsWrapperElement)

/**
 * 3. 加载 download link element
 */
const downloadLinkElement = creatDownloadLinkElement(colorsWrapperElement)
rootElement.appendChild(downloadLinkElement)
