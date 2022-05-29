<template>
    <div>
        <h1 class="text-3xl mt-4 font-bold">{{ view }}</h1>
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
            producto: []
        }
    },
    async mounted(){
        this.producto = await servicios.obtenerProductos()
    }
}
</script>

<style>

</style>