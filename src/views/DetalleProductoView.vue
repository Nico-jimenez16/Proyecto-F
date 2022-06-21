<template>
    <div class="DetalleProducto">
        <h2 class="text-3xl mt-4 font-bold">{{ view }}</h2>
        <div class="flex flex-col p-8" v-for="(prod,i) of producto" :key="i">
            <div class="block lg:flex">
                <div class="w-full lg:w-1/2">
                    <img :src="getImage(prod.url)" alt="">
                </div>
                <div class="w-full mt-4 lg:m-0 lg:w-1/2">
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
            <div name="actualizacion de producto" v-if="getUser.rol == 'admin' " class="bg-lime-300 m-2 mt-4 md:m-8">   
                <form class="flex flex-col text-black p-8">
                    <h2 class="text-2xl font-bold mb-4">Administrador</h2>
                    <input name="id" class="border p-2" placeholder="id" type="hidden" v-model.number="form.id">
                        <label for="descripcion">Descripcion</label>
                    <input name="descripcion" class="border p-2" placeholder="descripcion" type="text" v-model.trim="form.descripcion">
                        <label for="url">Url</label>
                    <input class="border p-2" placeholder="url" name="url" type="text" v-model.trim="form.url">
                        <label for="precio">Precio</label>
                    <input name="precio" class="border p-2" placeholder="precio" type="text" v-model.number="form.precio">
                        <label for="disponibilidad">Disponibilidad</label>
                    <input name="disponibilidad" class="border p-2" placeholder="disponibilidad" type="text" v-model.number="form.disponibilidad">
                        <label for="favorito">Favorito</label>

                    <input name="favorito" class="flex border p-2" value="true" placeholder="favorito" @change="validarBooleano" type="radio" v-model="form.favorito">
                        <label class="flex mb-2" for="true">true</label>
                    <input name="favorito" class="flex border p-2" value="false" placeholder="favorito" @change="validarBooleano" type="radio" v-model="form.favorito">
                        <label class="flex" for="false">false</label>

                        <label for="detalle">Detalle</label>
                    <input name="detalle" class="border p-2" placeholder="detalle" type="text" v-model.trim="form.detalle">
                </form>
                <div class="flex justify-end">
                    <button class="border text-white p-2 bg-cyan-700 mb-2 mr-2" @click="actualizarProducto()">Actualizar</button>
                    <button class="border text-white p-2 bg-red-600 mb-2 mr-2" @click="eliminarProducto(prod.id)">Eliminar</button>
                </div>
            </div>
        </div>
        <!-- <div class="hidden modal w-56 h-56 bg-black top-0 left-0 right-0 bottom-0 m-auto absolute">Soy un modal</div> -->
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
            ruta: '',
            producto: [],
            parametro: this.$route.params.id,
            form: {
                id: this.parametro,
                url: '',
                descripcion: '',
                precio: '',
                disponibilidad: '',
                favorito: '',
                detalle: ''
            }
        }
    },
    async mounted(){
        const productos = await servicios.obtenerProductos()
        for(let p of productos)
            if(p.id == this.parametro){
                this.producto.push(p)
                this.form.id = p.id
                this.form.url = p.url
                this.form.descripcion = p.descripcion
                this.form.precio = p.precio
                this.form.disponibilidad = p.disponibilidad
                this.form.favorito = p.favorito  
                this.form.detalle = p.detalle
            }
    },
    components:{
        Carrito
    },
    computed:{
        ...mapGetters(
            ['getUser']
        ),
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
        async eliminarProducto(id){
            let response = await servicios.delleteProducto(id)
            if(response)
                alert('Producto Eliminado')
                this.$router.replace( {name: 'productos'} )
        },
        async actualizarProducto(){
            const fav = this.validarBooleano()
            await servicios.updateProducto(this.form , fav)
                this.$router.replace( {name: 'productos'} )
        },
        validarBooleano(){
            if(this.form.favorito == 'true') 
                return true 
            return false
        }
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