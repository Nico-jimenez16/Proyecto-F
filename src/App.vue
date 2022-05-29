<template>
  <div id="app">
    <Header></Header>
    <div class="flex w-full justify-left items-center border-b-2">
        <router-link class="mt-2" to="/" >
          <h2 class="text-cyan-700 font-bold px-4 mb-2">Inicio</h2>
        </router-link> |
        <router-link class="mt-2" to="/productos" >
          <h2 class="text-cyan-700 font-bold px-4 mb-2">Productos</h2>
        </router-link>
    </div>
    <router-view/>
  </div>
</template>


<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
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
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
