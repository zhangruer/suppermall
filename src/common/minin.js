import { debounce } from "./utiles";

export const itemListenerMixin = {
    data() {
      return {
        ItemImageLister: null
      }
    },
    mounted() {
        // 3.监听item中的图片是否加载完成
        // 解决better-SCROLL可滚动区域的问题，图片加载完成之后有了新的高度，但better-scrolll的scrollerHeight没有更新，
        // 监听每一张图片是否加载完成img.onload=function(){}，只要一张图片加载完成了，就执行一次refresh（）
        const refresh = debounce(this.$refs.scroll.refresh, 200) // 防抖
        this.ItemImageLister = () => {
          // console.log('首页bus监听图片加载完成---')
          // this.$refs.scroll.refresh()
          refresh()
        }
        this.$bus.$on('itemImageLoad', this.ItemImageLister)
        console.log('我是混入中的内容')
    }
}