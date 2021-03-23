<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>

  </el-container>
  <!-- <transition name="fade">
    <router-view></router-view>
  </transition> -->
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>

</style>
