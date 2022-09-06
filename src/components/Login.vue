<template>
    <div class="login">
        <div class="flex justify-center items-center w-full p-6 md:mb-12">
            <form class="w-full md:w-3/4 lg:w-2/4 px-2 py-4 border-2 rounded-xl">
                <h2 class="text-2xl text-black mb-2">Login de Usuario</h2>
                <div class="flex justify-center w-full mb-4">
                    <input class="w-3/4 border-2 rounded-full p-4" type="text" placeholder="Ingrese usuario" v-model.trim="usuario.usuario">
                </div>
                <div class="flex justify-center w-full mb-4">
                    <input class="w-3/4 border-2 rounded-full p-4" type="password" placeholder="Ingrese password" v-model.trim="usuario.password">
                </div>
                <button class="w-3/4 p-2 text-white bg-[#dc2626] border-2 m-auto rounded-md" @click="ValidarLogin()">Ingresar</button>
                <router-link :to="{name: 'registro'}">
                    <div class="flex justify-center mt-4">
                         Crear una cuenta
                    </div>
                </router-link>
                <div class="flex justify-end mt-4 mr-4">
                    ¿ Olvidaste tu contraseña ?
                </div>
            </form>
        </div>
        <!-- <div class="w-2/5 border-4 bg-lime-200 absolute top-0 right-0 left-0 m-auto h-22 p-2 text-black">
            <div class="h-12 flex px-2">
                <h1 class="text-xl">Bienvenido: <span class="font-bold text-[#2c3e50]">{{ getUser.usuario }}</span></h1>
            </div>
            <div class="w-5/6 flex justify-end items-center text-white">
                <button @click="modal" class="py-2 px-4 border-2 rounded-md bg-[#2c3e50]">Aceptar</button>
            </div>
        </div> -->
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'


export default {
    name: 'LoginComponent',
    data() {
        return {
            usuario:
            [
                {
                    usuario: '',
                    password: ''
                }
            ],
            viewModal: false
        }
    },
    props:{
        usuarios:{
            type: Array,
            required: true
        }
    },
    computed: {
        ...mapGetters(
            ['getUser' , 'getResultadoLogin']
        )
    },
    methods:{

        ...mapMutations(
                ['agregarUser', 'agregarResultadoLogin']
        ),
        ValidarLogin(){
            let resultado = this.usuarios.find((user) =>
                this.usuario.usuario == user.usuario && 
                this.usuario.password == user.password
            )
            if(resultado) {
                this.agregarUser(resultado)
                this.agregarResultadoLogin(true)
                alert('Login Exitoso')
                this.$router.replace( {name: 'home'} )
            }
            else{
                alert('Login Fallido !! Usuario o Contraseña Invalido')
                this.$router.replace( {name: 'login'} )
                this.usuario.password = ''
            }
        }
    }
}
</script>