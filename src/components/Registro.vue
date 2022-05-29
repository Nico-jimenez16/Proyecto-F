<template>
    <div class="registro">
        <div class="w-full flex flex-col justify-center items-center p-8">
            <form class="w-2/4 text-black bg-lime-300 p-4 mb-8" action="">
                <H1 class="text-2xl text-black mb-2">Formulario de Registro</H1>
                <div class="flex flex-col h-24">
                    <div class="w-full">
                        <label for="dni">Dni</label>
                    </div>
                    <input class="w-full p-2 pl-2" type="number" name="dni" id="dni" placeholder="Ingrese dni" v-model.trim="formulario.dni.value">
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
                        <option>Admin</option>
                        <option>Usuario</option>
                    </select>
                    <div class="bg-black mt-2 w-1/3" v-if="!formulario.rol.isValido">
                        <p class="text-red-500 font-bold">{{ formulario.rol.mje }}</p>
                    </div>
                </div>
                <p class="text-red-600 mb-2 bg-black p-2" v-if="!formulario.exito">Debe completar todos los campos del formulario</p>
                <button type="submit" class="w-1/3 border p-2 bg-[#dc2626] text-xl text-white rounded-md" @keyup.enter.prevent="Registrarse()" @click.prevent="Registrarse()">Registrarse</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Registro',
    data() {
        return {
            tabla:[],
            formulario: {
                exito: true,
                dni: {
                    value: '',
                    isValido: true,
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
        Registrarse(){
            const usuario = this.usuarios.find((user) => user.dni == this.formulario.dni.value);
            console.log(usuario)
            if(!usuario){
                console.log('Listo para ser agregado')
            }else{
                alert('Usuario ya existe')
            }
        }
    }
}
</script>

<style>

</style>