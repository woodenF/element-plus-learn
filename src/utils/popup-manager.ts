import { Ref } from "vue";
import { EVENT_CODE } from './aria';
import { getConfig } from './config';
import { addClass, on, removeClass } from './dom';
import isServer from './isServer';

interface Instance {
  closeOnClickModal: Ref<boolean>,
  closeOnPressEscape: Ref<boolean>,
  close: () => void,
  handleClose?: () => void,
  handleAction?: (action: string) => void
}

type StackFrame = { id: string; zIndex: number; modalClass: string; }

interface IPopupManager{
  getInstance: (id: string) => Instance;
  zIndex: number;
  modalDom?: HTMLElement;
  modalFade: boolean,
  modalStack: StackFrame[],
  nextZIndex: () => number,
  register: (id: string, instance: Instance) => void;
  deregister: (id: string) => void;
  doOnModalClick: () => void;
  openModal: (
    id: string,
    zIndex: number,
    dom: HTMLElement,
    modalClass: string,
    modalFade: boolean
  ) => void;
  closeModal: (id: string) => void
}

const onTouchMove = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
}

const onModalClick = () => {
  PopupManager?.doOnModalClick()
}

let hasModal = false
let zIndex: number = 2000

const getModal = function(): HTMLElement | undefined {
  if(isServer) return
  let modalDom = PopupManager.modalDom
  if(modalDom) {
    hasModal = true
  } else {
    hasModal = false
    modalDom = document.createElement('div')
    PopupManager.modalDom = modalDom

    on(modalDom, 'touchmove', onTouchMove)
    on(modalDom, 'click', onModalClick)
  }
  return modalDom
}

const instances: any = {}

const PopupManager: IPopupManager = {
  modalFade: true,
  modalDom: undefined,
  zIndex,

  getInstance: function(id) {
    return instances[id]
  },

  register: function(id, instance) {
    if(id && instance) {
      instances[id] = instance
    }
  },

  deregister: function(id) {
    if(id) {
      instances[id] = null
      delete instances[id]
    }
  },

  nextZIndex: function() {
    return ++PopupManager.zIndex
  },

  modalStack: [],

  doOnModalClick: function() {
    const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1]
    if(!topItem) return

    const instance = PopupManager.getInstance(topItem.id)
    if(instance && instance.closeOnClickModal.value) {
      instance.close()
    }
  },

  openModal: function(id, zIndex, dom, modalClass, modalFade) {
    if(isServer) return
    if(!id || zIndex === undefined) return
    this.modalFade = modalFade
    
    const modalStack = this.modalStack

    for(let i = 0, j = modalStack.length; i < j; i++) {
      const item = modalStack[i]
      if(item.id === id) {
        return
      }
    }

    const modalDom = getModal()
    if(!modalDom) return

    addClass(modalDom, 'v-modal')

    if(this.modalFade && !hasModal) {
      addClass(modalDom, 'v-modal-enter')
    }
    if(modalClass) {
      const classArr = modalClass.trim().split(/\s+/)
      classArr.forEach(item => addClass(modalDom, item))
    }
    setTimeout(() => {
      removeClass(modalDom, 'v-modal-enter')
    }, 200);

    if(dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom)
    } else {
      document.body.appendChild(modalDom)
    }

    if(zIndex) {
      modalDom.style.zIndex = String(zIndex)
    }
    modalDom.tabIndex = 0
    modalDom.style.display = ''

    this.modalStack.push({ id, zIndex, modalClass })
  },

  closeModal: function(id) {
    const modalStack = this.modalStack
    const modalDom = getModal() as HTMLElement

    if(modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1]
      if(topItem.id === id) {
        if(topItem.modalClass) {
          const classArr = topItem.modalClass.trim().split(/\s+/)
          classArr.forEach(item => removeClass(modalDom as HTMLElement, item))
        }

        modalStack.pop()
        if(modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex as unknown as string
        }
      } else {
        for(let i = modalStack.length - 1; i >= 0; i--) {
          if(modalStack[i].id === id) {
            modalStack.splice(i, 1)
            break
          }
        }
      }
    }

    if(modalStack.length === 0) {
      if(this.modalFade) {
        addClass(modalDom, 'v-modal-leave')
      }
      setTimeout(() => {
        if(modalStack.length === 0) {
          if(modalDom.parentNode) modalDom.parentNode.removeChild(modalDom)
          modalDom.style.display = 'none'

          PopupManager.modalDom = undefined
        }
        removeClass(modalDom, 'v-modal-leave')
      }, 200);
    }
  }
}

Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get() {
    if(zIndex === undefined) {
      zIndex = getConfig('zIndex') as number || 2000
    }
    console.log('defineProperty-zindex====>', zIndex)
    return zIndex
  },
  set(value) {
    zIndex = value
  }
})

const getTopPopup = function() {
  if(isServer) return
  if(PopupManager.modalStack.length > 0) {
    const topPopup = 
      PopupManager.modalStack[PopupManager.modalStack.length - 1]
    if(!topPopup) return
    const instance = PopupManager.getInstance(topPopup.id)
    return instance
  }
}

if(!isServer) {
  on(window, 'keydown', function(event: KeyboardEvent) {
    if(event.code === EVENT_CODE.esc) {
      const topPopup = getTopPopup()
      
      if(topPopup && topPopup.closeOnPressEscape.value) {
        topPopup.handleClose
          ? topPopup.handleClose()
          : topPopup.handleAction
            ? topPopup.handleAction('cancel')
            : topPopup.close()
      }
    }
  } as EventListenerOrEventListenerObject)
}

export default PopupManager