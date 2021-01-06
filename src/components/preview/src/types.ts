import { App, VNode } from 'vue'

export interface IPreviewHandle {
  close: () => void
}

export type IPreviewOptions = {
  type?: 'image' | 'video' | 'audio'
  sources: string[]
  activeIndex?: number
  onClose?: () => void
  hasPaination?: boolean
  hasNavigation?: boolean
  hasClose?: () => void
  closeOnClickModal?: boolean
}

export type PreviewType = 'image' | 'video' | 'audio'

export type PreviewParams = IPreviewOptions
export type TypedPreviewParams<T extends PreviewType> = { type: T; } & Omit<IPreviewOptions, 'type'> | string

export type PreviewVM = VNode

export interface IPreview {
  (options?: PreviewParams): IPreviewHandle
  image?: (options?: TypedPreviewParams<'image'>) => IPreviewHandle
  video?: (options?: TypedPreviewParams<'video'>) => IPreviewHandle
  audio?: (options?: TypedPreviewParams<'audio'>) => IPreviewHandle
}