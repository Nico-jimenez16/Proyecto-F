<template>
    <div id="productoView">
        <h1 class="lg:hidden w-full text-3xl mt-4 font-bold">{{ view }}</h1>
        <!-- ? Search  -->
        <div class="w-full h-5/6 flex justify-center items-end my-4">
          <input class="w-3/4 border-2 border-lime-600 rounded-xl p-4" placeholder="Buscar productos" type="text" v-model="search">
        </div>
        <!-- ? component Producto -->
        <Productos 
            :productos="filterProducts.value"
        />
        <!-- ? component bottom carrito  -->
        <BottomCarritoMobile/>
    </div>
</template>

<script>
import Productos from '@/components/container/Productos.vue';
import  BottomCarritoMobile from '../components/pure/BottomCarritoMobile.vue';
import servicios from '@/data/servicios';
import { computed, ref } from 'vue-demi';
import { mapMutations } from 'vuex';

export default {
    name: 'ProductosView',
    components:{ Productos , BottomCarritoMobile },
    setup(){
        const view = ref('Productos');
        const products = ref(null);    

        // PRODUCTOS CON FILTRO APLICADO SEGUN EL SEARCH
        const search = ref('')
        const filterProducts = ref(null)
        filterProducts.value = computed (() => {
            return products.value?.filter((prod) => {
                return prod.descripcion.toLowerCase().includes(search.value.toLowerCase())
            });
        });


        return {
            view,
            products,
            search,
            filterProducts
        }
    },
    async mounted(){
        this.CambiarView('Productos')
        this.setLoader(true)
        this.products = await servicios.obtenerProductos()
        this.setLoader(false)
    },
    methods:{
        ...mapMutations(
                ['CambiarView' , 'setLoader']
        )
    }
}
</script>