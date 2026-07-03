import html2canvas from 'html2canvas'

/**
 * 下载元素截图
 * @param element  HTMLElement 类型 - 要截图的 HTML 元素
 * @param filename      string 类型 - 下载保存截图的文件名
 */
export function downloadElementScreenshot(
  element: HTMLElement,
  filename: string
): void {
  html2canvas(element)
    .then((canvas) => {
      const image = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = image
      a.download = filename
      a.click()
    })
    .catch((error) => {
      console.error('Failed to download element screenshot:', error)
    })
}
