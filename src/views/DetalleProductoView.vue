<template>
    <div class="DetalleProducto">
        <h1 class="lg:hidden w-full text-3xl mt-4 font-bold">{{ view }}</h1>
        <div class="flex flex-col p-8" v-for="(prod,i) of producto" :key="i">
            <div class="block lg:flex">
                <div class="w-full flex justify-center items-center lg:w-1/2">
                    <img class="w-4/5" :src="prod.url">
                </div>
                <div class="w-full mt-4 lg:m-0 lg:w-1/2">
                    <h2 class="flex justify-center text-2xl text-black font-bold m-2">{{ prod.descripcion }}</h2>
                    <h2 class="m-2">{{ prod.detalle }}</h2>
                    <div class="flex m-2 border-b-4">
                        <div class="text-red-600 w-1/2 text-2xl">Precio:</div>
                        <div class="w-1/2 text-2xl">$ {{prod.precio}}</div>
                    </div>
                    <div v-if="prod.disponibilidad != 0" class="flex flex-col">
                        <p class="text-xl text-black font-bold">Cantidad:</p>
                        <div class="flex justify-center items-center text-black font-bold m-2" >
                            <button class="w-1/6 mr-2 border-[#2c3e50] rounded-xl border-2 p-2 hover:bg-[#2c3e50] hover:text-white" @click="restar">-</button>
                                <input disabled class="w-1/4 p-2 border-[#2c3e50] rounded-xl border-2" min="1" type="number" v-model.number="cantidadCarrito">
                            <button class="w-1/6 ml-2 border-[#2c3e50] rounded-xl border-2 p-2 hover:bg-[#2c3e50] hover:text-white" @click="sumar">+</button>
                        </div>
                        <span class="text-[#dc2626]" v-if="mje != ''">{{ mje }}</span>
                        <router-link :to="{name: 'productos'}">
                            <button class="w-full lg:w-2/3 bg-lime-500 p-4 rounded-xl text-white mt-4" @click="agregarProductoACarrito(prod)">Agregar a Carrito</button>
                        </router-link>
                    </div>
                    <div v-else class="flex flex-col" >
                        <span class="text-xl p-4 text-[#dc2626]">Sin Stock</span>
                    </div>
                </div>
            </div>
            <div name="actualizacion de producto" v-if="getUser.rol == 'admin' " class="flex justify-center items-center m-2 mt-4 md:m-8">   
                <form class="w-full md:w-3/4 lg:w-2/4 flex flex-col text-black p-4 border-2 rounded-xl">
                    <h2 class="text-2xl font-bold mb-4">Administrador</h2>
                    <input name="id" class="border p-2" placeholder="id" type="hidden" v-model.number="form.id">
                        
                        <label for="descripcion" class="flex mb-2">Descripcion: </label>
                    <input name="descripcion" class="w-full border-2 rounded-full p-4 mb-4" placeholder="descripcion" type="text" v-model.trim="form.descripcion">
                        <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="v$.form.descripcion.$error">{{ v$.form.descripcion.$errors[0].$message }}</span>

                        <label for="url" class="flex mb-2">Url: </label>
                    <input class="w-full border-2 rounded-full p-4 mb-4" placeholder="url" name="url" type="text" v-model.trim="form.url">
                        <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="v$.form.url.$error">{{ v$.form.url.$errors[0].$message }}</span>

                        <label for="precio" class="flex mb-2">Precio: </label>
                    <input name="precio" class="w-full border-2 rounded-full p-4 mb-4" placeholder="precio" type="text" v-model.number="form.precio">
                        <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="v$.form.precio.$error">{{ v$.form.precio.$errors[0].$message }}</span>
                        
                        <label for="disponibilidad" class="flex mb-2">Disponibilidad: </label>
                    <input name="disponibilidad" class="w-full border-2 rounded-full p-4 mb-4" placeholder="disponibilidad" type="text" v-model.number="form.disponibilidad">
                        <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="v$.form.disponibilidad.$error">{{ v$.form.disponibilidad.$errors[0].$message }}</span>
                    
                    <label for="favorito" class="flex mb-2">Favorito: </label>
                    <div class="flex justify-start items-center mb-4">
                            <input name="favorito" class="border-2 rounded-full p-4" value="true" placeholder="favorito" @change="validarBooleano" type="radio" v-model="form.favorito">
                        <label class="flex ml-4" for="true">true</label>
                            <input name="favorito" class="border-2 rounded-full p-4 ml-4" value="false" placeholder="favorito" @change="validarBooleano" type="radio" v-model="form.favorito">
                        <label class="flex ml-4" for="false">false</label>
                    </div>
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="v$.form.favorito.$error">{{ v$.form.favorito.$errors[0].$message }}</span>

                        <label for="detalle" class="flex mb-2">Detalle: </label>
                    <input name="detalle" class="w-full border-2 rounded-full p-4 mb-4" placeholder="detalle" type="text" v-model.trim="form.detalle">
                        <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="v$.form.detalle.$error">{{ v$.form.detalle.$errors[0].$message }}</span>
                    <div class="flex justify-end items-center mt-4">
                        <button class="border text-white p-2 bg-cyan-700 mb-2 mr-2" @click.prevent="operacionUD('actualizar')">Actualizar</button>
                        <button class="border text-white p-2 bg-red-600 mb-2" @click.prevent="operacionUD('eliminar')">Eliminar</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="seguridad.modal" id="modal" class="fixed w-5/6 lg:w-1/3 xl:w-1/4 flex flex-col justify-center items-center h-24 top-0 right-0 bottom-0 m-auto rounded-3xl bg-[#2c3e50]">
            <h1 class="flex text-white text-sm md:text-md">Estas seguro de Eliminar / Actualizar ?</h1>
            <div class="w-full flex justify-center text-white">
                <div class="w-1/3 px-2 md:px-4 border-2 text-md lg:text-xl rounded-full mt-2 cursor-pointer" @click="respuestaConfirmacion(false)">Rechazar</div>
                <div class="w-1/3 px-2 md:px-4 border-2 text-md lg:text-xl rounded-full mt-2 ml-2 cursor-pointer" @click="respuestaConfirmacion(true)">Aceptar</div>
            </div>
        </div>
    </div>
