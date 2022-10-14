<template>
    <div id="head" class="w-full">
      <div class="flex justify-end lg:justify-start items-center w-full md:p-3 h-full">
        <div class="hidden w-1/6 lg:flex">
          <h1 class="text-2xl font-bold underline">{{ GetView }}</h1>
        </div>
        <div name="login" class="flex justify-end items-center w-full lg:w-5/6 h-full">
          <div v-if="!getResultadoLogin" class="flex justify-end items-center w-full text-white text-current font-bold">
            <div class="pr-4">
              <router-link  :to="{name:'login'}">
                Iniciar Sesion
              </router-link>
            </div>
            <div class="pr-2">
              <router-link :to="{name:'registro'}" >
                Registrarse
              </router-link>
            </div>
          </div>
          <div v-else class="flex justify-end items-center w-full">
            <div class="flex w-auto justify-end items-center border-2 border-[#fff] lg:border-[#666] rounded-full mr-4 px-4 cursor-pointer" @click="modalPerfil()">
              <img class="h-10 mr-2" src="../../assets/images/user.png" alt="user">
              <h3 class="flex text-xl">{{ getUser.usuario }}
              <span class="flex justify-center items-center pl-2 font-bold">
                <svg aria-label="Icono de comilla angular hacia abajo" class="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12">
                  <path d="M12 17.502a1 1 0 01-.707-.293l-9-9.004a1 1 0 011.414-1.414L12 15.087l8.293-8.296a1 1 0 011.414 1.414l-9 9.004a1 1 0 01-.707.293z">
                  </path>
                </svg>
              </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <!-- ? muestra el modal de perfil  -->
      <div v-if="getPerfil" id="model" class="absolute z-20 w-1/2 lg:w-1/6 flex flex-col justify-center items-center h-24 right-10 lg:top-14 lg:right-24 m-auto rounded-3xl bg-[#2c3e50] border-2">
          <PerfilComponent/>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import PerfilComponent from '../pure/Perfil.vue';

export default {
  name: 'AutenticacionComponent',
  components: { PerfilComponent },
  computed: {
    ...mapGetters(
      ['getResultadoLogin' , 'getUser' , 'GetView', 'getPerfil']
    )
  },
  methods:{

    ...mapMutations(
      ['setPerfil']
    ),

    modalPerfil(){
        this.setPerfil(!this.getPerfil)
    }
  }
}
</script>