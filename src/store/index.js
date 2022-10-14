import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    show: false,
    productos: [],
    precioTotal: 0,
    resultadoLogin: false,
    User: {
      usuario: '',
      dni: 0,
      rol: ''
    },
    Navmobile: false,
    view: '',
    loader: false,
    perfil: false
  },
  getters: {

    GetView(state){
      return state.view 
    },
    getPerfil(state){
      return state.perfil 
    },

    getLoader(state){
      return state.loader
    },

    // Carrito

    getShow(state){
      return state.show
    },

    // Usuarios

    getUser(state){
      return state.User
    },
    getResultadoLogin(state){
      return state.resultadoLogin
    },
    getMobile(state){
      return state.Navmobile
    },

    // Productos

    getProductos(state){
      return state.productos
    },
    getCantidadProductos(state){
      return state.productos.length
    },
    getTotal(state){
      return state.precioTotal
    }

  },
  mutations: {

    setLoader(state , bool){
      state.loader = bool
    },
    setPerfil(state , bool){
      state.perfil = bool
    },

    CambiarView(state , view){
      state.view = view
    },

    // Carrito

    CambiarShow(state){
      state.show = !state.show
    },
    CambiarShowMobile(state){
      state.Navmobile = !state.Navmobile
    },

    // Usuario
    
    agregarUser(state , obj){
      state.User.usuario = obj.usuario
      state.User.dni = obj.dni
      state.User.rol = obj.rol

    },
    agregarResultadoLogin(state , resultado){
      state.resultadoLogin = resultado
    },

    // Productos
    
    agregarProductos(state, nuevoProd){
      let bag = state.productos.find((prod) => prod.id == nuevoProd.id);
      if(bag){
        if(bag.enCarrito < bag.disponibilidad){
          bag.enCarrito += nuevoProd.enCarrito
          state.precioTotal += nuevoProd.precio * nuevoProd.enCarrito
        }
        else{
          bag.enCarrito
          state.precioTotal
        }
      }
      else{
        if(!bag && state.productos.length == 0){
          state.productos.push(nuevoProd)
          state.show = !state.show
          state.precioTotal += nuevoProd.precio * nuevoProd.enCarrito
        }
        else {
          state.productos.push(nuevoProd)
          state.precioTotal += nuevoProd.precio * nuevoProd.enCarrito
        }
      }
    },

    eliminarProducto(state, id){
      let prod = state.productos.find((prod) => prod.id == id)
      let Indexprod = state.productos.findIndex((prod) => prod.id == id)
      if(prod.enCarrito == 1){
        state.precioTotal -= prod.precio
        state.productos.splice(Indexprod , 1)
      }
      else{
        state.precioTotal -= prod.precio
        prod.enCarrito--
      }
    },
    vaciarProductos(state){
      state.productos = []
      state.precioTotal = 0
      state.show = false
    },
    sacarDelCarrito(state, id){
        let prod = state.productos.find((prod) => prod.id == id)
        let Indexprod = state.productos.findIndex((prod) => prod.id == id)
        state.precioTotal -= prod.precio * prod.enCarrito
        state.productos.splice(Indexprod , 1)
    }


  },
  actions: {

  },
  modules: {
  }
})
