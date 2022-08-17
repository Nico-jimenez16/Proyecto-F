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
      <div v-show="getMobile" id="mobile" class="block md:hidden w-full bg-white border-b-2">
        <router-link class="mt-2" :to="{ name: 'home'}" >
          <h2 class="text-cyan-700 font-bold px-4 my-2">Inicio</h2>
        </router-link>
        <router-link class="mt-2" :to="{name: 'productos'}" >
          <h2 class="text-cyan-700 font-bold px-4 mb-2">Productos</h2>
        </router-link>
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