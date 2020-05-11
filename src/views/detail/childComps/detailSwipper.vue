<template>
  <div class="detailSwipper">
      <Swiper class="Swiper">
        <SwiperItem v-for="(item, index) in topImages" :key="index">
            <img :src="item" alt="">
        </SwiperItem>
      </Swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'detailSwipper',
  props: {
      topImages: {
          type: Array,
          default() {
              return []
          }
      }
  },
  components: {
      Swiper,
      SwiperItem
  },
  data () {
    return {
      msg: ''
    }
  },
  mounted() {
      console.log(this.topImages)
  },
  methods: {
  }
}
</script>

<style scoped>
.Swiper{
    height: 300px;
    overflow: hidden;
}
</style>
