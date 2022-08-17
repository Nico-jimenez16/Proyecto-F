<template>
  <div id="app">
    <Header></Header>
    <Navigation></Navigation>
    <router-view/>
    <Footer></Footer>
  </div>
</template>


<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Navigation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  z-index: -1;
}
</style>
