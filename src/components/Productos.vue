<template>
  <div class="Productos">
      <div class="text-black">
          <div v-if="getUser.rol == 'admin'" class="w-full flex justify-start mt-4">
            <router-link class="w-full" :to="{name: 'nuevoProducto'}">
              <button class="w-2/3 md:w-1/3 bg-cyan-700 ml-4 p-4 rounded-xl text-white">Nuevo Producto</button>
            </router-link>
          </div>
          <div class="w-full bg-state-300 p-4 mt-2">
              <div class="w-full flex flex-row flex-wrap justify-center">
                  <div v-for="(producto, index) of productos" :key="index" class="relative shadow-lg hover:-translate-y-1 hover:scale-110 hover:bg-transparent duration-300 w-full lg:w-1/3 xl:w-1/4 bg-transparent text-black m-4 border-2 rounded-xl p-4">
                      <img v-if="producto.favorito" src="https://img2.freepng.es/20180330/ije/kisspng-check-mark-computer-icons-clip-art-green-tick-5abe6d03cd5cd5.7558588915224291878412.jpg" class="flex absolute top-0 right-0 w-1/5 lg:w-1/4">
                      <router-link :to="{name: 'detalle' , params: {id: producto.id} }">
                        <div class="h-56">
                          <img :src="getImage(producto.url)" class="h-full m-auto" :alt="producto.descripcion">
                        </div>
                      </router-link>
                      <div class="flex flex-col w-full">
                          <div class="mt-2">
                              <h1 class="w-full font-bold">{{ producto.descripcion }}</h1>
                              <h2 class="w-full">Precio $ {{ producto.precio }}</h2>
                              <label class="flex justify-start">Detalle</label>
                              <p class="whitespace-nowrap	text-ellipsis	overflow-hidden text-sm border-t-2 h-12 pt-2 items-center">{{ producto.detalle }}</p>
                          </div>
                      </div>
                      <div class="flex flex-col mt-2">
                        <button class="bg-lime-600 p-4 rounded-xl text-white mb-2" @click="Agregar(producto)">Agregar a Carrito</button>
                        <router-link :to="{name: 'detalle' , params: {id: producto.id} }">
                          <button v-if="getUser.rol == 'admin' " class="w-full bg-cyan-700 p-4 rounded-xl text-white">Modo Administrador</button>                     
                        </router-link>
                        <p v-if="producto.disponibilidad == 0" class="p-4 rounded-xl text-[#dc2626]">Sin Stock</p>
                        <p v-if="producto.enCarrito != 0" class="bg-red-600 w-1/6 rounded-xl text-white">{{producto.enCarrito}}</p>
                      </div>
                  </div> 
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters , mapMutations } from 'vuex'


export default {
  name: 'Productos',
  data(){
    return{
      
    }
  },
  props: {
    productos:{
      type: Array,
      require: true
    }
  },
  computed: {

    ...mapGetters(
      ['getProductos' ,'getUser']
    )
  },
  methods: {

    ...mapMutations(
      ['agregarProductos', 'eliminarProducto' , 'CambiarShow']
    ),


    // FUNCION PARA LEER LAS IMAGENES QUE ESTAN EN ASSETS/IMAGE

    getImage(img){
      return require(`@/assets/images/${img}`)
    },

    // FUNCION PARA AGREGAR PRODUCTOS AL CARRITO

    Agregar(producto){
      const prod = {

            "id": producto.id,
            "url" : producto.url,
            "descripcion": producto.descripcion,
            "precio": producto.precio,
            "disponibilidad" : producto.disponibilidad,
            "favorito": producto.favorito,
            "enCarrito": 1
          }
      this.agregarProductos(prod)
    },

    // FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO

    // DeleteCarrito(id){
    //   this.eliminarProducto(id)
    // }
  }
  
}
</script>

<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
-webkit-appearance: none;
margin: 0;
}
</style>