import axios from 'axios'

const Apiprod = "https://62a123797b9345bcbe46e31d.mockapi.io/productos";
const ApiUsu = "https://62a123797b9345bcbe46e31d.mockapi.io/usuarios";
const ApiCompras = "https://62a123797b9345bcbe46e31d.mockapi.io/compras";


export default {
                /////////////////
                // PRODUCTOS //
              //////////////////

    // Obtiene todos los productos a la API

    async obtenerProductos(){
        try {
            let respuesta = await axios.get(Apiprod)
            let productos = await respuesta.data
            return await productos

        } catch (error) {
            console.error(error)
        }
    },

    // Agrega una producto a la API

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

    // Borra un producto del json 

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

    // Actualiza los datos de un producto del json 

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
            alert('Producto Actualizado')
        } catch (error) {
            console.error(error)
        }
    },

    // Obtiene el ultimo id del array de objetos de productos

    async obtenerUltimoIdProductos(){
        let respuesta = await axios.get(Apiprod)
        let ultimo = await respuesta.data.pop()
        if(ultimo) return ultimo.id
        else return 0
    },



                ////////////////
                // Usuarios //
              /////////////////

    // Obtiene todos los usuarios de la API

    async obtenerUsuarios(){
        try {
            let respuesta = await axios.get(ApiUsu)
            let usuarios = await respuesta.data
            return await usuarios

        } catch (error) {
            console.error(error)
        }
    },

    // Agrega un usuario en objetos a la API

    async agregarUsuario(obj){
        try {
            await axios.post(ApiUsu, obj )
            alert('Usuario Registrado')
            
        } catch (error) {
            console.error(error)
        }
    },

    // Obtiene el ultimo id del array de objetos de Usuarios

    async obtenerUltimoIdUsuarios(){
        let respuesta = await axios.get(ApiUsu)
        let ultimo = await respuesta.data.pop()
        if(ultimo) return ultimo.id
        else return 0
    },



                ///////////////
                // Compras //
              ///////////////



    // Agrega una compra del usuario en objetos al json

    async agregarCompraXUsuario(obj){
        try {
            await axios.post(ApiCompras, obj );
            alert('Compra Registrada')
        } catch (error) {
            console.error(error)
        }
    },

    // Obtiene todos las compras del json

    async obtenerProductoXusuario(){
        try {
            let respuesta = await axios.get(ApiCompras)
            let compras = await respuesta.data
            return await compras

        } catch (error) {
            console.error(error)
        }
    },

}