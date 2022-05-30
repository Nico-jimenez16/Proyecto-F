<template>
    <div class="registro">
        <div class="w-full flex flex-col justify-center items-center p-8">
            <form class="w-2/4 text-black bg-lime-300 p-4 mb-8" action="">
                <H1 class="text-2xl text-black mb-2">Formulario de Registro</H1>
                <div class="flex flex-col h-24">
                    <div class="w-full">
                        <label for="dni">Dni</label>
                    </div>
                    <input class="w-full p-2 pl-2" type="number" name="dni" id="dni" placeholder="Ingrese dni" @keyup="validarDni" v-model.number="formulario.dni.value">
                    <div class="bg-red-700 mt-2 w-1/3" v-if="!formulario.dni.isValido">
                        <p class="text-white font-bold">{{ formulario.dni.mje }}</p>
                    </div>
                </div>
                <div class="flex flex-col h-24">
                    <div class="w-full">
                        <label for="usuario">Usuario</label>
                    </div>
                    <input class="w-full p-2 pl-2" type="usuario" name="usuario" id="usuario" placeholder="Ingrese usuario" v-model.trim="formulario.usuario.value">
                    <div class="bg-black mt-2 w-1/3" v-if="!formulario.usuario.isValido">
                        <p class="text-red-500 font-bold">{{ formulario.usuario.mje }}</p>
                    </div>
                </div>
                <div class="flex flex-col h-24">
                    <div class="w-full">
                        <label for="password">Contraseña</label>
                    </div>
                    <input class="w-full p-2 pl-2" type="password" name="password" id="password" placeholder="Ingrese Password" v-model.number="formulario.contraseña.value">
                    <div class="bg-black mt-2 w-1/3" v-if="!formulario.contraseña.isValido">
                        <p class="text-red-500 font-bold">{{ formulario.contraseña.mje }}</p>
                    </div>
                </div>
                <div class="flex flex-col h-24">
                    <div class="w-full">
                        <label for="rol">Rol</label>
                    </div>
                    <select class="w-full p-2" v-model="formulario.rol.value">
                        <option disabled value="cursos">Seleccione un rol</option>
                        <option>admin</option>
                        <option>usuario</option>
                    </select>
                    <div class="bg-black mt-2 w-1/3" v-if="!formulario.rol.isValido">
                        <p class="text-red-500 font-bold">{{ formulario.rol.mje }}</p>
                    </div>
                </div>
                <p class="text-red-600 mb-2 bg-black p-2" v-if="!formulario.exito">Debe completar todos los campos del formulario</p>
                <button type="submit" class="w-1/3 border p-2 bg-[#dc2626] text-xl text-white rounded-md" @click.prevent="Registrarse()">Registrarse</button>
            </form>
        </div>
    </div>
</template>

<script>
import servicios from '@/data/servicios'

export default {
    name: 'Registro',
    data() {
        return {
            tabla:[],
            formulario: {
                exito: true,
                dni: {
                    value: '',
                    isValido: false,
                    mje: ''
                },
                usuario: {
                    value: '',
                    isValido: true,
                    mje: ''
                },
                contraseña: {
                    value: '',
                    isValido: true,
                    mje: ''
                },
                rol:{
                    value: '',
                    isValido: true,
                    mje: ''
                }
            }
        }
    },
    props:{
        usuarios:{
            type: Array
        }
    },
    methods:{
        getRandomArbitrary() {
            return Math.random() * (1000 - 1) + 1;
        },
        async Registrarse(){
            const usuario = this.usuarios.find((user) => user.dni == this.formulario.dni.value);
            let ultimoId = await servicios.obtenerUltimoIdUsuarios()
            const user = {
                    "id": ultimoId + 1,
                    "dni": this.formulario.dni.value ,
                    "nombre": this.formulario.usuario.value ,
                    "contraseña": this.formulario.contraseña.value ,
                    "rol": this.formulario.rol.value
            }
            if(!usuario && this.formulario.dni.isValido){
                servicios.agregarUsuario(user)
                this.formulario.dni.value = ''
                this.formulario.usuario.value = ''
                this.formulario.contraseña.value = ''
                this.formulario.rol.value = ''
            }else{
                alert('Usuario ya existe')
            }
        },
        validarDni(){
            const regular_dni = /^\d{8}(?:[-\s]\d{4})?$/;
           if(regular_dni.test(this.formulario.dni.value) && this.formulario.dni.value >= 0){
               this.formulario.dni.isValido = true
           }else{
               this.formulario.dni.isValido = false
               console.error('Dni no valido')
           }
        },
    }
}
</script>

<style>

</style>