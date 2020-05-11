<template>
  <div class="detail">
    <detailNavBar class="detail_nav"></detailNavBar>
    <scroll class="content" ref="scroll">
      <detailSwipper :topImages = "topImages"></detailSwipper>
      <DetailBaseInfo :goods = "goods"></DetailBaseInfo>
      <DetailShopInfo :shop = "shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo = "detailInfo" @imageLoad = "imageLoad"></DetailGoodsInfo>
      <DetailParamInfo :paramInfo = "paramInfo"></DetailParamInfo>
      <DetailCommentInfo :commentInfo = "commentInfo"></DetailCommentInfo>
      <goodsList :goods = "recommend"></goodsList>
    </scroll>
  </div>
</template>

<script>
import detailNavBar from "./childComps/detailNavBar";
import detailSwipper from "./childComps/detailSwipper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import scroll from "components/common/scroll/scroll";
import goodsList from "components/content/goods/goodsList";

import { getDetail, Goods, Shop, GoodsParams, getRecommend } from "network/detal";
// import { debounce } from "../../common/utiles";
import { itemListenerMixin } from "../../common/minin"
export default {
  name: 'detail',
  mixins: [itemListenerMixin],
  data () {
    return {
      msg: '',
      iid: null,
      topImages: [],
      itemInfo: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: []
    }
  },
  components: {
    detailNavBar,
    detailSwipper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    scroll,
    goodsList
  },
  created() {
    // 1保存传入的iid
    this.iid = this.$route.params.iid
    // 2根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res)
      // 1获取轮播图
      const data = res.result
      this.topImages = data.itemInfo.topImages
      console.log(this.topImages)
      // 2 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.创建店铺信息
      this.shop = new Shop(data.shopInfo)
      // 4.保存商品详情数据
      this.detailInfo = data.detailInfo
      // 5.
      this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
      // 6.评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    }),
    getRecommend().then(res => {
      this.recommend = res.data.list
    })
  },

  destroyed() {
    // 2.取消全局事件监听
    this.$bus.$off('itemImageLoad', this.ItemImageLister)
  },
  methods: {
    imageLoad() {
      //监听子组件传过来的事件
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
.detail{
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh; /*  滚动条父元素的高度为视口高度*/
}
/* 给滚动条添加高度 */
.content {
  z-index: 9;
  height: calc(100% - 44px);
  background-color: #ffffff;
}
.detail_nav{
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
/* .content {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
} */
</style>
