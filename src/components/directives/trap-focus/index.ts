import { EVENT_CODE, obtainAllFocusableElement } from '@/utils/aria'
import { off, on } from '@/utils/dom'
import type { ObjectDirective } from 'vue'
import { nextTick } from 'vue'

export const FOCUSABLE_CHILDREN = '_trap-focus-children'
export const TRAP_FOCUS_HANDLER = '_trap-focus-handler'

export interface ITrapFocusElement extends HTMLElement {
  [FOCUSABLE_CHILDREN]: HTMLElement[],
  [TRAP_FOCUS_HANDLER]: (e: KeyboardEvent) => void
}

const TrapFocus: ObjectDirective = {
  beforeMount(el: ITrapFocusElement) {
    // 获取所有可聚焦元素
    el[FOCUSABLE_CHILDREN] = obtainAllFocusableElement(el)

    el[TRAP_FOCUS_HANDLER] = (e: KeyboardEvent) => {
      const focusableElement = el[FOCUSABLE_CHILDREN]
      // 如果存在可聚焦元素并且按下了tab健
      if(focusableElement.length > 0 && e.code === EVENT_CODE.tab) {
        if(focusableElement.length === 1) {
          e.preventDefault()
          // activeElement 返回当前处于聚焦状态的dom
          if(document.activeElement !== focusableElement[0]) {
            focusableElement[0].focus()
          }
          return
        }
        // shiftKey 是否按下shift健
        const goingBackward = e.shiftKey
        const isFirst = e.target === focusableElement[0]
        const isLast = e.target === focusableElement[focusableElement.length - 1]
        // 如果当前聚焦元素为第一个元素并且按下shift + tab，那么将聚焦元素切换到数组最后一个
        if(isFirst && goingBackward) {
          e.preventDefault()
          focusableElement[focusableElement.length - 1].focus()
        }
        // 如果当前聚焦元素为最后一个个元素并且按下tab，那么将聚焦元素切换到数组第一个
        if(isLast && !goingBackward) {
          e.preventDefault()
          focusableElement[0].focus()
        }
      }
    }
    on(document, 'keydown', el[TRAP_FOCUS_HANDLER] as EventListenerOrEventListenerObject)
  },
  updated(el: ITrapFocusElement) {
    nextTick(() => {
      el[FOCUSABLE_CHILDREN] = obtainAllFocusableElement(el)
    })
  },
  unmounted(el: ITrapFocusElement) {
    off(document, 'keydown', el[TRAP_FOCUS_HANDLER] as EventListenerOrEventListenerObject)
  }
}

export default TrapFocus