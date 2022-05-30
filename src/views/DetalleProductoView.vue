<template>
    <div>
        <h2 class="text-3xl mt-4 font-bold">{{ view }}</h2>
        <div class="flex flex-col p-8" v-for="(prod,i) of producto" :key="i">
            <div class="flex">
                <div class="w-1/2">
                    <img :src="getImage(prod.url)" alt="">
                </div>
                <div class="w-1/2">
                    <h2 class="text-2xl">Detalle del Producto</h2>
                    <h2 class="flex justify-center text-black font-bold m-2">{{ prod.descripcion }}</h2>
                    <h2 class="m-2">{{ prod.detalle }}</h2>
                    <div class="flex m-2 border-b-4">
                        <div class="text-red-600 w-1/2 text-2xl">Precio:</div>
                        <div class="w-1/2 text-2xl">$ {{prod.precio}}</div>
                    </div>
                    <button class="w-2/3 bg-lime-600 p-4 rounded-xl text-white mt-4" @click="Agregar(prod)">Agregar a Carrito</button>
                </div>
            </div>
            <div v-if="getUser.rol == 'admin' " class="bg-lime-300 m-8">   
                <form class="flex flex-col text-black p-8">
                    <h2 class="text-2xl font-bold mb-4">Administrador</h2>
                    <input :value="prod.id" name="id" class="border p-2" placeholder="id" type="hidden">
                    <label for="descripcion">Descripcion</label>
                    <input :value="prod.descripcion" name="descripcion" class="border p-2" placeholder="descripcion" type="text">
                    <label for="url">Url</label>
                    <input :value="prod.url" class="border p-2" placeholder="url" name="url" type="text">
                    <label for="precio">Precio</label>
                    <input :value="prod.precio" name="precio" class="border p-2" placeholder="precio" type="text">
                    <label for="disponibilidad">Disponibilidad</label>
                    <input :value="prod.disponibilidad" name="disponibilidad" class="border p-2" placeholder="disponibilidad" type="text">
                    <label for="favorito">Favorito</label>
                    <input :value="prod.favorito" name="favorito" class="border p-2" placeholder="favorito" type="text">
                    <label for="detalle">Detalle</label>
                    <input :value="prod.detalle" name="detalle" class="border p-2" placeholder="detalle" type="text">
                </form>
                <div class="flex justify-end">
                    <button class="border text-white p-2 bg-cyan-700 mb-2 mr-2" @click="actualizarProducto()">Actualizar</button>
                    <button class="border text-white p-2 bg-red-600 mb-2 mr-2" @click="eliminarProducto(prod.id)">Eliminar</button>
                </div>
            </div>
        </div>
        <Carrito></Carrito>
    </div>
</template>

<script>
import servicios from '@/data/servicios'
import Carrito from '@/components/Carrito.vue'
import { mapGetters , mapMutations } from 'vuex'

export default {
    name: 'DetalleProductoView',
    data() {
        return {
            view: 'Detalle de Productos',
            producto: [],
            parametro: this.$route.params.id
        }
    },
    components:{Carrito},
    async mounted(){
        const productos = await servicios.obtenerProductos()
        for(let p of productos)
            if(p.id == this.parametro) this.producto.push(p)
    },
    methods:{
        ...mapMutations(
            ['agregarProductos']
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
        eliminarProducto(id){
            servicios.delleteProducto(id)
        },
        actualizarProducto(){
            servicios.updateProducto()
        }
    },
    computed:{
        ...mapGetters(
            ['getUser']
        ),
    }
}
</script>

<style>

</style>