<template>
    <div class="Producto mt-2">
        <h1 class="lg:hidden w-full text-3xl mt-4 font-bold">{{ view }}</h1>
        <div class="w-full h-5/6 flex justify-center items-end my-4">
          <input class="w-3/4 border-2 border-lime-600 rounded-xl p-4" placeholder="Buscar productos" type="text" v-model="search">
        </div>
        <Productos :productos="filterProducts.value"></Productos>
    </div>
</template>

<script>
import Productos from '@/components/Productos.vue'
import servicios from '@/data/servicios'
import { computed, onMounted, ref } from 'vue-demi'
import { mapMutations } from 'vuex'

export default {
    name: 'ProductosView',
    components:{ Productos },
    setup(){
        const view = ref('Productos')

        // CARGAR LOS PRODUCTOS CUANDO SE MONTA LA VISTA
        const productos = ref([])
        onMounted(async() => {
            productos.value = await servicios.obtenerProductos()
        })
        

        // PRODUCTOS CON FILTRO APLICADO SEGUN EL SEARCH
        const search = ref('')
        const filterProducts = ref([])
        filterProducts.value = computed (() => {
            return productos.value.filter((prod) => {
                return prod.descripcion.toLowerCase().includes(search.value.toLowerCase())
            });
        })

        return {
            view,
            productos,
            search,
            filterProducts
        }
    },
    mounted(){
        this.CambiarView('Productos')
    },
    methods:{
        ...mapMutations(
                ['CambiarView']
        )
    }
}
</script>