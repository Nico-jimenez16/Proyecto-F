import axios from 'axios'

const Apiprod = "https://62a123797b9345bcbe46e31d.mockapi.io/productos";
const ApiUsu = "https://62a123797b9345bcbe46e31d.mockapi.io/usuarios";
const ApiCompras = "https://62a123797b9345bcbe46e31d.mockapi.io/compras";


export default {

                /////////////////
                // PRODUCTOS //
              //////////////////


    // ! Obtiener productos de la API

    async obtenerProductos(){
        try {
            const response = await axios.get(Apiprod)
            const data = await response.data
            return data
        } catch (error) {
            console.error(error)
        }
    },

    // ! Agrega una producto a la API

    async agregarProducto(obj , fav){
        const nuevoP = {
            "url" : obj.url,
            "descripcion": obj.descripcion,
            "precio": obj.precio,
            "disponibilidad" : obj.disponibilidad,
            "favorito": fav,
            "detalle" : obj.detalle
        }
        try {
            const response = await axios.post(Apiprod, nuevoP)
            const data = response.data
            return data
        } catch (error) {
            console.error(error)
        }
    },

    // ! Borra un producto de la API

    async delleteProducto(id){
        try {
            let respuesta = await this.obtenerProductos()
            for(let prod of respuesta)
                if(prod.id == id){
                    let response = await axios.delete(Apiprod + `/${ prod.id }`)
                    let data = response.data
                    return data
                }
        } catch (error) {
            console.error(error)
        } 
    },

    // ! Actualizar un producto de la API

    async updateProducto(obj , fav){
        const prod = {
            "url": obj.url,
            "descripcion": obj.descripcion,
            "precio": obj.precio,
            "disponibilidad": obj.disponibilidad,
            "favorito": fav,
            "detalle": obj.detalle
        }
        try {
            await axios.put(Apiprod + `/${ obj.id }`, prod)
        } catch (error) {
            console.error(error)
        }
    },

    // ! Actualiza la disponibilidad de un producto al realizarce una compra

    async updateDisponibilidad(compra){
        try {
            compra.map(async(prod) => {
                await axios.put(Apiprod + `/${ prod.id }`, {
                    "disponibilidad": prod.disponibilidad - prod.enCarrito,
                })
            })
        } catch (error) {
            console.error(error)
        }
    },

                ////////////////
                // Usuarios //
              /////////////////

    // ! Obtiener los usuarios de la API

    async obtenerUsuarios(){
        try {
            let response = await axios.get(ApiUsu)
            let data = await response.data
            return data

        } catch (error) {
            console.error(error)
        }
    },

    // ! Agrega un usuario a la API

    async agregarUsuario(obj){
        try {
            await axios.post(ApiUsu, obj )
            alert('Usuario Registrado')
            
        } catch (error) {
            console.error(error)
        }
    },

                ///////////////
                // Compras //
              ///////////////

    // ! Agrega una compra del usuario en objetos al json

    async registrarCompra(compra){
        // agregar model de registrando compra
        try {
            compra.map(async (prod) => {
                await axios.post(ApiCompras, prod );
            })
            alert('Compra Registrada')
        } catch (error) {
            console.error(error)
        }
    },

    // ! Obtiene todos las compras del json

    async obtenerCompras(){
        try {
            let response = await axios.get(ApiCompras)
            let data = await response.data
            return data

        } catch (error) {
            console.error(error)
        }
    },

}