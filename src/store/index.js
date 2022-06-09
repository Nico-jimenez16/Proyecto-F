import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    show: false,
    productos: [],
    resultadoLogin: false,
    User: {
      nombre: '',
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
      state.User.nombre = obj.nombre
      state.User.dni = obj.dni
      state.User.rol = obj.rol

    },
    agregarResultadoLogin(state , resultado){
      state.resultadoLogin = resultado
    },
    Salir(state){
      state.User.nombre = '',
      state.User.dni = 0,
      state.User.rol = ''
      state.resultadoLogin = false
    },

    // Productos
    
    agregarProductos(state, nuevoProd){
      let bag = state.productos.find((prod) => prod.id == nuevoProd.id);
      if(bag){
        bag.enCarrito +=1
        state.total += nuevoProd.precio
      }
      else{
        if(!bag && state.productos.length == 0){
          state.productos.push(nuevoProd)
          state.show = !state.show
          state.total += nuevoProd.precio
        }
        else {
          state.productos.push(nuevoProd)
          state.total += nuevoProd.precio
        }
      }
    },

    eliminarProducto(state, id){
      let prod = state.productos.find((prod) => prod.id == id)
      if(prod.enCarrito == 1){
        state.total -= prod.precio
        state.productos.splice(prod,1)
        console.log('Carrito = 1' , id)
      }
      else{
        prod.enCarrito--
        state.total -= prod.precio
        console.log('Carrito con mas de 1',id)
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
