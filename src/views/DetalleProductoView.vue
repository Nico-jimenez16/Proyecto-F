<template>
    <div>
        <h2 class="text-3xl mt-4 font-bold">{{ view }}</h2>
        <div class="flex p-8" v-for="(prod,i) of producto" :key="i">
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
            console.log(this.producto)
    },
    methods:{
        ...mapMutations(
            ['agregarProductos', 'eliminarProducto' , 'CambiarShow']
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
    }
}
</script>

<style>

</style>