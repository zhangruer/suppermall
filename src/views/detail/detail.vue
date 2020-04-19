<template>
  <div class="detail">
    <detailNavBar></detailNavBar>
  </div>
</template>

<script>
import detailNavBar from "./childComps/detailNavBar";
export default {
  name: 'detail',
  data () {
    return {
      msg: '',
      iid: null
    }
  },
  components: {
    detailNavBar
  },
  created() {
    this.iid = this.$route.params.iid
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
