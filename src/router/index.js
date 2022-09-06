import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/productos',
    name: 'productos',
    component: () => import(/* webpackChunkName: "productos" */ '../views/ProductosView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: () => import(/* webpackChunkName: "carrito" */ '../views/CarritoView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import(/* webpackChunkName: "registro" */ '../views/RegistroView.vue')
  },
  {
    path: '/detalle/:id', 
    name: 'detalle',
    component: () => import(/* webpackChunkName: "detalle" */ '../views/DetalleProductoView.vue')
  },
  {
    path: '/nuevoProducto',
    name: 'nuevoProducto',
    component: () => import(/* webpackChunkName: "Nuevo Producto" */ '../views/NuevoProductoView.vue')
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import(/* webpackChunkName: "perfil" */ '../views/PerfilView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
