<template>
  <div class="Productos">
      <div class="text-black">
          <div v-if="getUser.rol == 'admin'" class="w-full flex justify-center mt-4">
            <router-link class="w-4/5 md:w-1/3" :to="{name: 'nuevoProducto'}">
              <button class="w-full bg-cyan-700 p-4 rounded-xl text-white">Nuevo Producto</button>
            </router-link>
          </div>
          <div v-if="getLoader" id="loader">
            <Loader/>
          </div>
          <div v-if="productos != null && productos.length === 0">
            <h1 class="flex justify-center items-center text-3xl py-8"> no characters found ! </h1>
          </div>
          <div v-if="productos" class="w-full bg-state-300 p-2">
            <div class="w-full flex flex-row flex-wrap justify-center">
                  <div v-for="(producto, index) of productos" :key="index" class="relative shadow-2xl hover:-translate-y-1 hover:scale-110 hover:bg-transparent duration-300 p-4 m-4 w-1/3 md:w-2/5 lg:w-1/5 bg-transparent text-black border-2 rounded-xl product">
                    <router-link :to="{name: 'detalle' , params: {id: producto.id} }">
                        <div class="h-32 md:h-40 lg:h-40 m-auto w-fit">
                          <img :src="producto.url" class="w-full h-full rounded-xl m-auto imgProduct" :alt="producto.descripcion">
                        </div>
                      </router-link>
                      <div class="flex flex-col w-full">
                        <div class="mt-2">
                          <h1 class="w-full font-bold">{{ producto.descripcion }}</h1>
                              <h2 class="w-full">Precio $ {{ producto.precio }}</h2>
                          </div>
                      </div>
                      <img v-if="producto.favorito" src="https://cdn-icons-png.flaticon.com/512/3699/3699516.png" class="flex absolute -top-3 -right-3 w-1/5 lg:w-1/5">
                      <div class="flex flex-col mt-2">
                        <button v-if="producto.disponibilidad != 0" class="bg-lime-500 p-1 md:p-3 rounded-xl text-white mb-2 AddCarrito" @click="Agregar(producto)">Agregar a carrito</button>
                        <router-link :to="{name: 'detalle' , params: {id: producto.id} }">
                          <button v-if="getUser.rol == 'admin' " class="w-full bg-cyan-700 p-1 lg:p-4 rounded-xl text-white">Administrador</button>             
                        </router-link>
                        <p v-if="producto.disponibilidad == 0" class="p-4 rounded-xl text-xl text-[#dc2626]">Sin Stock</p>
                        <p v-if="producto.enCarrito != 0" class="bg-red-600 w-1/6 rounded-xl text-white">{{producto.enCarrito}}</p>
                      </div>
                  </div> 
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters , mapMutations } from 'vuex';
import Loader from '../components/Loader.vue';


export default {
  name: 'ProductComponent',
  components: { Loader },
  props: {
    productos:{
      type: Array,
      require: true
    }

  },
  computed: {

    ...mapGetters(
      ['getUser' , 'getLoader']
    )

  }, 
  methods: {

    ...mapMutations(
      ['agregarProductos', 'eliminarProducto']
    ),

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
    }
  }
}
</script>

<style scoped>
  
  .imgProduct{
    min-width: 227px !important;
  }
  .product{
    min-width: 17.5rem;
  }

</style>