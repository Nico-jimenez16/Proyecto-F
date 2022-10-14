<template>
    <div v-if="getCantidadProductos != 0" class="w-full flex md:hidden justify-center items-center">
        <router-link :to="{ name: 'carrito'}" class="fixed w-4/5 p-1 flex justify-center items-center border rounded-xl bottom-0 bg-red-500 mb-2" >
            <h1 class="text-md text-white mr-4">Ir a Carrito</h1>
            <h2 class="text-md text-white">{{ getCantidadProductos }}</h2>
        </router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'BottomCarritoComponent',

    computed: {
        ...mapGetters(
            ['getCantidadProductos']
        )
    },
}
</script>