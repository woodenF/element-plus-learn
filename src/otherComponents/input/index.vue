<template>
  <div class="other-input">
    <div class="input-title" :class="{active: inputText || isFocus}">title</div>
    <input
      v-model="inputText"
      @focus="handleFocus"
      @blur="handleBlur"
      type="text"
    >
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'OtherInput',
  setup() {
    const isFocus = ref(false)
    const inputText = ref('')

    const handleFocus = (e: FocusEvent) => {
      isFocus.value = true
    }

    const handleBlur = (e: FocusEvent) => {
      isFocus.value = false
    }
    return {
      handleFocus,
      handleBlur,
      isFocus,
      inputText
    }
  }
})
</script>
<style lang="scss" scoped>
.other-input{
  .input-title{
    pointer-events: none;
    transition: all .3s;
    height: 18px;
    transform: translateY(16px) translateX(2px);
    color: #ccc;
    font-size: 14px;
    &.active{
      transform: translateX(0) translateY(0);
      color: #666;
      font-size: 16px;
    }
  }
  input{
    background: none;
    border: none;
    outline: none;
    border-bottom: 1px solid #aaa;
  }
}
</style>