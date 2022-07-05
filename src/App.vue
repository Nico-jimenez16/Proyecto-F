<template>
  <div id="app">
    <Header></Header>
    <nav class="flex w-full justify-left items-center px-4 border-b-2">
        <router-link class="mt-2" :to="{ name: 'home'}" >
          <h2 class="text-cyan-700 font-bold px-4 mb-2">Inicio</h2>
        </router-link> |
        <router-link class="mt-2" :to="{name: 'productos'}" >
          <h2 class="text-cyan-700 font-bold px-4 mb-2">Productos</h2>
        </router-link>
    </nav>
    <router-view/>
    <Footer></Footer>
  </div>
</template>


<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
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
