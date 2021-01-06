<template>
  <button @click="onPreview">预览</button>
</template>

<script lang='ts'>
import { IPreview } from '@/components/preview/src/types';
import { defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
  setup() {
    const instance = getCurrentInstance()
    const preview = instance?.appContext.config.globalProperties.$preview

    const onPreview = () => {
      (preview as IPreview)({
        sources: [
          'https://img.ivsky.com/img/tupian/t/201806/08/xiaohuangren-008.jpg',
          'https://yyc-dev-opt-1303934766.cos.ap-beijing.myqcloud.com/202011/144115205301725084/-1981016115-%E6%9C%89%E6%89%8B%E5%B0%B1%E8%83%BD%E4%BC%9A_%E8%B6%85%E6%98%BE%E8%84%B8%E5%B0%8F%E8%BF%AA%E5%A3%AB%E5%B0%BC%E5%85%AC%E4%B8%BB%E7%BC%96%E5%8F%91%EF%BD%9C%E4%B8%87%E8%83%BD%E5%8F%91%E5%9E%8B.mp4',
          'https://img.ivsky.com/img/tupian/t/201806/08/xiaohuangren-003.jpg'
        ],
        activeIndex: 0
      })
    }

    return {
      onPreview
    }
  }
})
</script>