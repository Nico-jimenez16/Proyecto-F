<template>
  <div class="carrito">
      <h1 class="text-3xl mt-4 font-bold mb-4">{{ view }}</h1>
      <div class="block md:flex text-black p-4 md:p-8">
        <div class="w-full md:w-1/2 bg-state-300 movies mt-2">
            <div class="flex w-full flex-col justify-center items-center">
                  <h2 v-if="getCantidadProductos != 0" class="text-xl font-bold mb-4">Productos Seleccionados !</h2>
                    <div v-for="(producto, index) of getProductos" :key="index" class="flex mb-2 relative shadow-lg hover:-translate-y-1 hover:scale-110 hover:bg-transparent duration-300 w-full lg:w-3/4 xl:w-3/4 bg-transparent text-black font-bold border-2 rounded-xl p-4">
                      <div class="w-1/2 h-32">
                        <img :src="getImage(producto.url)" class="h-full m-auto" :alt="producto.descripcion">
                      </div>
                      <div class="flex flex-col w-1/2 h-auto">
                          <span v-if="producto.enCarrito == producto.disponibilidad" class="text-sm text-[#dc2626]">Maximo disponible</span>
                          <div class="mt-2">
                              <p class="w-full">{{ producto.descripcion }}</p>
                              <p class="w-full">$ {{ producto.precio }}</p>
                          </div>
                          <div class="mt-2">
                              <button class="text-black md:border-2 md:bg-black md:text-white ml-4 p-2" @click="DeleteCarrito(producto.id)" >-</button>
                              <button class="text-black md:border-2 md:bg-black md:text-white ml-4 p-2" @click="Agregar(producto)" >+</button>
                          </div>
                          <!-- <span v-if="producto.enCarrito == producto.disponibilidad" class="text-sm text-[#dc2626]">Maximo disponible</span> -->
                      </div>
                      <div class="absolute top-0 p-2 right-0 bg-[#dc2626] rounded-md">
                          <h2 class="justify-end">{{ producto.enCarrito }}</h2>
                      </div>
                      <div @click="eliminarCarrito(producto.id)" class="w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/6 flex justify-end absolute p-1 right-0 bottom-0  text-white rounded-md">
                          <img class="w-1/3 cursor-pointer" src="https://cdn-icons-png.flaticon.com/512/1345/1345823.png" alt="tachito de basura">
                      </div>
                    </div>
                <div v-if="getCantidadProductos == 0" class="flex justify-center items-end h-full w-full mt-2">
                    <h3 class="text-xl md:text-3xl">! No hay productos en el carrito !</h3>
                </div>
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="flex">
              <router-link class="w-full" :to="{name: 'productos'}" >
                <div class="flex justify-center items-center w-full mt-2">
                    <button class="w-full md:w-2/3 p-4 border-2 hover:bg-lime-300 rounded-xl text-black mb-2"> -- Seguir Comprando -- </button>
                </div>
              </router-link>
            </div>
            <div v-if="getTotal != 0">
              <p class="text-xl font-bold">Orden de Compra</p>
              <p>Su pedido llegara a su casa en aproximadamente 15 minutos. Gracias por su compra.</p>
              <div class="w-full text-md text-black flex justify-between p-2">
                <h1>Subtotal:</h1>
                <h1>$ {{ getTotal }}</h1>
              </div>
              <div class="w-full text-2xl text-black flex justify-between p-2 border-b-4">
                <h1>Total:</h1>
                <h1>$ {{ getTotal }}</h1>
              </div>
              <div class="w-full mt-4">
                <p>Nota para su Pedido:</p>
                <input class="w-full border-2 p-2 mt-2" type="text" name="observaciones" id="observaciones" placeholder="Ingrese las indicaciones" v-model="observaciones">
              </div>
              <div v-if="getCantidadProductos != 0" class="flex justify-center items-start w-full mt-2">
                <button class="w-full md:w-2/3 bg-cyan-700 p-2 mt-8 text-white mb-2" @click="Comprar(getProductos)">Comprar</button>
              </div>
            </div>
        </div>
      </div>
      <div class="w-full block" v-show="getResultadoLogin && compras != 0">
        <h1 class="text-3xl mt-4 font-bold mt-4 mb-4">Compras Realizadas !</h1>
        <div class="flex flex-wrap justify-center w-full mb-4">
          <div class="flex bg-lime-100 border-2 rounded-xl p-4 m-4" v-for="(compra ,i) of compras" :key="i">
            <div class="text-xl font-bold">Compra: </div>
            <div class="ml-2">
              <div>Descripcion: {{ compra.descripcion }}</div>
              <div>Precio: {{ compra.precio }}</div>
              <div>Cantidad: {{ compra.cantidad }}</div>
              <div>hora: {{ compra.hora }}</div>
              <div class="text-xl text-black">Total: {{ compra.precio * compra.cantidad }}</div>
            </div>
          </div>
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
      observaciones: '',
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
      ['agregarProductos', 'eliminarProducto', 'vaciarProductos' , 'sacarDelCarrito']
    ),

    getImage(img){
      return require(`@/assets/images/${img}`)
    },

    // Suma 1 producto al carrito

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

      // Resta 1 producto del carrito y si es 1 lo elimina

    DeleteCarrito(id){
      this.eliminarProducto(id)
    },

    async Comprar(productos){
      if(this.getResultadoLogin){
        for(let prod of productos){
          const compra = {
              "descripcion": prod.descripcion,
              "precio": prod.precio,
              "cantidad" : prod.enCarrito,
              "user": this.getUser.dni,
              "hora": new Date(),
              "observaciones" : this.observaciones
          }
          await servicios.updateDisponibilidad(prod)
          await servicios.registrarCompra(compra)
          await this.cargarCompras()
          this.vaciarProductos()
        }
      }
      else{
        alert('Inicie Sesion')
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

    },

    // Elimina el producto del carrito sin importar la cantidad que tenga en carrito

    eliminarCarrito(id){
      this.sacarDelCarrito(id)
    }
  }
}
</script>

<style>

</style>
