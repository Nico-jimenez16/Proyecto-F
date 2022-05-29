<template>
  <div class="Productos">
      <div class="text-black">
          <div class="w-full bg-state-300 p-4 movies mt-2">
              <div class="w-full flex flex-row flex-wrap justify-center">
                  <div v-for="(producto, index) of productos" :key="index" class="relative shadow-lg hover:-translate-y-1 hover:scale-110 hover:bg-transparent duration-300 w-full lg:w-1/3 xl:w-1/4 bg-transparent text-black font-bold m-4 border-2 rounded-xl p-4">
                      <img v-if="producto.favorito" src="https://img2.freepng.es/20180330/ije/kisspng-check-mark-computer-icons-clip-art-green-tick-5abe6d03cd5cd5.7558588915224291878412.jpg" class="flex absolute top-0 right-0 w-1/5 lg:w-1/4">
                      <router-link :to="{name: 'detalle' , params: {id: producto.id} }">
                        <div class="h-56">
                          <img :src="getImage(producto.url)" class="h-full m-auto" :alt="producto.descripcion">
                        </div>
                      </router-link>
                      <div class="flex flex-col w-full">
                          <div class="mt-2">
                              <p class="w-full">{{ producto.descripcion }}</p>
                              <p class="w-full">$ {{ producto.precio }}</p>
                          </div>
                      </div>
                      <div class="flex flex-col mt-2">
                        <!-- <div class="mb-2">
                          <button v-if="getProductos.enCarrito != 0" class="bg-lime-600 rounded-full p-2 text-white mr-2" @click="AddCarrito(producto.id)">Sumar Carrito</button>
                          <button v-if="getProductos.enCarrito != 0" class="bg-lime-600 rounded-full p-2 text-white" @click="DeleteCarrito(producto.id)">Restar Carrito</button>
                        </div> -->
                        <button class="bg-lime-600 p-4 rounded-xl text-white mb-2" @click="Agregar(producto)">Agregar a Carrito</button>
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
      ['getProductos','getCantidadProductos','getShow']
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

    DeleteCarrito(id){
      this.eliminarProducto(id)
    }
  }
  
}
</script>