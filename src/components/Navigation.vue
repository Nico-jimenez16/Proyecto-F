<template>
    <nav>
      <div id="desk" class="relative hidden md:flex w-full justify-left items-center px-4 py-2 border-b-2">
        <router-link class="mt-2" :to="{ name: 'home'}" >
          <h2 class="text-cyan-700 font-bold px-4 mb-2">Inicio</h2>
        </router-link> |
        <router-link class="mt-2" :to="{name: 'productos'}" >
          <h2 class="text-cyan-700 font-bold px-4 mb-2">Productos</h2>
        </router-link>
      </div>
      <div v-show="getMobile" id="mobile" class="absolute w-full top-0 h-28 md:hidden bg-white border-b-2">
        <div class="flex w-full justify-center items-center h-full">
          <div @click="CambiarShowMobile" class="w-1/3">
            <img class="w-8 m-auto" src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png">
          </div>
          <div class="flex justify-around w-2/3">
            <router-link :to="{ name: 'home'}" >Inicio</router-link>
            <router-link :to="{name: 'productos'}" >Productos</router-link>
            <router-link :to="{name: 'carrito'}">Carrito</router-link>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
import { mapGetters , mapMutations } from 'vuex'


export default {
  name: 'Navigation',
  computed: {

    ...mapGetters(
      ['getMobile']
    )

  },
  methods:{
    ...mapMutations(
      ['CambiarShowMobile']
    )
  }

}
</script>