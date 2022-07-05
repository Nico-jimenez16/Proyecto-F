<template>
    <div class="DetalleProducto">
        <h2 class="text-3xl mt-4 font-bold">{{ view }}</h2>
        <div class="flex flex-col p-8" v-for="(prod,i) of producto" :key="i">
            <div class="block lg:flex">
                <div class="w-full lg:w-1/2">
                    <img :src="prod.url" alt="">
                </div>
                <div class="w-full mt-4 lg:m-0 lg:w-1/2">
                    <h2 class="text-2xl">Detalle del Producto</h2>
                    <h2 class="flex justify-center text-black font-bold m-2">{{ prod.descripcion }}</h2>
                    <h2 class="m-2">{{ prod.detalle }}</h2>
                    <div class="flex m-2 border-b-4">
                        <div class="text-red-600 w-1/2 text-2xl">Precio:</div>
                        <div class="w-1/2 text-2xl">$ {{prod.precio}}</div>
                    </div>
                    <div v-if="prod.disponibilidad != 0" class="flex flex-col">
                        <p class="text-xl text-black font-bold">Cantidad:</p>
                        <div class="flex justify-center items-center text-black font-bold m-2" >
                            <button class="w-1/6 mr-2 border-[#2c3e50] rounded-xl border-2 p-2 hover:bg-[#2c3e50] hover:text-white" @click="Restar">-</button>
                                <input disabled class="w-1/4 p-2 border-[#2c3e50] rounded-xl border-2" min="1" type="number" v-model.number="cantidadCarrito">
                            <button class="w-1/6 ml-2 border-[#2c3e50] rounded-xl border-2 p-2 hover:bg-[#2c3e50] hover:text-white" @click="Sumar">+</button>
                        </div>
                        <span class="text-[#dc2626]" v-if="mje != ''">{{ mje }}</span>
                        <router-link :to="{name: 'productos'}">
                            <button class="w-2/3 bg-lime-600 p-4 rounded-xl text-white mt-4" @click="AgregarCarrito(prod)">Agregar a Carrito</button>
                        </router-link>
                    </div>
                    <div v-else class="flex flex-col" >
                        <span class="text-xl p-4 text-[#dc2626]">Sin Stock</span>
                    </div>
                </div>
            </div>
            <div name="actualizacion de producto" v-if="getUser.rol == 'admin' " class="bg-lime-300 m-2 mt-4 md:m-8">   
                <form class="flex flex-col text-black p-8">
                    <h2 class="text-2xl font-bold mb-4">Administrador</h2>
                    <input name="id" class="border p-2" placeholder="id" type="hidden" v-model.number="form.id">
                        
                        <label for="descripcion">Descripcion</label>
                    <input name="descripcion" class="border p-2" placeholder="descripcion" type="text" v-model.trim="form.descripcion">
                        <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="v$.form.descripcion.$error">{{ v$.form.descripcion.$errors[0].$message }}</span>

                        <label for="url">Url</label>
                    <input class="border p-2" placeholder="url" name="url" type="text" v-model.trim="form.url">
                        <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="v$.form.url.$error">{{ v$.form.url.$errors[0].$message }}</span>

                        <label for="precio">Precio</label>
                    <input name="precio" class="border p-2" placeholder="precio" type="text" v-model.number="form.precio">
                        <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="v$.form.precio.$error">{{ v$.form.precio.$errors[0].$message }}</span>
                        
                        <label for="disponibilidad">Disponibilidad</label>
                    <input name="disponibilidad" class="border p-2" placeholder="disponibilidad" type="text" v-model.number="form.disponibilidad">
                        <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="v$.form.disponibilidad.$error">{{ v$.form.disponibilidad.$errors[0].$message }}</span>
                    
                    <label for="favorito">Favorito</label>
                    <div class="flex justify-start items-center">
                            <input name="favorito" class="border p-2 mr-2" value="true" placeholder="favorito" @change="validarBooleano" type="radio" v-model="form.favorito">
                        <label class="flex mr-4" for="true">true</label>
                            <input name="favorito" class="border p-2 mr-2" value="false" placeholder="favorito" @change="validarBooleano" type="radio" v-model="form.favorito">
                        <label class="flex" for="false">false</label>
                    </div>
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="v$.form.favorito.$error">{{ v$.form.favorito.$errors[0].$message }}</span>

                        <label for="detalle">Detalle</label>
                    <input name="detalle" class="border p-2" placeholder="detalle" type="text" v-model.trim="form.detalle">
                        <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="v$.form.detalle.$error">{{ v$.form.detalle.$errors[0].$message }}</span>
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
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
    name: 'DetalleProductoView',
    data() {
        return {
            view: 'Detalle de Productos',
            cantidadCarrito: 1,
            mje: '',
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
    setup(){
        return {  v$ : useVuelidate() }
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
        AgregarCarrito(producto){
            const prod = {

                    "id": producto.id,
                    "url" : producto.url,
                    "descripcion": producto.descripcion,
                    "precio": producto.precio,
                    "disponibilidad" : producto.disponibilidad,
                    "favorito": producto.favorito,
                    "enCarrito": this.cantidadCarrito
            }
            if(this.cantidadCarrito > 0 )
                this.agregarProductos(prod)
            else
                alert('Solo numeros Positivos')
        },
        async eliminarProducto(id){
            let response = await servicios.delleteProducto(id)
            if(response)
                alert('Producto Eliminado')
                this.$router.replace( {name: 'productos'} )
        },
        async actualizarProducto(){
            this.v$.$validate()
            const fav = this.validarBooleano()
            if(!this.v$.$error){
                await servicios.updateProducto(this.form , fav)
                    this.$router.replace( {name: 'productos'} )
            }else{
                this.$router.replace( {name: 'detalle'} )
            }
                
        },
        validarBooleano(){
            if(this.form.favorito == 'true') 
                return true 
            return false
        },
        Restar(){
            if(this.cantidadCarrito > 1 ){
                this.mje = ''
                this.cantidadCarrito--
            }
            else
                this.cantidadCarrito = 1
        },
        Sumar(){
            for(let prod of this.producto)
                if(this.cantidadCarrito < prod.disponibilidad){
                    this.cantidadCarrito++
                }
                else{
                    this.mje = 'Disponibilidad Maxima'
                    this.cantidadCarrito
                }
        }
    },
    validations () {
        return {
            form: {
                url: {required},
                descripcion: {required},
                precio: {required},
                disponibilidad: {required},
                favorito: {required},
                detalle: {required}
            }
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