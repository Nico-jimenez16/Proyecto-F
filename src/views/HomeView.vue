<template>
  <div class="home">
    <!-- <h1 class="text-3xl mt-4 font-bold">{{ view }}</h1> -->
    <div class="flex justify-center items-center w-full">
      <div class="flex flex-col absolute w-full justify-end items-center p-2 md:p-4 backdrop-opacity-10 backdrop-invert bg-black/30">
        <h2 class="text-md md:text-4xl font-bold text-white p-4">TUS MEJORES COMIDAS AQUI !!</h2>
        <router-link class="w-1/2 md:w-1/5" :to="{name: 'productos'}">
          <div class="p-2 text-white bg-[#2c3e50] rounded-xl font-bold border-2">Hace tu Pedido</div>
        </router-link>
      </div>
      <img class="w-full h-22 md:h-80" src="https://dam.ngenespanol.com/wp-content/uploads/2019/04/hamburguesa-mundo.png" alt="banner">
    </div>
    <h1 class="text-3xl mt-2 bg-lime-300 p-4">{{ titulo }}</h1>
    <Productos :productos="producto"></Productos>
    <Carrito></Carrito>
    <router-link :to="{ name: 'productos'}" >
      <div class="flex w-full justify-center"> 
        <button class="border-2 p-4 bg-cyan-700 text-white w-2/3 md:w-1/3 rounded-md mb-4">Ver todos los productos</button>
      </div>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import Productos from '@/components/Productos.vue'
import Carrito from '@/components/Carrito.vue'
import servicios from '@/data/servicios'

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
    let resultado = await servicios.obtenerProductos()
    for(let prod of resultado){
      if(prod.favorito) this.producto.push(prod)
    }
  },
  components: { Productos , Carrito}
}
</script>
