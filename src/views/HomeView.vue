<template>
  <div id="home" class="md:py-2 lg:py-0">
    <div class="flex relative justify-center items-center w-full overflow-hidden h-52 md:h-96">
      <div class="flex flex-col absolute w-full justify-center items-center p-2 md:p-4 backdrop-opacity-10 backdrop-invert bg-black/40 text-white">
        <h2 class="text-md md:text-4xl font-bold p-4">TU PLATO FAVORITO AQUI !!</h2>
        <router-link class="w-1/2 lg:w-1/5" :to="{name: 'productos'}">
          <div class="p-2 text-white rounded-xl font-bold border-2">Hace tu Pedido</div>
        </router-link>
      </div>
      <img class="w-full h-auto" :src="image" alt="banner">
    </div>
    <h1 class="text-3xl mt-2 p-2 underline">{{ titulo }}</h1>
    <Productos :productos="productoFavoritos"></Productos>
    <router-link :to="{ name: 'productos'}" >
      <div class="flex w-full justify-center"> 
        <button class="p-2 text-cyan-700 font-bold text-sm w-full md:text-xl md:w-1/2 mb-4">VER TODOS LOS PRODUCTOS<span class="font-bold text-cyan-700 ml-4"> >>> </span></button>
      </div>
    </router-link>
  </div>
</template>

<script>
import Productos from '@/components/Productos.vue'
import servicios from '@/data/servicios'
import { mapMutations } from 'vuex'

export default {
  name: 'HomeView',
  components: { Productos },
  data(){
    return {
        view: 'Home',  
        titulo: 'Productos Favoritos',
        productoFavoritos: [],
        images: [
          'https://img.freepik.com/foto-gratis/ingredientes-italianos-apetitosos-frescos-sabrosos-comida-viejo-fondo-madera-rustico-listo-cocinar-inicio-italiano-comida-saludable-concepto-cocina_1220-1740.jpg?w=2000',
          'https://elviajerofeliz.com/wp-content/uploads/2020/09/comida-tipica-de-venezuela.jpg',
          'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/08/02120926/Gastronom%C3%ADa.jpg'
        ],
        image: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/08/02120926/Gastronom%C3%ADa.jpg'
    }
  },
  async mounted(){
    this.intevalImages()
    this.CambiarView('Home')
    const productos = await servicios.obtenerProductos()
    productos.filter((producto) => { if(producto.favorito) this.productoFavoritos.push(producto)})
  },
  methods:{
    ...mapMutations(
            ['CambiarView']
    ),

    intevalImages() {
      let count = this.images.length
      let index = 0
      setInterval(() => {
        if(index === count){
          index = 0
          this.image = this.images[index]
        }else{
          this.image = this.images[index]
          index += 1
        }
      }, 5000);
    }
  }
}
</script>
