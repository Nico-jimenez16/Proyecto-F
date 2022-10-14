<template>
        <div class="relative shadow-2xl hover:-translate-y-1 hover:scale-110 hover:bg-transparent duration-300 p-4 m-4 w-1/3 md:w-2/5 lg:w-1/6 xl:w-1/6 bg-transparent text-black border-2 rounded-xl product">
            <router-link :to="{name: 'detalle' , params: {id: producto.id} }">
                <div class="h-32 md:h-40 lg:h-40 m-auto w-fit">
                    <img :src="producto.url" class="w-full h-full rounded-xl m-auto imgProduct" :alt="producto.descripcion">
                </div>
            </router-link>
            <div class="flex flex-col w-full">
                <div class="mt-2">
                    <h1 class="w-full font-bold">{{ producto.descripcion }}</h1>
                    <h2 class="w-full">Precio $ {{ producto.precio }}</h2>
                </div>
            </div>
                <img v-if="producto.favorito" src="https://cdn-icons-png.flaticon.com/512/3699/3699516.png" class="flex absolute -top-3 -right-3 w-1/5 lg:w-1/5">
            <div class="flex flex-col mt-2">
                <button v-if="producto.disponibilidad != 0" class="bg-lime-500 p-1 md:p-3 rounded-xl text-white mb-2 AddCarrito" @click="add(producto)">Agregar a carrito</button>
                
                <router-link :to="{name: 'detalle' , params: {id: producto.id} }">
                    <button v-if="getUser.rol == 'admin' " class="w-full bg-cyan-700 p-1 lg:p-4 rounded-xl text-white">Administrador</button>             
                </router-link>

                <p v-if="producto.disponibilidad == 0" class="p-4 rounded-xl text-xl text-[#dc2626]">Sin Stock</p>
                <p v-if="producto.enCarrito != 0" class="bg-red-600 w-1/6 rounded-xl text-white">{{producto.enCarrito}}</p>
            </div>
        </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ProductoComponent',
    props: {
        producto: {
            type: Object,
            required: true
        },
        add: {
            type: Function,
            require: true
        }
    },
    computed: {

        ...mapGetters(
        ['getUser']
        )

    },
}
</script>

<style scoped>
  
  .imgProduct{
    min-width: 227px !important;
  }
  .product{
    min-width: 17rem;
  }

</style>