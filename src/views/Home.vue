<template>
  <div class="home">
    <a href="mybaicorv://customer-baicorv.yycyun.cn?from=123&to=001&uid=5fb4d350945dbe36bca817aa">Visit W3School!</a>
    <el-button @click="toggleDialog(true)" type="info" size="mini" round plain>12313</el-button>
    <el-dialog
      v-model="modelValue"
      @opened="open"
      :before-close="beforeClose"
    >
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Home',
  setup() {
    const modelValue = ref(false)
    const toggleDialog = (status: boolean) => {
      modelValue.value = status
    }

    const open = () => {
      console.log('open')
    }

    const beforeClose = (done: Function) => {
      console.log('before-close')
      done()
    }

    return {
      modelValue,
      toggleDialog,
      open,
      beforeClose
    }
  }
});
</script>
