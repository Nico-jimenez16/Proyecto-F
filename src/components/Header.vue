<template>
  <div class="Header">
    <div class="text-white w-full p-2 h-32 mb-2 bg-lime-300">
        <div class="flex w-full h-full text-black md:border-b">
            <div class="flex w-1/2 flex-col font-bold hidden md:flex items-start justify-center">
                <h2 class="text-2xl">{{ titulo }}</h2>
                <a class="text-xl">{{ entrega }}</a>
            </div>
            <div class="flex w-1/2 md:hidden items-center justify-center mb-2 pr-4">
                <h2 class="text-xl sm:text-lg">{{ titulo }}</h2>
            </div>
            <div v-if="!getResultadoLogin" class="block m-auto md:flex w-1/2 justify-center items-center">
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
            <div v-if="getResultadoLogin" class="block m-auto md:flex w-1/2 h-auto justify-center items-center">
              <div class="flex justify-center items-center text-black rounded-xl mb-1 md:mb-0 p-0 md:py-2 md:px-6 user">
                <img class="h-10" src="../assets/images/user.png" alt="user">
                <h3 class="text-md md:text-xl">{{ getUser.usuario }}</h3>
              </div>
              <button class="flex w-full md:w-auto justify-center p-2 md:py-3 md:px-4 rounded-xl text-black text-md md:text-xl md:ml-4 salir" @click="this.Salir">Cerrar Sesion</button>
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
.user , .salir{
  border: 2px solid rgb(101 163 13);
  background-color: aliceblue;
}
</style>