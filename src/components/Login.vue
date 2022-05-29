<template>
    <div class="login">
        <div class="flex justify-center items-center w-full p-8 flex flex-col">
            <div class="w-2/4 px-4 py-8 border-4 bg-lime-300">
                <h2 class="text-2xl text-black mb-2">Login de Usuario</h2>
                <div class="flex justify-center w-full mb-2">
                    <input class="w-2/3 border p-4" type="text" placeholder="Ingrese usuario" v-model.trim="usuario.nombre">
                </div>
                <div class="flex justify-center w-full mb-2">
                    <input class="w-2/3 border p-4" type="password" placeholder="Ingrese password" v-model.number="usuario.password">
                </div>
                <router-link :to="ruta">
                    <button class="w-2/3 p-2 text-white bg-[#dc2626] border-2 m-auto rounded-md" @click="ValidarLogin()">Ingresar</button>
                </router-link>
                <router-link to="/registro">
                    <div class="flex justify-center mt-4">
                         Crear una cuenta
                    </div>
                </router-link>
                <div class="flex justify-end">
                    ¿ Olvidaste tu contraseña ?
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'


export default {
    name: 'Login',
    data() {
        return {
            ruta: '',
            perfilLogueado: '',
            usuario:
            [
                {
                    nombre: '',
                    password: ''
                }
            ],
        }
    },
    props:{
        usuarios:{
            type: Array,
            required: true
        }
    },
    methods:{

        ...mapMutations(
                ['agregarUser', 'agregarResultadoLogin']
        ),
        ValidarLogin(){
            let resultado = this.usuarios.find((usuario) =>
                this.usuario.nombre == usuario.nombre && 
                this.usuario.password == usuario.contraseña
            )
            if(resultado.length != 0) {
                this.agregarUser(resultado)
                this.agregarResultadoLogin(true)
                this.ruta = '/'
                alert('Login Exitoso')
            }
            else {
                this.ruta = '/login'
                this.usuario.nombre = ''
                this.usuario.password = ''
                alert('Login Fallido , revise el usuario y contraseña e intente nuevamente')
            }
        }
    }
}
</script>

<style>

</style>