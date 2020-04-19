<template>
  <div class="goodsList">
      <!-- {{goods}} -->
      <goodsListItem v-for="(item, index) in goods" :key="index" :goodsItem= "item"></goodsListItem>
  </div>
</template>

<script>
import goodsListItem from './goodsListItem'

export default {
  name: 'goodsList',
  components: {
    goodsListItem
  },
  props: {
    goods: {
      type: Array,
      default () {
          return []
      }
    }
  },
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
.goodsList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding:5px;
}
</style>
