<template>
  <div class="home">
    <h1 class="text-3xl mt-4 font-bold">{{ view }}</h1>
    <div class="flex justify-center items-center w-full mt-4">
      <img class="w-3/4 h-80" src="https://dam.ngenespanol.com/wp-content/uploads/2019/04/hamburguesa-mundo.png" alt="banner">
    </div>
    <h1 class="text-3xl mt-4 bg-lime-300 p-4">{{ titulo }}</h1>
    <Productos :productos="producto"></Productos>
    <Carrito></Carrito>
    <router-link to="/productos" >
      <div class="flex w-full justify-center"> 
        <button class="border-2 p-4 bg-cyan-700 text-white w-1/3 rounded-md mb-4">Ver todos los productos</button>
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
