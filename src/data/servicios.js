import axios from 'axios'

const Apiprod = "http://localhost:4545/productos";
const ApiUsu = "http://localhost:4545/usuarios";
const ApiCompras = "http://localhost:4545/CompraPorUsuario";


export default {

    // Obtiene todos los productos del json

    async obtenerProductos(){
        try {
            let respuesta = await axios.get(Apiprod)
            let productos = await respuesta.data
            return await productos

        } catch (error) {
            console.error(error)
        }
    },

    // Obtiene todos los usuarios del json

    async obtenerUsuarios(){
        try {
            let respuesta = await axios.get(ApiUsu)
            let usuarios = await respuesta.data
            return await usuarios

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

    // Agrega una compra del usuario en objetos al json

    agregarCompraXUsuario(obj){
        try {
            axios.post(ApiCompras, obj );
        } catch (error) {
            console.error(error)
        }
    },

    // Agrega un usuario en objetos al json

    async agregarUsuario(obj){
        try {
            await axios.post(ApiUsu, obj )
            alert('Usuario registrado')
            
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
                    console.log(Apiprod + `/${ prod.id }`)
                    await axios.delete(Apiprod + `/${ prod.id }`)
                    alert('Producto Eliminado')
                }

        } catch (error) {
            console.error(error)
        } 
    },

    // Actualiza los datos de un producto del json 

    updateProducto(){
        console.log('Servicio actualizar Producto')
    },

    // Obtiene el ultimo id del array de objetos de productos

    async obtenerUltimoIdProductos(){
        let respuesta = await axios.get(Apiprod)
        let ultimo = await respuesta.data.pop()
        if(ultimo) return ultimo.id
        else return 0
    },

    // Obtiene el ultimo id del array de objetos de Compras

    async obtenerUltimoIdCompras(){
        let respuesta = await axios.get(ApiCompras)
        let ultimo = await respuesta.data.pop()
        if(ultimo) return ultimo.id
        else return 0
    },

    // Obtiene el ultimo id del array de objetos de Usuarios

    async obtenerUltimoIdUsuarios(){
        let respuesta = await axios.get(ApiUsu)
        let ultimo = await respuesta.data.pop()
        if(ultimo) return ultimo.id
        else return 0
    }
}