<template>
    <div id="loginView">
        <h1 class="lg:hidden w-full text-3xl mt-4 font-bold">{{ view }}</h1>
        <Login :usuarios="usuarios" ></Login>
    </div>
</template>

<script>
import Login from '@/components/pure/forms/Login.vue'
import servicios from '@/data/servicios'
import { mapMutations } from 'vuex'


export default {
    name: 'LoginView',
    components: { Login },
    data() {
        return {
            view: 'Login',
            usuarios: []
        }
    },
    async mounted(){
        this.usuarios = await servicios.obtenerUsuarios()
        this.CambiarView('Login')
    },
    methods:{
    ...mapMutations(
            ['CambiarView']
    ),
  }
}
</script>