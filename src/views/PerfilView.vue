<template>
    <div id="perfil">
        <h1 class="lg:hidden w-full text-3xl mt-4 font-bold">{{ view }}</h1>
        <div class="block lg:flex">
            <div class="w-full lg:w-1/2 flex flex-col justify-start lg:mt-4 items-center p-4">
                <p class="w-full p-2 mb-2 text-left">Soy estudiante de Ingenieria en Sistemas de Informacion en la Universidad Tecnológica Nacional de Cordoba, Argentina.
                    Actualmente me encuentro cursando Tercer año de la carrera con materias relevantes aprobadas como: algoritmos y estructuras de datos, paradigma de programacion , programacion de aplicaciones visuales I y II , algebra , analisis matematico , analisis de sistema y cursando Diseño de sistemas.
                </p>
                <p class="w-full p-2 text-left">
                    <span class="font-bold">Experiencia profecional:</span>
                    Trabaje 1 año y 2 meses en LeadboxHq, una empresa canadiense de la industria automotriz. El puesto que me desempeñe es desarrolador frontend en el area de soporte, atendiendo los pedidos de los clientes. 
                    Las tecnologias que usabamos son:
                    Html5, VueJs, PHP, Laravel, Wordpress y TailwindCss.
                    Tengo muchas ganas de seguir aprendiendo de todo de este hermoso mundo de la programacion y llegar a ser un desarrollador FullStack.
                </p>
                <p class="w-full p-2 h-auto text-sm md:text-md text-left overflow-hidden">
                    Certificado de Curso de VueJs:
                    <a target="_bank" class="font-bold" href="https://www.coderhouse.com/certificados/62c2dec6b5e2270024c1ca9a">Certificado VueJs</a>
                </p>
            </div>
            <div class="w-full lg:w-1/2 h-full flex justify-center p-4">
                <a target="_bank" href="https://ibb.co/C90SxFc"><img src="https://i.ibb.co/B6sY8Rp/CV-jimenez-Nicolas.jpg" alt="CV-jimenez-Nicolas"></a>
            </div>
        </div>
    </div>
</template>


<script>
import { mapMutations } from 'vuex'


export default {
    name: 'PerfilComponent',
    data() {
        return {
            view:'Perfil'
        }
    },
    mounted(){
        this.CambiarView('Perfil')
    },
    methods:{
        ...mapMutations(
                ['CambiarView']
        )
    }

}
</script>