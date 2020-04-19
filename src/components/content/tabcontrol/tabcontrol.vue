<template>
  <div class="tabcontrol">
      <div v-for="(item, index) in titles" :key="index" 
      class="tabcontrol-item" :class="{active: index===currentIndex}"
      @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "tabcontrol",
  props: {
      titles:{
        type: Array,
        default() {
            return [];
        }
      }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.tabcontrol{
  display: flex;
  justify-content: space-around;
  line-height: 40px;
  height: 40px;
  font-size: 14px;
  background-color: #fff;
}
.tabcontrol-item span{
  padding:5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-high-text)
}
</style>
