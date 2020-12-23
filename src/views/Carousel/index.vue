<template>
  <div class="carousel-container">
    <div style="position: absolute;top: 0">{{active}}</div>
    <div class="prev" @click="prev">上一个</div>
    <div class="next" @click="next">下一个</div>
    <div
      class="carousel-wrapper"
      :style="{
        transform: `translateZ(-${radius}px) rotateY(${-angle * active}deg)`,
      }"
    >
      <img
        v-for="(img, index) in imgs"
        :key="index"
        :style="{
          transform: `rotateY(${angle * index}deg) translateZ(${radius}px)`
        }"
        :src="img"
        alt=""
      >
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const imgs = [
      require(`@/assets/images/1.jpg`),
      require(`@/assets/images/2.jpg`),
      require(`@/assets/images/3.jpg`),
      require(`@/assets/images/4.jpg`),
      require(`@/assets/images/5.jpg`),
      require(`@/assets/images/6.jpg`),
    ]
    const imgWidth = 400
    const perimeter = imgs.length * imgWidth
    // 图片向外推的半径
    // 正多边形的内切圆半径公式
    // 边长 / 2 * cot(Math.PI / 边数)
    // JS没有Math.cot  Math.cot = 1 / Math.tan
    const radius = imgWidth * 0.5 *(1 / Math.tan(Math.PI / imgs.length))
    // 图片的旋转角度
    const angle = 360 / imgs.length

    const active = ref(0)

    const next = () => {
      active.value += 1
    }
    const prev = () => {
      active.value -= 1
    }

    return {
      imgs,
      radius,
      angle,
      active,
      next,
      prev
    }
  }
})
</script>

<style lang="scss" scoped>
.carousel-container{
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  .prev{
    position: absolute;
    left: 0;
  }
  .next{
    position: absolute;
    right: 0
  }
  .carousel-wrapper{
    position: relative;
    transform-style: preserve-3d;
    transition: all .5s;
    width: 400px;
    height: 222px;
    img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>