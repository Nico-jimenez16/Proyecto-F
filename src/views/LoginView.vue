<template>
    <div class="Login">
        <h1 class="text-3xl mt-4 font-bold">{{ view }}</h1>
        <Login :usuarios="usuarios" ></Login>
    </div>
</template>

<script>
import Login from '@/components/Login.vue'
import servicios from '@/data/servicios'


export default {
    name: 'LoginView',
    data() {
        return {
            view: 'Login',
            usuarios: []
        }
    },
    components: {
        Login
    },
    async mounted(){
        this.usuarios = await servicios.obtenerUsuarios()
    }
}
</script>

<style>

</style>