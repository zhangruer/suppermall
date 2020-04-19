<template>
  <div class="homeSwiper">
    <Swiper>
      <SwiperItem v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad" />
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "homeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      msg: "",
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad() {
      console.log('轮播图加载完成')
      if  (!this.isLoad) {
        this.$emit('swipperImgLoad')
        this.isLoad = true //isLoad变量进行状态的记录，是否已经发出事件 轮播图片四张，只需要发出一次事件，如果已经发出过事件，就不要再发出事件了
      }
    }
  }
};
</script>

<style scoped></style>
