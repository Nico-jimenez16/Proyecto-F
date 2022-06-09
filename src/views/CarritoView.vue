<template>
  <div class="carrito">
      <h1 class="text-3xl mt-4 font-bold mb-4">{{ view }}</h1>
      <div class="flex text-black p-8">
        <div class="w-1/2 bg-state-300 movies mt-2">
            <div class="flex w-full flex-col justify-center items-center">
                <h2 v-if="getCantidadProductos != 0" class="text-xl font-bold mb-4">Productos Seleccionados !</h2>
                    <div v-for="(producto, index) of getProductos" :key="index" class="flex mb-2 relative shadow-lg hover:-translate-y-1 hover:scale-110 hover:bg-transparent duration-300 w-full lg:w-3/4 xl:w-3/4 bg-transparent text-black font-bold border-2 rounded-xl p-4">
                      <div class="h-32">
                        <img :src="getImage(producto.url)" class="h-full m-auto" :alt="producto.descripcion">
                      </div>
                      <div class="flex flex-col w-1/2 h-auto">
                          <div class="mt-2">
                              <p class="w-full">{{ producto.descripcion }}</p>
                              <p class="w-full">$ {{ producto.precio }}</p>
                          </div>
                          <div class="mt-2">
                              <button class="border-2 bg-black text-white ml-2 p-2" @click="Agregar(producto)" >+</button>
                              <button class="border-2 bg-black text-white ml-2 p-2" @click="DeleteCarrito(producto.id)" >-</button>
                          </div>
                      </div>
                      <div class="absolute top-0 p-2 right-0 bg-red-500 rounded-md">
                          <h2 class="justify-end">{{ producto.enCarrito }}</h2>
                      </div>
                    </div>
                <div v-if="getCantidadProductos == 0" class="flex justify-center items-end h-full w-full mt-2">
                    <h3 class="text-3xl">! No hay productos en el carrito !</h3>
                </div>
            </div>
        </div>
        <div class="w-1/2">
            <div class="flex">
              <router-link class="w-full" to="/productos" >
              <div class="flex justify-center items-center w-full mt-2">
                  <button class="w-2/3 p-4 border-2 hover:bg-lime-300 rounded-xl text-black mb-2"> -- Seguir Comprando -- </button>
              </div>
            </router-link>
            </div>
            <h1 v-if="getTotal != 0" class="flex justify-center text-2xl text-red-600 mt-4 mb-4 mt-8">Total: $ {{ getTotal }}</h1>
            <div v-if="getCantidadProductos != 0" class="flex justify-center items-start w-full mt-2">
                <button class="w-2/3 bg-cyan-700 p-4 rounded-xl text-white mb-2" @click="Comprar(getProductos)">Comprar</button>
            </div>
        </div>
      </div>
      <div class="w-full" v-show="getResultadoLogin && compras != 0">
        <h1 class="text-3xl mt-4 font-bold mt-4 mb-4">Compras Realizadas !</h1>
        <div class="flex justify-center w-full mb-4">
          <table class="w-full table-auto text-xl m-4">
              <thead class="h-full bg-black text-white p-8">
                  <tr>
                      <th scope="col">Usuario</th>
                      <th scope="col">Descipcion</th>
                      <th scope="col">Precio x unidad</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Dia y Hora</th>
                      <th scope="col">total</th>
                  </tr>
              </thead>

              <!-- Tabla de Compras por usuarios -->

              <tbody v-for="(compra ,i) of compras" :key="i" class="flex-inline text-xl">
                  <tr class="border">
                      <td>{{ compra.user }}</td>
                      <td>{{ compra.descripcion }}</td>
                      <td>{{ compra.precio }}</td>
                      <td>{{ compra.cantidad }}</td>
                      <td>{{ compra.hora }}</td>
                      <td>$ {{ compra.precio * compra.cantidad }}</td>
                  </tr>
              </tbody>
            </table>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters , mapMutations } from 'vuex'
import servicios from '@/data/servicios'


export default {
  name: 'CarritoView',
  data() {
    return {
      view: 'Carrito',
      compras: []
    }
  },
  computed: {

    ...mapGetters(
      ['getProductos','getCantidadProductos','getTotal','getUser','getResultadoLogin']
    ),
  },
  async mounted(){
      await this.cargarCompras()
  },
  methods:{

    ...mapMutations(
      ['agregarProductos', 'eliminarProducto', 'vaciarProductos']
    ),

    getImage(img){
      return require(`@/assets/images/${img}`)
    },

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

    DeleteCarrito(id){
      this.eliminarProducto(id)
    },
    
    getRandomArbitrary() {
      return Math.random() * (1000 - 1) + 1;
    },

    async Comprar(productos){
      if(this.getResultadoLogin){
        for(let prod of productos){
          const compra = {
              "descripcion": prod.descripcion,
              "precio": prod.precio,
              "cantidad" : prod.enCarrito,
              "user": this.getUser.dni,
              "hora": new Date()

            }
          await servicios.agregarCompraXUsuario(compra)
          await this.cargarCompras()
          this.vaciarProductos()
        }
      }
      else{
        alert('Inicie Sesion Para Terminar Su Compra')
      }
    },

    async cargarCompras(){
      this.compras = []
      const productos = await servicios.obtenerProductoXusuario()
      for(let prod of productos){
        if(this.getUser.dni == prod.user){
          this.compras.push(prod)
        }
      }

    }
  }
}
</script>

<style>

</style>
