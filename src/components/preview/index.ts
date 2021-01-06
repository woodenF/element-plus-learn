import { App } from 'vue'
import Preview from './src/preview'

(Preview as any).install = (app: App): void => {
  console.log('preview===>install')
  app.config.globalProperties.$preview = Preview
}

export default Preview