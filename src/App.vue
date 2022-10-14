<template>
  <div id="app" class="lg:flex">
    <div class="sidebar bg-lime-300">
      <Header/>
    </div>
    <div class="body">
      <div class="hidden lg:block">
        <AutenticacionComponent/>
      </div>
      <router-view/>
      <Footer/>
    </div>
  </div>
</template>


<script>
import Footer from './components/pure/Footer.vue'
import AutenticacionComponent from './components/pure/Autenticacion.vue'
import Header from './components/container/Header.vue'

export default {
  name: 'App',
  components: {
    Footer,
    AutenticacionComponent,
    Header
  }
}
</script>

<style>

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
-webkit-appearance: none;
margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  z-index: -1;
  display: block;
  background-color: #FFFFFF;
}
.sidebar{
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  height: 5rem;
}
@media (min-width: 1024px) {
  .sidebar{
    min-width: 4rem;
    width: 6rem;
    height: 100vh;
    z-index: 101;
    display: flex;
    flex-direction: column;
    position: fixed;
    
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: linear;

  }
  .sidebar:hover {
    width: 16rem;
  }
  .body{
    padding-left: 6rem;
  }
}

</style>
