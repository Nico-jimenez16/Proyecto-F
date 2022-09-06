<template>
    <div class="NuevoProducto">
        <h1 class="lg:hidden w-full text-3xl mt-4 font-bold">{{ view }}</h1>
        <div class="flex flex-col justify-center items-center m-8">
            <form class="w-full md:w-3/4 lg:w-2/4 flex flex-col justify-center text-black p-4 border-2 rounded-xl">
                <h2 class="text-2xl text-black mb-2">Registro de Nuevo Producto</h2> 
                <input name="descripcion" class="border p-4 rounded-full mt-4" placeholder="Ingrese el nombre del producto" type="text" v-model="form.descripcion">
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="this.v$.form.descripcion.$error">{{ this.v$.form.descripcion.$errors[0].$message }}</span>
                    
                <input class="border-2 p-4 rounded-full mt-4" placeholder="Ingrese url de la imagen" name="url" type="text" v-model="form.url">
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="this.v$.form.url.$error">{{ this.v$.form.url.$errors[0].$message }}</span>

                <input name="precio" class="border-2 p-4 rounded-full mt-4" placeholder="Ingrese precio por unidad" type="number" v-model.number="form.precio">
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="this.v$.form.precio.$error">{{ this.v$.form.precio.$errors[0].$message }}</span>

                <input name="disponibilidad" class="border-2 p-4 rounded-full mt-4" placeholder="Ingrese la cantidad disponible del producto" type="number" v-model.number="form.disponibilidad">
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="this.v$.form.disponibilidad.$error">{{ this.v$.form.disponibilidad.$errors[0].$message }}</span>
                
                <div class="flex justify-center mt-4">
                    <label for="favorito" class="flex mr-4">Producto Favorito: </label>
                        <input name="favorito" class="border-2 p-4 mr-2 rounded-full" value="true" placeholder="favorito" type="radio" @change="validarBooleano" v-model="form.favorito">
                    <label class="flex mr-4" for="true">true</label>
                        <input name="favorito" class="border-2 p-4 mr-2 rounded-full" value="false" placeholder="favorito" type="radio" @change="validarBooleano" v-model="form.favorito">
                    <label class="flex" for="false">false</label>
                </div>
                <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="this.v$.form.favorito.$error">{{ this.v$.form.favorito.$errors[0].$message }}</span>

                <input name="detalle" class="border-2 p-4 rounded-full mt-4" placeholder="Ingrese el detalle del producto" type="text" v-model="form.detalle">
                    <span class="bg-red-500 text-white text-sm md:text-md font-bold" v-if="this.v$.form.detalle.$error">{{ this.v$.form.detalle.$errors[0].$message }}</span>
                <div class="w-full flex justify-center mt-4">
                    <button class="w-full md:w-1/2 border text-white p-2 bg-cyan-700 mb-2 mr-2" @click.prevent="AgregarProducto()">Agregar Producto</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import servicios from '@/data/servicios';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { mapMutations } from 'vuex';

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
    mounted(){
        this.CambiarView('Nuevo Producto')
    },
    setup(){
        return {  v$ : useVuelidate() }
    },
    methods:{
        ...mapMutations(
            ['CambiarView']
        ),

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