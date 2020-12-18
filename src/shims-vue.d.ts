declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

declare type TimeoutHandle = ReturnType<typeof global.setTimeout>

declare type Hash<T> = Indexable<T>