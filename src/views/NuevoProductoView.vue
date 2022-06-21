<template>
    <div class="NuevoProducto">
        <h2 class="text-3xl mt-4 font-bold">{{ view }}</h2>
        <div class="bg-lime-300 m-8">   
            <form class="flex flex-col text-black p-8">
                <h2 class="text-2xl font-bold mb-4">Nuevo Producto</h2>

                    <label for="descripcion">Nombre</label>
                <input name="descripcion" class="border p-2" placeholder="Ingrese el nombre del producto" type="text" v-model="form.descripcion">
                    <span class="w-full h-12 text-xl text-red-500" v-if="this.v$.$error">{{ this.v$.$error }}</span>
                    
                    <label for="url">Imagen</label>
                <input class="border p-2" placeholder="Ingrese nombre de la imagen ( Recuerde que la imagen debe estar en assets/images ) Prueba: pizza-argentina.jpg" name="url" type="text" v-model="form.url">
                    <span class="text-red-500" v-if="this.v$.$error">{{ this.v$.$error }}</span>

                    <label for="precio">Precio</label>
                <input name="precio" class="border p-2" placeholder="Ingrese precio por unidad" type="number" v-model.number="form.precio">
                    <span class="text-red-500" v-if="this.v$.$error">{{ this.v$.$error }}</span>

                    <label for="disponibilidad">Disponibilidad</label>
                <input name="disponibilidad" class="border p-2" placeholder="Ingrese la cantidad disponible del producto" type="number" v-model.number="form.disponibilidad">
                    <span class="text-red-500" v-if="this.v$.$error">{{ this.v$.$error }}</span>
                
                <label for="favorito">Favorito</label>
                <input name="favorito" class="flex border p-2" value="true" placeholder="favorito" type="radio" @change="validarBooleano" v-model="form.favorito">
                    <label class="flex mb-2" for="true">true</label>
                <input name="favorito" class="flex border p-2" value="false" placeholder="favorito" type="radio" @change="validarBooleano" v-model="form.favorito">
                    <label class="flex" for="false">false</label>
                    <span class="text-red-500" v-if="this.v$.$error">{{ this.v$.$error }}</span>

                    <label for="detalle">Detalle</label>
                <input name="detalle" class="border p-2" placeholder="Ingrese el detalle del producto" type="text" v-model="form.detalle">
                    <span class="text-red-500" v-if="this.v$.$error">{{ this.v$.$error }}</span>
            </form>
            <div class="flex justify-end">
                <button class="border text-white p-2 bg-cyan-700 mb-2 mr-2" @click="AgregarProducto()">Agregar Producto</button>
            </div>
        </div>
    </div>
</template>

<script>
import servicios from '@/data/servicios';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
    name:'NuevoProducto',
    data() {
        return {
            view: 'NuevoProducto',
            form: {
                url: '',
                descripcion: '',
                precio: '' ,
                disponibilidad: '',
                favorito: '',
                detalle: ''
            }
        }
    },
    setup(){
        return {  v$ : useVuelidate() }
    },
    methods:{
        AgregarProducto(){
            this.v$.$validate()
            console.log(this.v$)
            // const fav = this.validarBooleano()
            // if(!this.v$.$error){
            //     await servicios.agregarProducto(this.form , fav)
            //     alert('Producto Agregado')
            //     this.$router.replace({name: 'productos'})
            // }else{
            //     alert('No se pudo agregar Producto')
            // }
        },
        validarBooleano(){
            if(this.form.favorito == 'true') 
                return true
            return false
        },
        validations () {
            return {
                form: {
                    url: { required },
                    descripcion: { required },
                    precio: { required } ,
                    disponibilidad: { required },
                    favorito: { required },
                    detalle: { required }
                }
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