<template>
<!-- 滚动条 -->
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'scroll',
  props: {
      probeType: {
          type: Number,
          default() {
              return 0
          }
      },
      pullUpLoad: {
          type: Boolean,
          default() {
              return false
          }
      }
  },
  data () {
    return {
      msg: '',
      scroll: null
    }
  },
  mounted () {
    //   1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType, // 滚动条的位置
          pullUpLoad: this.pullUpLoad
      })
    // 2.监听滚动条的位置
   if (this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', (position) => {
            // console.log(position)
            this.$emit('scroll', position)
        })
   }
    // 3. 监听scroll滚动到底部,上拉加载更多
    if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
            console.log('滚动到底部')
            this.$emit('pullingUp')
        })
    }
  },
  methods: {
      // 置顶
      scrollTo(x, y, time = 300) {
          this.scroll && this.scroll.scrollTo(x, y, time) // 判断this.scroll
      },
      // 完成上拉加载更多
      finishPullUp() {
          this.scroll.finishPullUp()
      },
      // 刷新
      refresh() {
          console.log('防抖-------')
          this.scroll && this.scroll.refresh()
      },
      getSrcollY() {
          return this.scroll ? this.scroll.y : 0
      }
  }
}
</script>

<style scoped>

</style>
