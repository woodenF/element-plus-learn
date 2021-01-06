import { createVNode, render } from 'vue'
import PreviewConstructor from './index.vue'
import type {
  IPreview,
  IPreviewOptions,
  PreviewParams,
  PreviewVM
} from './types'

let vm: PreviewVM
const Preview: IPreview = function(
  opts: PreviewParams = {} as PreviewParams
) {
  let options: IPreviewOptions = <IPreviewOptions>opts

  const container = document.createElement('div')
  container.className = `preview-container`

  vm = createVNode(
    PreviewConstructor,
    options
  )

  render(vm, container)
  document.body.appendChild(container)

  return {
    close: options.onClose
  }
} as any

export default Preview