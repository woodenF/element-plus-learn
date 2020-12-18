export interface UseDialogProps {
  beforeClose?: (close: (shouldCancel: boolean) => void) => void,
  closeOnClickModal: boolean,
  closeOnPressEscape: boolean,
  closeDelay: number,
  destoryOnClose: boolean,
  fullScreen?: boolean,
  lockScroll: boolean,
  modelValue: boolean,
  openDelay: number,
  top?: string,
  width?: string,
  zIndex?: number
}