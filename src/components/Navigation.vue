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
            <div class="flex w-auto justify-end items-center border-2 border-[#fff] lg:border-[#666] rounded-full mr-4 px-4 cursor-pointer" @click="ModalPerfil()">
              <img class="h-10 mr-2" src="../assets/images/user.png" alt="user">
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
      <div v-if="perfil" id="model" class="absolute z-20 w-1/2 lg:w-1/6 flex flex-col justify-center items-center h-24 right-10 lg:top-14 lg:right-24 m-auto rounded-3xl bg-[#2c3e50] border-2">
            <div class="w-full flex flex-col h-14 justify-center items-start px-2">
              <router-link class="px-2" :to="{name:'perfil'}">
                <div class="flex justify-center items-center" @click="ModalPerfil()">
                  <svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 24 24" focusable="false" class="chakra-icon css-1ou03f3 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z"></path><path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z"></path>
                  </svg>
                  <h3 class="text-white text-xl">Perfil</h3>
                </div>
              </router-link>
              <div class="px-2 mt-2">
                <button @click="CerrarSesion()" class="text-white mr-2">
                  Cerrar Sesion
                </button>
              </div>
            </div>
      </div>
    </div>
</template>

<script>
import { mapGetters , mapMutations } from 'vuex'

export default {
  name: 'NavigationComponent',
  data() {
    return {
      perfil: false
    }
  },
  computed: {
    ...mapGetters(
      ['getResultadoLogin' , 'getUser' , 'GetView']
    )
  },
  methods:{

    ...mapMutations(
      ['agregarResultadoLogin']
    ),

    CerrarSesion(){
      this.getUser.usuario = ''
      this.getUser.dni = ''
      this.getUser.rol = ''
      this.agregarResultadoLogin(false)
      this.perfil = false
      this.$router.replace( {name: 'home'} )
    },
    ModalPerfil(){
      this.perfil = !this.perfil
    }
  }
}
</script>