<template>
  <div id="home" class="md:py-2 lg:py-0">
    <div class="flex relative justify-center items-center w-full">
      <div class="flex flex-col absolute w-full justify-center items-center p-2 md:p-4 backdrop-opacity-10 backdrop-invert bg-white/40">
        <h2 class="text-md md:text-4xl font-bold p-4">TU PLATO FAVORITO AQUI !!</h2>
        <router-link class="w-1/2 lg:w-1/5" :to="{name: 'productos'}">
          <div class="p-2 text-white bg-[#2c3e50] rounded-xl font-bold border-2">Hace tu Pedido</div>
        </router-link>
      </div>
      <img class="w-full h-22 md:h-80" :src="image" alt="banner">
    </div>
    <h1 class="text-3xl mt-4 p-4 underline">{{ titulo }}</h1>
    <Productos :productos="producto"></Productos>
    <router-link :to="{ name: 'productos'}" >
      <div class="flex w-full justify-center"> 
        <button class="p-2 text-cyan-700 font-bold text-sm w-full md:text-xl md:w-1/2 mb-4">VER TODOS LOS PRODUCTOS<span class="font-bold text-cyan-700 ml-4"> >>> </span></button>
      </div>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import Productos from '@/components/Productos.vue'
import servicios from '@/data/servicios'
import { mapMutations } from 'vuex'
// import { onMounted, ref } from 'vue-demi'

export default {
  name: 'HomeView',
  data(){
    return {
        view: 'Home',  
        titulo: 'Productos Favoritos',
        producto: [],
        images: [
          'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/08/02120926/Gastronom%C3%ADa.jpg', 
          'https://usil.edu.pe/sites/default/files/2022-02/180222-gestion-innovacion-gastronomia-puestos-trabajo.jpg',
          'https://blog.profoto.com.mx/wp-content/uploads/2018/08/los-ingredientes-basicos-de-la-gastronomia-espanola-1440x810.jpg',
          'https://s2.glbimg.com/AZwdz2ugZrz0EQcGyMT4Il21OfA=/0x0:1400x788/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/q/v/ONzRlBR5CA4B83b0dUpg/banner-destaque.jpg',
          'https://dam.ngenespanol.com/wp-content/uploads/2019/04/hamburguesa-mundo.png'
        ],
        image: 'https://dam.ngenespanol.com/wp-content/uploads/2019/04/hamburguesa-mundo.png'
    }
  },
  async mounted(){
    this.intevalImages()
    this.CambiarView('Home')
    let productos = await servicios.obtenerProductos()
    for(let producto of productos){
      if(producto.favorito) this.producto.push(producto)
    }
  },
  components: { Productos },
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
