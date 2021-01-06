<template>
  <transition name="el-fade-in-linear" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="preview-wrapper"
    >
      <i @click="close" class="el-icon-close"></i>
      <i @click="prev" class="el-icon-arrow-left"></i>
      <i @click="next" class="el-icon-arrow-right"></i>
      <div class="preview-pagination">
        {{active + 1}} / {{sources.length}}
      </div>
      <template v-if="/\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(sources[active].toLowerCase())">
        <img :src="sources[active]" alt="">
      </template>
      <template v-else-if="/\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)/.test(sources[active].toLowerCase())">
        <video :src="sources[active]" controls></video>
      </template>
      <template v-else-if="/\.(ogg|mp3|wav)/.test(sources[active].toLowerCase())">
        audio
      </template>
    </div>
  </transition>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance } from 'vue';
import type { PropType } from 'vue'

type sourcesType = string[]
export default defineComponent({
  name: 'ElPreview',
  props: {
    sources: {
      type: Array as PropType<sourcesType>,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: () => 0
    }
  },
  setup(props) {
    const instance = getCurrentInstance()
    const { sources, activeIndex } = props
    const active = ref(activeIndex)
    const visible = ref(true)

    const next = () => {
      active.value += 1
      if(active.value >= sources.length) {
        active.value = 0
      }
    }
    const prev = () => {
      active.value -= 1
      if(active.value < 0) {
        active.value = sources.length - 1
      }
    }

    const close = () => {
      visible.value = false
    }

    const handleAfterLeave = () => {
      const el: Node = (instance?.vnode.el as any).parentNode
      const parentNode: Node = (el as any).parentNode
      parentNode.removeChild(el)
    }

    return {
      sources,
      active,
      next,
      prev,
      visible,
      close,
      handleAfterLeave
    }
  }
})
</script>
<style lang="scss" scoped>
.preview-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .3);
  display: flex;
  align-items: center;
  justify-content: center;
  .el-icon-close{
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 32px;
    color: #fff;
  }
  .el-icon-arrow-left{
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
  }
  .el-icon-arrow-right{
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
  }
  .preview-pagination{
    position: absolute;
    bottom: 20px;
    color: #fff;
    font-size: 22px;
    left: 50%;
    transform: translateX(-50%)
  }
  img, video, audio{
    max-width: 100%;
    max-height: 100%;
  }
}
</style>