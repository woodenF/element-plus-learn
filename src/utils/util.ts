import { getCurrentInstance } from 'vue';

export function useGlobalConfig() {
  const vm: any = getCurrentInstance()
  if('$ELEMENT' in vm.proxy) {
    return vm.proxy.$ELEMENT
  }
  return {}
}