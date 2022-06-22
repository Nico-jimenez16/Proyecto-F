<template>
    <div class="Producto">
        <h1 class="text-3xl mt-4 font-bold">{{ view }}</h1>
        <!-- <div class="w-full flex justify-center items-center text-white" v-for="(cat, i) of categorias" :key="i">
            <div class="w-1/4 p-2 border-2 m-2 bg-[#dc2626]">
                {{ cat }}
            </div>
        </div> -->
        <Productos :productos="producto"></Productos>
        <Carrito></Carrito>
    </div>
</template>

<script>
import Productos from '@/components/Productos.vue'
import Carrito from '@/components/Carrito.vue'
import servicios from '@/data/servicios'

export default {
    name: 'ProductosView',
    components:{Productos,Carrito},
    data() {
        return {
            view: 'Productos',
            producto: [],
            categorias: ['hamburguesas', 'lomitos' , 'pizzas']
        }
    },
    async created(){
        this.producto = await servicios.obtenerProductos()
    }
}
</script>

<style>

</style>