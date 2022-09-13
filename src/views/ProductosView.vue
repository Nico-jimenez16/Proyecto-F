<template>
    <div class="Producto mt-2">
        <h1 class="lg:hidden w-full text-3xl mt-4 font-bold">{{ view }}</h1>
        <div class="w-full h-5/6 flex justify-center items-end my-4">
            <div class="flex justify-center w-full">
              <input v-on:keyup="filterProduct()" class="w-3/4 border-2 border-lime-600 rounded-xl p-4" placeholder="Buscar productos" type="text" v-model="search">
            </div>
        </div>
        <Productos :productos="filterProduct"></Productos>
    </div>
</template>

<script>
import Productos from '@/components/Productos.vue'
import servicios from '@/data/servicios'
import { mapMutations } from 'vuex'
import { ref } from 'vue-demi'

export default {
    name: 'ProductosView',
    components:{Productos},
    data() {
        return {
            view: 'Productos',
            productos: []
        }
    },
    setup(){
        const search = ref('')

        return {search}
    },
    mounted(){
        this.CambiarView('Productos')
    },
    async created(){
        this.productos = await servicios.obtenerProductos()
    },
    methods:{
        ...mapMutations(
                ['CambiarView']
        )
    },
    computed:{
        filterProduct(){
            return this.productos.filter((prod) => { 
                return prod.descripcion.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    }
}
</script>