<template>
  <div class="carrito">
      <h1 class="lg:hidden w-full text-3xl mt-4 font-bold">{{ view }}</h1>
      <div class="flex w-full">
        <router-link class="w-full" :to="{name: 'productos'}" >
          <div class="flex justify-center items-center w-full mt-2">
              <button class="w-full w-3/4 md:w-2/4 p-4 border-2 hover:bg-lime-300 rounded-xl text-black mb-2"> -- Seguir Comprando -- </button>
          </div>
        </router-link>
      </div>
      <div v-if="getCantidadProductos == 0" class="flex justify-center items-end h-full w-full mt-2">
        <h3 class="text-xl md:text-3xl"> No hay productos en el carrito !</h3>
      </div>
      <div class="block md:flex text-black p-4 md:p-4">
        <div class="w-full md:w-1/2 bg-state-300 movies mt-2">
            <div class="flex w-full flex-col justify-center items-center md:p-2 lg:p-0">
              <h2 v-if="getCantidadProductos != 0" class="text-xl font-bold mb-4">Productos Seleccionados !</h2>
              <div v-for="(producto, index) of getProductos" :key="index" class="flex mb-2 relative shadow-lg w-full md:w-5/6 lg:w-3/4 xl:w-3/4 bg-transparent text-black font-bold border-2 rounded-xl p-4">
                <div class="w-1/2 h-32">
                  <img :src="producto.url" class="h-full m-auto" :alt="producto.descripcion">
                </div>
                <div class="flex flex-col w-1/2 h-auto">
                    <span v-if="producto.enCarrito == producto.disponibilidad" class="text-sm text-[#dc2626]">Maximo disponible</span>
                    <div class="mt-2">
                        <p class="w-full">{{ producto.descripcion }}</p>
                        <p class="w-full">$ {{ producto.precio }}</p>
                    </div>
                    <div class="mt-2">
                        <button class="w-10 text-black md:bg-black md:text-white ml-4 p-2 carrito-button" @click="DeleteCarrito(producto.id)" >-</button>
                        <button class="w-10 text-black md:bg-black md:text-white ml-4 p-2 carrito-button" @click="Agregar(producto)" >+</button>
                    </div>
                </div>
                <div class="absolute top-0 p-2 right-0 bg-[#dc2626] rounded-full text-white">
                    <h2 class="justify-end">{{ producto.enCarrito }}</h2>
                </div>
                <div @click="eliminarCarrito(producto.id)" class="w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/6 flex justify-end absolute p-1 right-0 bottom-0  text-white rounded-md">
                    <img class="w-1/3 cursor-pointer" src="https://cdn-icons-png.flaticon.com/512/1345/1345823.png" alt="tachito de basura">
                </div>
              </div>
            </div>
          </div>
        <div class="w-full md:w-1/2 mt-4 md:mt-0">
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
                <input class="w-full border-2 rounded-full p-4 mt-2" type="text" name="observaciones" id="observaciones" placeholder="Ingrese las indicaciones" v-model="observaciones">
              </div>
              <div v-if="getCantidadProductos != 0" class="flex justify-center items-start w-full mt-2">
                <button class="w-full md:w-2/3 bg-cyan-700 p-2 mt-8 text-white mb-2" @click="Comprar(getProductos)">Comprar</button>
              </div>
            </div>
        </div>
      </div>
      <div class="hidden w-full block" v-show="getResultadoLogin">
        <h1 class="text-3xl mt-4 font-bold mb-4">Compras Realizadas !</h1>
        <button v-if="!historial" @click="historial = !historial" class="w-3/4 p-4 text-md md:text-xl bg-lime-600 rounded-xl mb-4 text-white">Click para ver Historial</button>
        <button v-else @click="historial = !historial" class="w-3/4 p-4 text-md md:text-xl bg-lime-600 rounded-xl mb-4 text-white">Click para Ocultar Historial</button>
        <div v-if="historial && compras != 0" class="flex flex-wrap justify-center w-full mb-4">
          <div class="flex bg-lime-100 border-2 rounded-xl p-4 m-4" v-for="(compra ,i) of compras" :key="i">
            <h3 class="text-xl font-bold">Compra: </h3>
            <div class="ml-2">
              <div class="text-xl text-black">{{ compra.descripcion }}</div>
              <div>Precio: ${{ compra.precio }}</div>
              <div>Cantidad: {{ compra.cantidad }}</div>
              <div>Fecha: {{ compra.hora }}</div>
              <div class="text-xl text-black">Total: ${{ compra.precio * compra.cantidad }}</div>
            </div>
          </div>
        </div>
        <h2 class="text-md md:text-3xl font-bold mt-4 mb-4 p-12" v-if="historial && compras == 0">Aun no tiene compras, Realiza tu primera compra!</h2>
      </div>
  </div>
</template>

<script>
import { mapGetters , mapMutations } from 'vuex'
import servicios from '@/data/servicios'
let moment = require('moment')

export default {
  name: 'CarritoView',
  data() {
    return {
      view: 'Carrito',
      observaciones: '',
      historial: false,
      compras: [],
      moment: moment
    }
  },
  computed: {

    ...mapGetters(
      ['getProductos','getCantidadProductos','getTotal','getUser','getResultadoLogin']
    ),
  },
  async mounted(){
      await this.cargarCompras()
      this.CambiarView('Carrito')

  },
  methods:{

    ...mapMutations(
      ['agregarProductos', 'eliminarProducto', 'vaciarProductos' , 'sacarDelCarrito' , 'CambiarView']
    ),

    getHoraActual(){
      const hora = moment().subtract(10, 'days').calendar();
      return hora
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
              "hora": this.getHoraActual(),
              "observaciones" : this.observaciones
          }
          await servicios.registrarCompra(compra)
          await servicios.updateDisponibilidad(prod)
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

<style scoped>
.carrito-button{
  clip-path: circle(50%);
}
</style>
