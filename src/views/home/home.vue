<template>
  <div id="home" class="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
    <tabcontrol @tabClick = "tabClick" 
                  :titles = "['流行','新款','精选']"
                  ref="tabContorl1"
                  class="tabcontrol" 
                  v-show="istabfixed"></tabcontrol>
    <scroll class="content" ref="scroll" 
            :probeType = "3" @scroll="contentscroll"
            :pullUpLoad= "true" @pullingUp = "loadMore">
            <!-- 子组件通过$emit发出pullingUp事件，父组件监听@pullingUp事件，之后执行loadMore方法 -->
      <homeSwipper :banners="banners" @swipperImgLoad = "swipperImgLoad" />
      <recommendViews :recommonds="recommonds" />
      <featureView />
      <tabcontrol @tabClick = "tabClick" 
                  :titles = "['流行','新款','精选']"
                  ref="tabContorl2"
                  ></tabcontrol>
      <goodsList :goods = "showGoods"></goodsList>
    </scroll>
    <backTop @click.native="backClick" v-show="isShow"></backTop>
  </div>
</template>

<script>
import homeSwipper from "./childComps/homeSwiper";
import recommendViews from "./childComps/recommendView";
import featureView from "./childComps/featureView";

import navbar from "components/common/navbar/navbar";
import tabcontrol from "components/content/tabcontrol/tabcontrol";
import goodsList from "components/content/goods/goodsList";
import scroll from "components/common/scroll/scroll";
import backTop from "components/content/backTop/backTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
// import { debounce } from "../../common/utiles";
import { itemListenerMixin } from "../../common/minin"


export default {
  name: "home",
  mixins: [itemListenerMixin],
  data() {
    return {
      msg: "",
      banners: [],
      recommonds: [],
      goods: {
        pop:{page: 0, list: []},
        new:{page: 0, list: []},
        sell:{page: 0, list: []},
      },
      currentType: 'pop',
      isShow: false,
      tabOffsetTop: 0,
      istabfixed: false,
      saveY: 0
    };
  },
  components: {
    homeSwipper,
    recommendViews,
    featureView,
    navbar,
    tabcontrol,
    goodsList,
    scroll,
    backTop
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  // home离开时记录状态和位置
  activated() {
    this.$refs.scroll.scrollTo (0, this.saveY , 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getSrcollY()
    console.log(this.saveY)

    // 2.取消全局事件监听
    this.$bus.$off('itemImageLoad', this.ItemImageLister)
  },
  methods: {
    /**
    事件监听相关
     * **/
     tabClick (index) {
       console.log(index)
       switch (index) {
        case 0:
           this.currentType = 'pop'
           break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
       }
       console.log(this.$refs.tabcontrol1)
      //  改变选中样式
       this.$refs.tabContorl1.currentIndex = index
       this.$refs.tabContorl2.currentIndex = index
    },
    // 1.置顶
    backClick () {
      console.log(33)
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    // 2.滚动条位置
    contentscroll(position) {
      // console.log(position)
      // 1.判断backtop是否显示
      this.isShow = (-position.y) > 1000
      // 2.决定tabcontrol是都吸顶
      this.istabfixed = (-position.y) > this.tabOffsetTop
    },
    // 4.防抖 让刷新执行的尽量不频繁 封装utiles.js
    // 3.上拉加载更多
    loadMore() {
      console.log('首页滚动到底部')
      this.getHomeGoods(this.currentType)
      // 解决better-SCROLL可滚动区域的问题，图片加载完成之后有了新的高度，但better-scrolll的scrollerHeight没有更新，
      // 监听每一张图片是否加载完成img.onload=function(){}，只要一张图片加载完成了，就执行一次refresh（）
    },
    // 5.吸顶效果拿到offsetTop的值，所有的组件都有一个属性$el:获取组件中元素
    swipperImgLoad() {
      this.tabOffsetTop = this.$refs.tabContorl2.$el.offsetTop
      console.log(this.tabOffsetTop)
    },
    /**
     * 网络请求相关的方法
     * **/
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommonds = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        console.log(res, type, page)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp() // 解决上拉加载更多第二次不请求数据，只上拉加载一次的问题
      })
    }
  }
};
</script>

<style scoped>
#home {
  /* 整体高度100视口，百分之百的高度或者使用定位 */
  /* padding-top:44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top:0; */
  /* z-index: 9; */
}
/* .tabcontrol{
 position: sticky;吸顶效果 
  top:44px;
  z-index: 9px;
} */

/* .content{
  计算内容高度calc
  height:calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */

.content {
  /* 解决高度的问题 */
  position:absolute;
  top:44px;
  bottom: 49px;
  left:0;
  right:0;
  overflow: hidden;
}
 /* 吸顶效果 */
.tabcontrol {
  position:relative;
  z-index: 9;
}
</style>
