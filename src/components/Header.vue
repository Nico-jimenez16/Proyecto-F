<template>
  <div class="Header">
    <div class="text-white w-full p-4 h-36 mb-2">
        <div class="flex w-full h-full text-black border-b">
            <div class="flex w-1/2 flex-col font-bold hidden md:flex items-start justify-center">
                <h2 class="text-2xl">{{ titulo }}</h2>
                <a class="text-xl">{{ entrega }}</a>
            </div>
            <div class="flex w-1/2 md:hidden items-end justify-center mb-2 pr-4">
                <h2 class="text-xl sm:text-lg">{{ titulo }}</h2>
            </div>
            <div v-if="!getResultadoLogin" class="block md:flex w-1/2 justify-center items-center">
              <router-link :to="{name: 'login'}">
                <div class="flex justify-center items-center w-full h-10 mr-2 border-2 rounded-full px-2 bg-white">
                  <p class="w-full">Iniciar Sesion</p>
                </div>
              </router-link>
              <router-link :to="{name: 'registro'}">
                <div class="flex justify-center items-center w-full h-10 mt-2 md:mt-0 md:ml-2 border-2 rounded-full px-2 bg-white">
                  <p class="w-full">Registrarse</p>
                </div>
              </router-link>
            </div>
            <div v-if="getResultadoLogin" class="flex w-1/2 justify-center items-center">
              <div class="flex flex-col items-center bg-cyan-700 text-white rounded-xl p-2">
                <img src="../assets/images/user.png" alt="user">
                <h3 class="text-xl">{{ getUser.nombre }}</h3>
              </div>
              <button class="ml-4 bg-cyan-700 p-4 rounded-xl text-white font-bold" @click="this.Salir">Cerrar Sesion</button>
            </div>
        </div>
    </div>
  </div>
</template>


<script>
import { mapGetters , mapMutations } from 'vuex'


export default {
  name: 'Header',
  data() {
      return {
        titulo: 'Angel Nicolas Jimenez',
        entrega: 'VueJs - Proyecto final'
      }
  },
  computed: {

    ...mapGetters(
      ['getResultadoLogin' , 'getUser']
    )

  },
  methods:{
    ...mapMutations(
      ['Salir']
    )
  }

}
</script>

<style scoped>
.Header{
  background-image: url('https://ingenieriademenu.com/wp-content/uploads/2021/01/Pollo-biryani-comida-hindu.jpg');
}
</style>