<template>
  <div id="home" class="md:py-2 lg:py-0">
    <div class="flex relative justify-center items-center w-full">
      <div class="flex flex-col absolute w-full justify-center items-center p-2 md:p-4 backdrop-opacity-10 backdrop-invert bg-white/40">
        <h2 class="text-md md:text-4xl font-bold p-4">TU PLATO FAVORITO AQUI !!</h2>
        <router-link class="w-1/2 lg:w-1/5" :to="{name: 'productos'}">
          <div class="p-2 text-white bg-[#2c3e50] rounded-xl font-bold border-2">Hace tu Pedido</div>
        </router-link>
      </div>
      <img class="w-full h-22 md:h-80" src="https://dam.ngenespanol.com/wp-content/uploads/2019/04/hamburguesa-mundo.png" alt="banner">
    </div>
    <h1 class="text-3xl mt-4 p-4 underline">{{ titulo }}</h1>
    <Productos :productos="producto"></Productos>
    <router-link :to="{ name: 'productos'}" >
      <div class="flex w-full justify-center"> 
        <button class="p-2 text-cyan-700 font-bold text-sm w-full md:text-xl md:w-1/2 mb-4">VER TODOS LOS PRODUCTOS<span class="font-bold text-cyan-700 ml-4"> >>> </span></button>
      </div>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import Productos from '@/components/Productos.vue'
import servicios from '@/data/servicios'
import { mapMutations } from 'vuex'

export default {
  name: 'HomeView',
  data(){
    return {
        view: 'Home',  
        titulo: 'Productos Favoritos',
        producto: []
    }
  },
  async mounted(){
    this.CambiarView('Home')
    let productos = await servicios.obtenerProductos()
    for(let producto of productos){
      if(producto.favorito) this.producto.push(producto)
    }
  },
  components: { Productos },
  methods:{
    ...mapMutations(
            ['CambiarView']
    ),
  }
}
</script>
