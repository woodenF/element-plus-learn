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
    <other-input></other-input>
    <other-input></other-input>

    <div
      class="image-wrapper"
      :style="{transform: `translateZ(-500px) rotateY(-${360 / imgs.length * 1}deg) rotateZ(45deg)`}"
    >
      <img
        v-for="(item, index) in imgs"
        :key="index"
        :style="{transform: `rotateY(${360 / imgs.length * index}deg) translateZ(${173.20}px)`}"
        :src="item"
        alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { IPreview } from '@/components/preview/src/types';
import { ComponentInternalInstance, defineComponent, getCurrentInstance, ref } from 'vue';

export default defineComponent({
  name: 'Home',
  setup(props) {
    const instance = getCurrentInstance()
    const preview = instance?.appContext.config.globalProperties.$preview
    const modelValue = ref(false)
    const toggleDialog = (status: boolean) => {
      modelValue.value = status
    }

    const open = () => {
      console.log('open')
    }

    const beforeClose = (done: Function) => {
      (preview as IPreview)({
        sources: [
          'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2752148155,155093617&fm=26&gp=0.JPG',
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1325995315,4158780794&fm=26&gp=0.JPG',
        ]
      }) 
      done()
    }

    const imgs = [
      require(`@/assets/images/1.jpg`),
      require(`@/assets/images/2.jpg`),
      require(`@/assets/images/3.jpg`),
    ]

    return {
      modelValue,
      toggleDialog,
      open,
      beforeClose,
      imgs
    }
  }
});
</script>

<style lang="scss">
body{
  perspective: 500px;
}
.image-wrapper{
  position: relative;
  transform-style: preserve-3d;
  transition: all .5s;
  width: 400px;
  margin: 0 auto;
  height: 222px;
  img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