</template>

<script>
import servicios from '@/data/servicios'
import { mapGetters , mapMutations } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ref } from 'vue-demi'

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
            },
            seguridad: {
                modal: false,
                tipo: ''
            }
        }
    },
    setup(){
        const confirmacion = ref(false)
        return {  v$ : useVuelidate() , confirmacion}
    },
    async mounted(){
        this.CambiarView('Detalle Producto')
        const productos = await servicios.obtenerProductos()
        for(let p of productos){
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
        }
    },
    computed:{
        ...mapGetters(
            ['getUser']
        ),
        validarBooleano(){
            if(this.form.favorito == 'true'){
                return true 
            }else{
                return false
            }
        },
    },
    methods:{
        ...mapMutations(
            ['agregarProductos' , 'CambiarView']
        ),
        agregarProductoACarrito(producto){
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

        // Validar si confirma las operaciones de borrar o eliminar

        operacionUD(tipo){
            this.seguridad.modal = true
            this.seguridad.tipo = tipo
        },
        respuestaConfirmacion(valor){
            this.confirmacion = valor
            this.seguridad.modal = false
            if(this.seguridad.tipo === 'eliminar'){
                this.seguridad.tipo = ''
                this.eliminarProducto()
            }
            if(this.seguridad.tipo === 'actualizar'){
                this.seguridad.tipo = ''
                this.actualizarProducto()
            }

        },

        // Eliminar Producto

        async eliminarProducto(){
            if(this.confirmacion){
                let response = await servicios.delleteProducto(this.parametro)
                if(response)
                    alert('Producto Eliminado')
                    this.$router.replace( {name: 'productos'} )
            } else{
                alert('rechazado')
            }
        },

        // Actualizar Producto

        async actualizarProducto(){
            this.v$.$validate()
            const fav = this.validarBooleano
            if(!this.v$.$error && this.confirmacion){
                    await servicios.updateProducto(this.form , fav)
                    alert('Producto Actualizado')
                    this.$router.replace( {name: 'productos'} )
            }else{
                alert('Rechazado')
            }     
        },
        restar(){
            if(this.cantidadCarrito > 1 ){
                this.mje = ''
                this.cantidadCarrito--
            }
            else
                this.cantidadCarrito = 1
        },
        sumar(){
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
