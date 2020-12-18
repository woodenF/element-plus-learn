export const EVENT_CODE = {
  tab: 'Tab',
  enter: 'Enter',
  space: 'Space',
  left: 'ArrowLeft',
  up: 'ArrowUp',
  right: 'ArrowRight',
  down: 'ArrowDown',
  esc: 'Escape',
  delete: 'Delete',
  backspace: 'Backspace'
}

// 可聚焦元素选择器
const FOCUSABLE_ELEMENT_SELECTORS = `a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])`

// 判断测试元素是否在屏幕上可见，无论它是否在视口之中
export const isVisible = (element: HTMLElement) => {
  const computed = getComputedStyle(element)
  /**
   * HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 table,td,th,body元素。当元素的 style.display 设置为 "none" 时，   offsetParent 返回 null。
   */
  return computed.position === 'fixed' ? false : element.offsetParent !== null
}

export const isFocusable = (element: HTMLElement): boolean => {
  // tabindex取值在0-32767之间，当按下tab健时会按照tabindex的大小有小到大遍历，当tabindex为-1时，使用tab健将忽略该元素
  if(
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)
  ) {
    return true
  }
  // 当元素处于禁用状态时返回false
  if((element as HTMLButtonElement).disabled) {
    return false
  }

  switch(element.nodeName) {
    case 'A': {
      return !!(element as HTMLAnchorElement).href && (element as HTMLAnchorElement).rel !== 'ignore'
    }
    case 'INPUT': {
      return !((element as HTMLInputElement).type === 'hidden' || (element as HTMLInputElement).type === 'file')
    }
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA': {
      return true
    }
    default: {
      return false
    }
  }
}

// 获取所有可聚焦元素
export const obtainAllFocusableElement = (element: HTMLElement) : HTMLElement[] => {
  return (Array.from(element.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)) as HTMLElement[])
          .filter(isFocusable)
          .filter(isVisible) as HTMLElement[]
}