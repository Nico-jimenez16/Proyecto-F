<template>
  <div id="Header" class="w-full h-full">
    <div class="hidden w-full h-full lg:h-16 lg:flex justify-center items-center p-2 lg:p-4 mb-0 lg:mb-4">
      <h1 class="text-3xl font-bold">NJ</h1>
    </div>
    <div id="desk" class="hidden lg:block">
      <div class="w-full flex h-14 justify-center items-center mb-4 p-2">
        <router-link class="flex w-full justify-center items-center" :to="{name: 'home'}">
            <div class="w-1/2 flex justify-center items-center hover:-translate-y-1 transition duration-300 ease-in-out">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" focusable="false" class="chakra-icon css-1fmr1qf" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path>
              </svg>
            </div>
            <div class="afectado">
                <h3 class="text-lg pl-2 font-bold">Home</h3>
            </div>
        </router-link>
      </div>
      <div class="w-full flex h-14 justify-center items-center mb-4 p-2">
        <router-link class="flex w-full justify-center items-center" :to="{name:'productos'}">
            <div class="w-1/2 flex justify-center items-center hover:-translate-y-1 transition duration-300 ease-in-out">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" focusable="false" class="chakra-icon css-1fmr1qf" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 2.01H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.998 5 19.815 5 19.01c0-.101.009-.191.024-.273.112-.575.583-.717.987-.727H20c.018 0 .031-.009.049-.01H21V4.01c0-1.103-.897-2-2-2zm0 14H5v-11c0-.806.55-.988 1-1h7v7l2-1 2 1v-7h2v12z"></path>
              </svg>
            </div>
            <div class="afectado">
                <h3 class="text-lg pl-2 font-bold">Productos</h3>
            </div>
        </router-link>
      </div>
      <div class="w-full flex h-14 justify-center items-center mb-4 p-2">
        <router-link class="flex w-full justify-center items-center" :to="{name: 'carrito'}">
            <div class="w-1/2 flex justify-center items-center">
              <carrito></carrito>
            </div>
            <div class="afectado">
                <h3 class="text-lg pl-2 font-bold">Carrito</h3>
            </div>
        </router-link>
      </div>
    </div>
    <div id="mobile" class="w-full flex flex-row lg:hidden justify-center items-center h-full">
      <div v-if="!modalNav" @click="ModalView" class="w-1/6 h-auto ml-4">
        <svg data-v-56587bc9="" width="50" height="30" xmlns="http://www.w3.org/2000/svg">
          <path data-v-56587bc9="" d="M0 0h47.727v2.727H0zM0 13.636h47.727v2.727H0zM0   27.273h47.727V30H0z"></path>
        </svg>
      </div>
      <div v-else @click="ModalView" class="w-1/6 h-auto ml-4">
        <img class="w-8" src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png">
      </div>
      <div class="w-5/6 flex justify-end items-center h-full">
        <Navigation></Navigation>
      </div>
    </div>
    <div v-if="modalNav" id="modal" class="model-movile bg-lime-300">
      <div class="w-full flex justify-center items-center">
        <h1 class="text-3xl font-bold">NJ</h1>
      </div>
      <div class="mt-4">
        <router-link :to="{name: 'home'}">
          <div @click="ModalView" class="flex w-full justify-center items-center mb-4 p-4">
            <h3 class="text-xl pl-2 underline">Home</h3>
          </div>
        </router-link>
        <router-link :to="{name: 'productos'}" >
          <div @click="ModalView" class="flex w-full justify-center items-center mb-4 p-4">
            <h3 class="text-xl pl-2 underline">Producto</h3>
          </div>
        </router-link>
        <router-link :to="{name: 'carrito'}">
          <div @click="ModalView" class="flex w-full justify-center items-center mb-4 p-4">
            <h3 class="text-xl pl-2 underline">Carrito</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import carrito from './Carrito.vue'
import Navigation from './Navigation.vue';

export default {
  name: 'HeaderComponent',
  data() {
    return {
      modalNav: false
    }
  },
  components:{carrito , Navigation},
  methods:{
    ModalView(){
      this.modalNav = !this.modalNav
    }
  }
}
</script>

<style scoped>

  .model-movile{
    width: 55%;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    height: 88vh;
    z-index: 53;

    transition: all 1s ease-in;
  }

  /* CCS PARA EL HOVER DE LOS NOMBRES . PARA QUE APAREZCAN AL HACERLE HOVER */
  .afectado{
    min-width: 0px;
    width: 0rem;
    display: none;

    transition: all 0.5s linear;
  }

  #Header:hover .afectado {
    width: 16rem;
    display: flex;
    justify-content: start;
    align-content: center;
  }

</style>