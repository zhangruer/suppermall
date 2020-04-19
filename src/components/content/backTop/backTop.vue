<template>
<!-- 置顶 -->
  <div class="backTop">
      <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "backTop",
  data () {
    return {
      msg: ''
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.backTop {
    position: fixed;
    right: 8px;
    bottom: 55px;
}
.backTop img{
    width:43px;
    height: 43px;
}
</style>
