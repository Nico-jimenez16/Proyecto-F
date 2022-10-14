<template>
    <div class="w-full flex flex-col h-14 justify-center items-start px-2">
        <router-link class="px-2" :to="{name:'perfil'}">
            <div class="flex justify-center items-center" @click="modalPerfil()">
                <svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 24 24" focusable="false" class="chakra-icon css-1ou03f3 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z"></path><path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z"></path>
                </svg>
                <h3 class="text-white text-xl">Perfil</h3>
            </div>
        </router-link>
        <div class="px-2 mt-2">
            <button @click="cerrarSesion()" class="text-white mr-2">
                Cerrar Sesion
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name:'PerfilComponent',
    computed: {
    ...mapGetters(
      ['getUser', 'getPerfil']
    )
    },
    methods:{

        ...mapMutations(
        ['agregarResultadoLogin' , 'setPerfil']
        ),

        cerrarSesion(){
            this.getUser.usuario = ''
            this.getUser.dni = ''
            this.getUser.rol = ''
            this.agregarResultadoLogin(false)
            this.setPerfil(false)
            // TODO - revisar porque me sale un arror 
            // this.$router.replace( {name: 'home'} )
        },

        modalPerfil(){
            this.setPerfil(!this.getPerfil)
        }
    }
}
</script>
