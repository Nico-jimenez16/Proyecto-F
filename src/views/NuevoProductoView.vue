<template>
    <div>
        <h2 class="text-3xl mt-4 font-bold">{{ view }}</h2>
        <div class="bg-lime-300 m-8">   
            <form class="flex flex-col text-black p-8">
                <h2 class="text-2xl font-bold mb-4">Nuevo Producto</h2>
                <label for="id">Url</label>
                <input class="border p-2" type="number" name="id" placeholder="id" disabled v-model="form.id">
                    <label for="descripcion">Nombre</label>
                <input name="descripcion" class="border p-2" placeholder="Ingrese el nombre del producto" type="text" v-model="form.descripcion">
                    <label for="url">Imagen</label>
                <input class="border p-2" placeholder="Ingrese nombre de la imagen ( Recuerde que la imagen debe estar en assets/images ) Prueba: pizza-argentina.jpg" name="url" type="text" v-model="form.url">
                    <label for="precio">Precio</label>
                <input name="precio" class="border p-2" placeholder="Ingrese precio por unidad" type="text" v-model.number="form.precio">
                    <label for="disponibilidad">Disponibilidad</label>
                <input name="disponibilidad" class="border p-2" placeholder="Ingrese la cantidad disponible del producto" type="text" v-model.number="form.disponibilidad">
                    <label for="favorito">Favorito</label>
                <input name="favorito" class="flex border p-2" value="true" placeholder="favorito" type="radio" v-model="form.favorito">
                <label class="flex mb-2" for="true">true</label>
                <input name="favorito" class="flex border p-2" value="false" placeholder="favorito" type="radio" v-model="form.favorito">
                <label class="flex" for="false">false</label>
                    <label for="detalle">Detalle</label>
                <input name="detalle" class="border p-2" placeholder="Ingrese el detalle del producto" type="text" v-model="form.detalle">
            </form>
            <div class="flex justify-end">
                <button class="border text-white p-2 bg-cyan-700 mb-2 mr-2" @click="AgregarProducto()">Agregar Producto</button>
            </div>
        </div>
    </div>
</template>

<script>
import servicios from '@/data/servicios'

export default {
    name:'NuevoProducto',
    data() {
        return {
            view: 'Nuevo Producto',
            form: {
                id: 0,
                url: '',
                descripcion: '',
                precio: '',
                disponibilidad: '',
                favorito: '',
                detalle: ''
            }
        }
    },
    async created(){
        let ultimoId = await servicios.obtenerUltimoIdProductos()
        this.form.id = ultimoId + 1
    },
    methods:{
        AgregarProducto(){
            const nuevoP = {
                "id": this.form.id,
                "url" : this.form.url,
                "descripcion": this.form.descripcion,
                "precio": this.form.precio,
                "disponibilidad" : this.form.disponibilidad,
                "favorito": this.validarBooleano(),
                "detalle" : this.form.detalle
            }

            servicios.agregarProducto(nuevoP)
        },
        validarBooleano(){
            if(this.form.favorito == 'true') return true
            else return false
        }
    }
}
</script>

<style>

</style>