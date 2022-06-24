import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    show: false,
    productos: [],
    resultadoLogin: false,
    User: {
      usuario: '',
      dni: 0,
      rol: ''
    },
    total: 0
  },
  getters: {

    // Usuarios

    getUser(state){
      return state.User
    },
    getResultadoLogin(state){
      return state.resultadoLogin
    },

    // Productos

    getProductos(state){
      return state.productos
    },
    getCantidadProductos(state){
      return state.productos.length
    },
    getTotal(state){
      return state.total
    },

    // Carrito

    getShow(state){
      return state.show
    }
  },
  mutations: {

    // Carrito

    CambiarShow(state){
      state.show = !state.show
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
    Salir(state){
      state.User.usuario = '',
      state.User.dni = 0,
      state.User.rol = ''
      state.resultadoLogin = false
    },

    // Productos
    
    agregarProductos(state, nuevoProd){
      let bag = state.productos.find((prod) => prod.id == nuevoProd.id);
      if(bag){
        if(bag.enCarrito < bag.disponibilidad){
          bag.enCarrito += nuevoProd.enCarrito
          state.total += nuevoProd.precio * nuevoProd.enCarrito
        }
        else{
          bag.enCarrito
          state.total
        }
      }
      else{
        if(!bag && state.productos.length == 0){
          state.productos.push(nuevoProd)
          state.show = !state.show
          state.total += nuevoProd.precio * nuevoProd.enCarrito
        }
        else {
          state.productos.push(nuevoProd)
          state.total += nuevoProd.precio * nuevoProd.enCarrito
        }
      }
    },

    eliminarProducto(state, id){
      let prod = state.productos.find((prod) => prod.id == id)
      let Indexprod = state.productos.findIndex((prod) => prod.id == id)
      if(prod.enCarrito == 1){
        state.total -= prod.precio
        state.productos.splice(Indexprod , 1)
      }
      else{
        state.total -= prod.precio
        prod.enCarrito--
      }
    },
    vaciarProductos(state){
      state.productos = []
      state.total = 0
      state.show = false
    }
  },
  actions: {

  },
  modules: {
  }
})
