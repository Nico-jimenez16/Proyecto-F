<template>
    <div class="NuevoProducto">
        <h2 class="text-3xl mt-4 font-bold">{{ view }}</h2>
        <div class="bg-lime-300 m-8">   
            <form class="flex flex-col text-black p-8">
                <h2 class="text-2xl font-bold mb-4">Nuevo Producto</h2>

                    <label for="descripcion">Nombre</label>
                <input name="descripcion" class="border p-2" placeholder="Ingrese el nombre del producto" type="text" v-model="form.descripcion">
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="this.v$.form.descripcion.$error">{{ this.v$.form.descripcion.$errors[0].$message }}</span>
                    
                    <label for="url">Imagen</label>
                <input class="border p-2" placeholder="Ingrese nombre de la imagen ( Recuerde que la imagen debe estar en assets/images ) Prueba: pizza-argentina.jpg" name="url" type="text" v-model="form.url">
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="this.v$.form.url.$error">{{ this.v$.form.url.$errors[0].$message }}</span>

                    <label for="precio">Precio</label>
                <input name="precio" class="border p-2" placeholder="Ingrese precio por unidad" type="number" v-model.number="form.precio">
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="this.v$.form.precio.$error">{{ this.v$.form.precio.$errors[0].$message }}</span>

                    <label for="disponibilidad">Disponibilidad</label>
                <input name="disponibilidad" class="border p-2" placeholder="Ingrese la cantidad disponible del producto" type="number" v-model.number="form.disponibilidad">
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="this.v$.form.disponibilidad.$error">{{ this.v$.form.disponibilidad.$errors[0].$message }}</span>
                
                <label for="favorito">Favorito</label>
                <input name="favorito" class="flex border p-2" value="true" placeholder="favorito" type="radio" @change="validarBooleano" v-model="form.favorito">
                    <label class="flex mb-2" for="true">true</label>
                <input name="favorito" class="flex border p-2" value="false" placeholder="favorito" type="radio" @change="validarBooleano" v-model="form.favorito">
                    <label class="flex" for="false">false</label>
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="this.v$.form.favorito.$error">{{ this.v$.form.favorito.$errors[0].$message }}</span>

                    <label for="detalle">Detalle</label>
                <input name="detalle" class="border p-2" placeholder="Ingrese el detalle del producto" type="text" v-model="form.detalle">
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="this.v$.form.detalle.$error">{{ this.v$.form.detalle.$errors[0].$message }}</span>
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
        async AgregarProducto(){
            this.v$.$validate()
            const fav = this.validarBooleano()
            if(!this.v$.$error){
                const respuesta = await servicios.agregarProducto(this.form , fav)
                if(respuesta)
                    alert('Producto Agregado')
                    this.$router.replace({name: 'productos'})
            }
        },
        validarBooleano(){
            if(this.form.favorito == 'true') 
                return true
            return false
        } 
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
</script>

<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
-webkit-appearance: none;
margin: 0;
}
</style>