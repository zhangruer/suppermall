<template>
  <div class="recommondView">
    <div
      class="recommondView-item"
      v-for="(item, index) in recommonds"
      :key="index"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommondView",
  props: {
    recommonds: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      msg: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
.recommondView {
  display: flex;
  justify-content: space-around;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommondView-item img {
  width: 80px;
  height: 80px;
}
.recommondView-item div {
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
}
</style>
