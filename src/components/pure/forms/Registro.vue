<template>
    <div class="registro">
        <div class="w-full flex flex-col justify-center items-center p-8">
            <form class="w-full md:w-3/4 lg:w-2/4 text-black p-4 mb-8 border-2 rounded-xl" action="">
                <H1 class="text-2xl text-black mb-2">Formulario de Registro</H1>
                <div class="flex flex-col mb-4">
                    <input class="w-full border-2 rounded-full p-4" maxlength="8" type="number" name="dni" id="dni" placeholder="Ingrese dni" @keyup="validarDni" v-model.number="formulario.dni.value">
                    <div class="w-full bg-red-700" v-if="!formulario.dni.isValido">
                        <p class="w-full bg-red-500 text-white text-sm md:text-md font-bold">{{ formulario.dni.mje }}</p>
                    </div>
                </div>
                <div class="flex flex-col mb-4">
                    <input class="w-full border-2 rounded-full p-4" type="usuario" name="usuario" id="usuario" placeholder="Ingrese usuario" @keyup="validarUsuario" v-model.trim="formulario.usuario.value">
                    <div class="w-full bg-red-700" v-if="!formulario.usuario.isValido">
                        <p class="bg-red-500 text-white text-sm md:text-md font-bold">{{ formulario.usuario.mje }}</p>
                    </div>
                </div>
                <div class="flex flex-col mb-4">
                    <input class="w-full border-2 rounded-full p-4" type="password" name="contraseña" id="contraseña" placeholder="Ingrese Contraseña" @keyup="validarPassword" v-model.trim="formulario.password.value">
                    <div class="w-full bg-red-700" v-if="!formulario.password.isValido">
                        <p class="bg-red-500 text-white text-sm md:text-md font-bold">{{ formulario.password.mje }}</p>
                    </div>
                </div>
                <div class="flex flex-col mb-4">
                    <select @change="validarRol" class="w-full border-2 rounded-full p-4" v-model="formulario.rol.value">
                        <option disabled value="roles">Seleccione un rol</option>
                        <option >admin</option>
                        <option >usuario</option>
                    </select>
                    <div class="w-full bg-red-700" v-if="!formulario.rol.isValido">
                        <p class="bg-red-500 text-white text-sm md:text-md font-bold">{{ formulario.rol.mje }}</p>
                    </div>
                </div>
                <button type="submit" class="w-2/3 border p-2 bg-[#dc2626] text-xl text-white rounded-md" @click.prevent="Registrarse()">Registrarse</button>
            </form>
        </div>
    </div>
</template>

<script>
import servicios from '@/data/servicios'

export default {
    name: 'RegistroComponent',
    data() {
        return {
            formulario: {
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
            const user = {
                    "dni": this.formulario.dni.value ,
                    "usuario": this.formulario.usuario.value ,
                    "password": this.formulario.password.value ,
                    "rol": this.formulario.rol.value
            }
            if(!usuario){
                if(this.formulario.dni.isValido && this.formulario.usuario.isValido && this.formulario.password.isValido && this.formulario.rol.isValido){
                    await servicios.agregarUsuario(user)
                    this.formulario.dni.value = ''
                    this.formulario.usuario.value = ''
                    this.formulario.password.value = ''
                    this.formulario.rol.value = ''
                    this.$router.replace({name: 'login'})
                }else{
                    alert('Debe completar todos los campos')
                }
            }else{
                alert('Usuario ya existe')
            }
        },
        validarDni(){
            const User = this.usuarios.find((user) => user.dni == this.formulario.dni.value);
            const regular_dni = /^\d{8}(?:[-\s]\d{4})?$/;
            if(this.formulario.dni.value == ''){
                    this.formulario.dni.isValido = false
                    this.formulario.dni.mje = 'Value is required'
            }else{
                if(User){
                    this.formulario.dni.isValido = false
                    this.formulario.dni.mje = 'dni already exists'
                }else{
                    if(regular_dni.test(this.formulario.dni.value) && this.formulario.dni.value >= 0){
                        this.formulario.dni.isValido = true
                        this.formulario.dni.mje = 'Valido'
                    }else{
                        this.formulario.dni.isValido = false
                        this.formulario.dni.mje = 'invalid format'
                    }
                }
            }
        },
        validarUsuario(){
            const User = this.usuarios.find((user) => user.usuario == this.formulario.usuario.value);
            if(this.formulario.usuario.value == ''){
                this.formulario.usuario.isValido = false
                this.formulario.usuario.mje = 'Value is required'
            }else{
                if(User){
                    this.formulario.usuario.isValido = false
                    this.formulario.usuario.mje = 'user already exists'
                }else{
                    this.formulario.usuario.isValido = true
                    this.formulario.usuario.mje = 'valido'
                }
            }
        },
        validarPassword(){
            if(this.formulario.password.value == ''){
                 this.formulario.password.isValido = false
                 this.formulario.password.mje = 'Value is required'
            }else{
                 this.formulario.password.isValido = true
                 this.formulario.password.mje = 'Valida'
            }
        },
        validarRol(){
            if(this.formulario.rol.value == ''){
                this.formulario.rol.isValido = false
                this.formulario.rol.mje = 'Value is required'
            }else{
                this.formulario.rol.isValido = true
                this.formulario.rol.mje = 'Valido'
            }
        }
    }
}
</script>