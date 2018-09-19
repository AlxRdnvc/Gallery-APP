<template>
  <div id="app">
    <div id="nav">
      <NavBar />
      <router-view></router-view> 
    </div>
  </div>
</template>
<script>
import NavBar from './components/NavBar.vue'

export default {
    name: 'app',
    components: {
      NavBar
  }
}
</script>
<style>
html body {
      background-image: linear-gradient(to right, white, #e4e4e4);
  }
</style>


