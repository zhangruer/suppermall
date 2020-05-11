<template>
  <div class="goodsListItem" @click="itemclick">
      <div>
            <img :src="showImage" :key="showImage" @load="imageLoad" alt="">
            <div class="goodsListItem-info">
                <p :key="goodsItem.title">{{goodsItem.title}}</p>
                <span class="price" :key="goodsItem.price">{{goodsItem.price}}</span>
                <span class="collect" :key="goodsItem.cfav">{{goodsItem.cfav}}</span>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'goodsListItem',
  props: {
      goodsItem: {
        type: Object,
        default () {
            return {}
        }
      }
  },
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      // 监听每一张图片是否加载完成
      console.log('imageLoad')
      this.$bus.$emit('itemImageLoad')
      // if (this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit('homeitemImageLoad')
      // } else if (this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailitemImageLoad')
      // }
    },
    itemclick() {
      console.log('跳转到详情页')
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goodsListItem {
    width: 48%;
    height: 100%;
    padding-bottom: 40px;
    /* padding:10px; */
  }
  .goodsListItem img {
    width: 100%;
    height: 100%;
  }

  .goodsListItem-info {
    font-size: 12px;
    overflow: hidden;
    text-align: center;
  }

  .goodsListItem-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goodsListItem-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  /* .goodsListItem-info .collect {
    position: relative;
  } */

  .goodsListItem-info .collect::before {
    content: '';
    /* position: absolute;
    left: -15px;
    top: 0; */
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg");
  }
</style>
