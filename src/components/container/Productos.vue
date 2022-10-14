<template>
  <div class="Productos">
      <div class="text-black">
          <div v-if="getUser.rol == 'admin'" class="w-full flex justify-center mt-4">
            <router-link class="w-4/5 md:w-1/3" :to="{name: 'nuevoProducto'}">
              <button class="w-full bg-cyan-700 p-4 rounded-xl text-white">Nuevo Producto</button>
            </router-link>
          </div>
          <!-- ? componente Loader si aun no hay productos que mostrar  -->
          <div v-if="getLoader" id="loader">
            <LoaderProducto/>
          </div>
          <!-- ? muestra mensaje de producto no encontrado si el filtro de producto devulve un array vacio  -->
          <div v-if="productos != null && productos.length === 0">
            <h1 class="flex justify-center items-center text-3xl py-8"> Producto no encontrado ! </h1>
          </div>
          <!-- ? Muestra los productos si el array ya existen productos  -->
          <div v-if="productos" class="w-full flex flex-row flex-wrap justify-center items-center">
            <div v-for="(product, index) of productos" :key="index" class="card">
                <Producto
                  :producto="product"
                  :key="index"
                  :add="Agregar"
                />
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters , mapMutations } from 'vuex';
import LoaderProducto from '../loader/LoaderProducto.vue';
import Producto from '../pure/Producto.vue'


export default {
  name: 'IndexProductosComponent',
  components: { Producto , LoaderProducto },
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
      ['agregarProductos']
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

<style>
.card{
  max-width: 307px;
}

</style>