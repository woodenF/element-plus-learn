import { useLockScreen, useModal, useRestoreActive } from '@/components/hooks'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'
import isServer from '@/utils/isServer'
import PopupManager from '@/utils/popup-manager'
import { clearTimer } from '@/utils/util'
import { computed, CSSProperties, nextTick, onMounted, ref, Ref, SetupContext, watch } from 'vue'
import { UseDialogProps } from './dialog'

export const CLOSE_EVENT = 'close'
export const OPEN_EVENT = 'open'
export const CLOSED_EVENT = 'closed'
export const OPENED_EVENT = 'opened'

export { UPDATE_MODEL_EVENT }

export default function(props: UseDialogProps, ctx: SetupContext, targetRef: Ref<HTMLElement>) {
  const visible = ref(false)
  const closed = ref(false)
  const dialogRef = ref(null)
  const openTimer = ref<TimeoutHandle>(null)
  const closeTimer = ref<TimeoutHandle>(null)
  const rendered = ref(false)

  const zIndex = ref(props.zIndex || PopupManager.nextZIndex())
  const modalRef = ref<HTMLElement | null>(null)

  const style = computed(() => {
    const style = {} as CSSProperties
    if(!props.fullScreen) {
      style.marginTop = props.top
      if(props.width) {
        style.width = props.width
      }
    }
    return style
  })

  function afterEnter() {
    ctx.emit(OPENED_EVENT)
    rendered.value = true
  }

  function afterLeave() {
    ctx.emit(CLOSED_EVENT)
    ctx.emit(UPDATE_MODEL_EVENT, false)
    if(props.destoryOnClose) {
      rendered.value = false
    }
  }

  function open() {
    clearTimer(closeTimer)
    clearTimer(openTimer)
    if(props.openDelay && props.openDelay > 0) {
      openTimer.value = window.setTimeout(() => {
        openTimer.value = null
        doOpen()
      }, props.openDelay)
    } else {
      doOpen()
    }
  }

  function close() {
    clearTimer(openTimer)
    clearTimer(closeTimer)
    if(props.closeDelay && props.closeDelay > 0) {
      closeTimer.value = window.setTimeout(() => {
        closeTimer.value = null
        doClose()
      }, props.closeDelay)
    } else {
      doClose()
    }
  }

  function hide(shouldCancel: boolean) {
    if(shouldCancel) return
    closed.value = true
    visible.value = false
  }

  function handleClose() {
    if(props.beforeClose) {
      props.beforeClose(hide)
    } else {
      close()
    }
  }

  function onModalClick() {
    if(props.closeOnClickModal) {
      handleClose()
    }
  }

  function doOpen() {
    if(isServer) return
    visible.value = true
  }

  function doClose() {
    visible.value = false
  }

  if(props.lockScroll) {
    useLockScreen(visible)
  }

  if(props.closeOnPressEscape) {
    useModal({
      handleClose,
    }, visible)
  }

  useRestoreActive(visible)

  watch(() => props.modelValue, val => {
    if(val) {
      closed.value = false
      open()
      ctx.emit(OPENED_EVENT)
      zIndex.value = props.zIndex ? zIndex.value++ : PopupManager.nextZIndex()
      console.log('zIndex=====>', zIndex.value)
      nextTick(() => {
        if(targetRef.value) {
          targetRef.value.scrollTop = 0
        }
      })
    } else {
      close()
      if(!closed.value) {
        ctx.emit(CLOSED_EVENT)
      }
    }
  })

  onMounted(() => {
    if(props.modelValue) {
      ctx.emit(CLOSED_EVENT)
    }
  })

  return {
    afterEnter,
    afterLeave,
    handleClose,
    onModalClick,
    closed,
    dialogRef,
    style,
    rendered,
    modalRef,
    visible,
    zIndex
  }
}