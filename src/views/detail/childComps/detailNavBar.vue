<template>
  <div class="detailNavBar">
      <navbar>
          <div slot="left" class="back" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
          <div class="title" slot="center">
              <div v-for="(item, index) in titles" :key="index"
                   class="title_item"
                   :class="{active: index===currentIndex}"
                   @click="titleClick(index)">
                {{item}}
              </div>
          </div>
      </navbar>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
export default {
  name: "detailNavBar",
  data () {
    return {
      msg: '',
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    navbar
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title{
    display: flex;
}
.title_item{
    flex: 1;
    font-size: 12px;
}
.active{
    color: var(--color-high-text);
}
.back img{
    margin-top:12px;
}
</style>
