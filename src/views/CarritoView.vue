<template>
  <div id="carritoView">
      <h1 class="lg:hidden w-full text-3xl mt-4 font-bold">{{ view }}</h1>
      <div class="flex flex-col w-full">
        <router-link class="flex justify-center items-center w-full mt-2" :to="{name: 'productos'}" >
              <button class="w-full w-3/4 md:w-2/4 p-4 border-2 hover:bg-lime-300 rounded-xl text-black mb-2"> -- Seguir Comprando -- </button>
        </router-link>
        <div v-if="getCantidadProductos == 0" class="flex justify-center items-end h-full w-full mt-2">
          <h3 class="text-xl md:text-3xl"> No hay productos en el carrito !</h3>
        </div>
      </div>
      <div name="carrito" class="block md:flex text-black p-4 md:p-4">
        <div name="Productos" class="w-full md:w-1/2 bg-state-300 movies mt-2">
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
                        <button class="w-10 text-black md:bg-black md:text-white ml-4 p-2 carrito-button" @click="RestarCantProducto(producto.id)" >-</button>
                        <button class="w-10 text-black md:bg-black md:text-white ml-4 p-2 carrito-button" @click="SumarCantProducto(producto)" >+</button>
                    </div>
                </div>
                <div class="absolute top-0 p-2 right-0 bg-[#dc2626] rounded-full text-white">
                    <h2 class="justify-end">{{ producto.enCarrito }}</h2>
                </div>
                <div @click="eliminarProdCarrito(producto.id)" class="w-1/4 md:w-1/5 lg:w-1/6 xl:w-1/6 flex justify-end absolute p-1 right-0 bottom-0  text-white rounded-md">
                    <img class="w-1/3 cursor-pointer" src="https://cdn-icons-png.flaticon.com/512/1345/1345823.png" alt="tachito de basura">
                </div>
              </div>
            </div>
          </div>
        <div name="Detalle de la compra" class="w-full md:w-1/2 mt-4 md:mt-0">
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
                <button class="w-full md:w-2/3 bg-cyan-700 p-2 mt-8 text-white mb-2" @click="RegistrarComprar(getProductos)">Comprar</button>
              </div>
            </div>
        </div>
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
      moment: moment
    }
  },
  computed: {

    ...mapGetters(
      ['getProductos','getCantidadProductos','getTotal','getUser','getResultadoLogin']
    ),
  },
  async mounted(){
      this.CambiarView('Carrito')

  },
  methods: {

    ...mapMutations(
      ['agregarProductos', 'eliminarProducto', 'vaciarProductos' , 'sacarDelCarrito' , 'CambiarView']
    ),

    // Obtiene la fecha y hora actual 

    getHoraActual(){
      const hora = moment().format('LLL');
      return hora
    },

    // Suma 1 producto existente al carrito

    SumarCantProducto(producto){
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

    // Resta 1 producto existente del carrito y si es 1 lo elimina

      RestarCantProducto(id){
      this.eliminarProducto(id)
    },

    // Elimina el producto del carrito sin importar la cantidad que tenga en carrito

    eliminarProdCarrito(id){
      this.sacarDelCarrito(id)
    },

    // Registra la compra de los productos en carrito 

    async RegistrarComprar(productos){
      const compra = []
      const datosCompra = {
        "user": this.getUser.dni,
        "hora": this.getHoraActual(),
        "observaciones" : this.observaciones
      }
      productos.map((prod) => {
        const producto = {
            "id": prod.id,
            "favorito": prod.favorito,
            "descripcion": prod.descripcion,
            "cantidad": prod.enCarrito,
            "precio": prod.precio,
          }
          compra.push({ ...producto , ...datosCompra})
      });
      
      // Registro en DB de la compra 
      if(this.getResultadoLogin){
          await servicios.registrarCompra(compra)
          await servicios.updateDisponibilidad(compra)
          this.vaciarProductos()
      }
      else {
        alert('Inicie Sesion')
      }
    }
  }
}
</script>

<style scoped>
.carrito-button{
  clip-path: circle(50%);
}
</style>
