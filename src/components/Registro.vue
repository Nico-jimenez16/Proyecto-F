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
                    <input class="w-full p-2 pl-2" type="usuario" name="usuario" id="usuario" placeholder="Ingrese usuario" @keyup="validarUsuario" v-model.trim="formulario.usuario.value">
                    <div class="bg-red-700 mt-2 w-1/3" v-if="!formulario.usuario.isValido">
                        <p class="text-white font-bold">{{ formulario.usuario.mje }}</p>
                    </div>
                </div>
                <div class="flex flex-col h-24">
                    <div class="w-full">
                        <label for="contraseña">Contraseña</label>
                    </div>
                    <input class="w-full p-2 pl-2" type="text" name="contraseña" id="contraseña" placeholder="Ingrese Contraseña" @keyup="validarPassword" v-model.number="formulario.password.value">
                    <div class="bg-red-700 mt-2 w-1/3" v-if="!formulario.password.isValido">
                        <p class="text-white font-bold">{{ formulario.password.mje }}</p>
                    </div>
                </div>
                <div class="flex flex-col h-24">
                    <div class="w-full">
                        <label for="rol">Rol</label>
                    </div>
                    <select @change="validarRol" class="w-full p-2" v-model="formulario.rol.value">
                        <option disabled value="cursos">Seleccione un rol</option>
                        <option >admin</option>
                        <option >usuario</option>
                    </select>
                    <div class="bg-red-700 mt-2 w-1/3" v-if="!formulario.rol.isValido">
                        <p class="text-white font-bold">{{ formulario.rol.mje }}</p>
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
            formulario: {
                exito: true,
                dni: {
                    value: '',
                    isValido: false,
                    mje: ''
                },
                usuario: {
                    value: '',
                    isValido: false,
                    mje: ''
                },
                password: {
                    value: '',
                    isValido: false,
                    mje: ''
                },
                rol:{
                    value: '',
                    isValido: false,
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
        async Registrarse(){
            const usuario = this.usuarios.find((user) => user.dni == this.formulario.dni.value);
            let ultimoId = await servicios.obtenerUltimoIdUsuarios()
            const user = {
                    "id": ultimoId + 1,
                    "dni": this.formulario.dni.value ,
                    "nombre": this.formulario.usuario.value ,
                    "password": this.formulario.password.value ,
                    "rol": this.formulario.rol.value
            }
            if(!usuario && this.formulario.dni.isValido && this.formulario.usuario.isValido && this.formulario.password.isValido && this.formulario.rol.isValido){
                servicios.agregarUsuario(user)
                this.formulario.exito = true
                this.formulario.dni.value = ''
                this.formulario.usuario.value = ''
                this.formulario.password.value = ''
                this.formulario.rol.value = ''
            }else{
                this.formulario.exito = false
                alert('Usuario ya existe')
            }
        },
        validarDni(){
            const regular_dni = /^\d{8}(?:[-\s]\d{4})?$/;
           if(regular_dni.test(this.formulario.dni.value) && this.formulario.dni.value >= 0){
               this.formulario.dni.isValido = true
               this.formulario.dni.mje = 'Dni Valido'
           }else{
               this.formulario.dni.isValido = false
               this.formulario.dni.mje = 'Dni No Valido'
           }
        },
        validarUsuario(){
            if(this.formulario.usuario.value == ''){
                this.formulario.usuario.isValido = false
                this.formulario.usuario.mje = 'Ingresar Usuario'
            }else{
                this.formulario.usuario.isValido = true
                this.formulario.usuario.mje = 'Usuario Valido'
            }
        },
        validarPassword(){
            console.log('validar contraseña')
            if(this.formulario.password.value == ''){
                 this.formulario.password.isValido = false
                 this.formulario.password.mje = 'Ingresar Contraseña'
            }else{
                 this.formulario.password.isValido = true
                 this.formulario.password.mje = 'Contraseña Valido'
            }
        },
        validarRol(){
            if(this.formulario.rol.value == ''){
                this.formulario.rol.isValido = false
                this.formulario.rol.mje = 'Ingresar Rol'
            }else{
                this.formulario.rol.isValido = true
                this.formulario.rol.mje = 'Rol Valido'
            }
        }
    }
}
</script>

<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
-webkit-appearance: none;
margin: 0;
}
</style>