<template>
  <button
    :class="[
      'el-button',
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circled': circle
      }
    ]"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <i v-if="loading" class="el-icon-loading"></i>
    <i v-if="icon && !loading" :class="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang='ts'>
import { computed, defineComponent, Prop, PropType } from 'vue';
import { isValidComponentSize } from '@/utils/validators'
import { useGlobalConfig } from '@/utils/util'

type IButtonType = PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default'>
type IButtonNativeType = PropType<'button' | 'submit' | 'reset'>

interface IButtonProps {
  type: string,
  size: string,
  icon: string,
  nativeType: string,
  loading: boolean,
  disabled: boolean,
  plain: boolean,
  autofocus: boolean,
  round: boolean,
  circle: boolean
}

export default defineComponent({
  name: 'ElButton',
  props: {
    type: {
      type: String as IButtonType,
      default: 'default',
      validator: (val: string) => {
        return [
          'default',
          'primary',
          'success',
          'warning',
          'info',
          'danger',
          'text'
        ].includes(val)
      }
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String as IButtonNativeType,
      default: 'button',
      validator: (val: string) => {
        return ['button', 'submit', 'reset'].includes(val)
      }
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  emits: ['click'],
  setup(props, ctx) {
    const $ELEMENT =  useGlobalConfig()

    const buttonSize = computed(() => {
      return props.size || $ELEMENT.size
    })

    const buttonDisabled = computed(() => {
      return props.disabled
    })

    const handleClick = (evt: Event) => {
      ctx.emit('click', evt)
    }
    return {
      buttonSize,
      buttonDisabled,
      handleClick
    }
  }
})
</script>