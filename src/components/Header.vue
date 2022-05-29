<template>
  <div class="Header">
    <div class="bg-lime-300 text-white w-full p-4 h-32 mb-2">
        <div class="flex w-ful h-full text-black border-b">
            <div class="flex w-1/2 flex-col hidden md:flex items-start justify-center">
                <h2 class="text-2xl">{{ titulo }}</h2>
                <a class="text-xl"><strong></strong>{{ entrega }}</a>
            </div>
            <div class="flex w-full md:hidden items-center justify-center pr-4">
                <h2 class="text-2xl">{{ titulo }}</h2>
            </div>
            <div v-if="!getResultadoLogin" class="flex w-1/2 justify-center items-center">
              <router-link to="/login">
                <div class="flex justify-center items-center w-full h-10 mr-2 border-2 rounded-full px-2 bg-white">
                  <!-- <img class="w-10 h-auto block mr-2" src="https://cdn-icons-png.flaticon.com/512/1828/1828453.png" alt=""> -->
                  <p class="w-full">Iniciar Sesion</p>
                </div>
              </router-link>
              <router-link to="/registro">
                <div class="flex justify-center items-center w-full h-10 ml-2 border-2 rounded-full px-2 bg-white">
                  <!-- <img class="w-10 h-auto block mr-2" src="https://cdn-icons.flaticon.com/png/512/5655/premium/5655237.png?token=exp=1653437643~hmac=552e5aaf587dbb9da93680dfc4f80d47" alt=""> -->
                  <p class="w-full">Registrarse</p>
                </div>
              </router-link>
            </div>
            <div v-if="getResultadoLogin" class="flex w-1/2 justify-center items-center">
                <h3 class="bg-cyan-700 text-white text-xl p-2">Bienvenido: {{ getUser.nombre }}</h3>
                <button class="ml-4 font-bold" @click="this.Salir">Salir</button>
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
        entrega: 'Segunda entrega - Proyecto final con VueJs CLI'
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