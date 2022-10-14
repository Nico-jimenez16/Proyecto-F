<template>
  <div id="registroView">
    <h1 class="lg:hidden w-full text-3xl mt-4 font-bold">{{ view }}</h1>
    <Registro :usuarios="usuarios"></Registro>
  </div>
</template>

<script>
import Registro from '@/components/pure/forms/Registro.vue'
import servicios from '@/data/servicios'
import { mapMutations } from 'vuex'

export default {
    name: 'RegistroView',
    components:{Registro},
    data() {
        return {
            view: 'Registro',
            usuarios: []
        }
    },
    async mounted(){
        this.usuarios = await servicios.obtenerUsuarios()
        this.CambiarView('Registro')
    },
    methods:{
        ...mapMutations(
                ['CambiarView']
        )
    }
}
</script>