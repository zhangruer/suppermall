<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <MainTabBar></MainTabBar>
  </div>
</template>
<script>
   import MainTabBar from 'content/mainTabbar/MainTabBar'
   export default {
      name: "app",
      components: {
        MainTabBar
      }
    }
</script>
<style>
  @import 'assets/css/base.css';
</style>
