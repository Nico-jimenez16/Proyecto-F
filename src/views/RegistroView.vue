<template>
  <div class="registro">
    <h1 class="lg:hidden w-full text-3xl mt-4 font-bold">{{ view }}</h1>
    <Registro :usuarios="usuarios"></Registro>
  </div>
</template>

<script>
import Registro from '@/components/Registro.vue'
import servicios from '@/data/servicios'
import { mapMutations } from 'vuex'

export default {
    name: 'RegistroView',
    data() {
        return {
            view: 'Registro',
            usuarios: []
        }
    },
    components:{Registro},
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