<template>
    <div class="Producto">
        <h1 class="lg:hidden w-full text-3xl mt-4 font-bold">{{ view }}</h1>
        <div class="w-full h-80 p-8">
            <img class="w-full h-full" src="http://www.lomejorfastfood.com/assets/images/slider2-1-2000x846.jpg" alt="">
        </div>
        <Productos :productos="producto"></Productos>
    </div>
</template>

<script>
import Productos from '@/components/Productos.vue'
import servicios from '@/data/servicios'
import { mapMutations } from 'vuex'

export default {
    name: 'ProductosView',
    components:{Productos},
    data() {
        return {
            view: 'Productos',
            producto: [],
        }
    },
    mounted(){
        this.CambiarView('Productos')
    },
    async created(){
        this.producto = await servicios.obtenerProductos()
    },
    methods:{
        ...mapMutations(
                ['CambiarView']
        )
    }
}
</script>