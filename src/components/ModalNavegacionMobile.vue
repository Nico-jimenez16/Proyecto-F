<template>
    <div>
        <div class="w-full flex justify-center items-center">
            <h1 class="text-3xl font-bold">NJ</h1>
        </div>
        <div class="mt-4">
            <router-link :to="{name: 'home'}">
            <div @click="ModalView" class="flex w-full justify-center items-center p-4 border-[#2c3e50] border-t-2">
                <h3 class="text-xl pl-2">Home</h3>
            </div>
            </router-link>
            <router-link :to="{name: 'productos'}" >
            <div @click="ModalView" class="flex w-full justify-center items-center  p-4 border-[#2c3e50] border-y-2">
                <h3 class="text-xl pl-2">Producto</h3>
            </div>
            </router-link>
            <router-link :to="{name: 'carrito'}">
            <div @click="ModalView" class="flex w-full justify-center items-center  p-4 border-[#2c3e50] border-b-2">
                <h3 class="text-xl pl-2">Carrito</h3>
            </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalNavegacionMobileComponents'
}
</script>