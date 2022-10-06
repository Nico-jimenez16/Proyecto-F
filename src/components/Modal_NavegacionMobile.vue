<template>
    <div class="h-full">
        <div id="HeaderMobile" class="w-full flex flex-row lg:hidden justify-center items-center h-full">
            <div v-if="!modalNav" @click="ModalView" class="w-1/6 h-auto ml-4">
                <svg data-v-56587bc9="" width="50" height="30" xmlns="http://www.w3.org/2000/svg">
                <path data-v-56587bc9="" d="M0 0h47.727v2.727H0zM0 13.636h47.727v2.727H0zM0   27.273h47.727V30H0z"></path>
                </svg>
            </div>
            <div v-else @click="ModalView" class="w-1/6 h-auto ml-4">
                <img class="w-8" src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png">
            </div>
            <div class="w-5/6 flex justify-end items-center h-full">
                <Navigation></Navigation>
            </div>
        </div>
        <div id="modalNavegacion" v-if="modalNav" class="model-movile bg-lime-300">
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
    </div>
</template>

<script>
import Navigation from './Navigation.vue';

export default {
    name: 'ModalNavegacionMobileComponents',
    data() {
        return {
            modalNav: false
        }
    },
    components: { Navigation },
    methods:{
        ModalView(){
        this.modalNav = !this.modalNav
        }
    }
}
</script>

<style scoped>
    .model-movile{
        width: 55%;
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 0;
        height: 88vh;
        z-index: 53;

        transition: all 1s ease-in;
    }
</style>