import axios from 'axios'

const Apiprod = "http://localhost:4545/productos";
const Apiusu = "http://localhost:4545/usuarios";
const ApiProdXUser = "http://localhost:4545/CompraPorUsuario";


export default {

    async obtenerProductos(){
        try {
            let respuesta = await axios.get(Apiprod)
            let productos = await respuesta.data
            return await productos

        } catch (error) {
            console.error(error)
        }
    },
    async obtenerUsuarios(){
        try {
            let respuesta = await axios.get(Apiusu)
            let usuarios = await respuesta.data
            return await usuarios

        } catch (error) {
            console.error(error)
        }
    },
    async obtenerProductoXusuario(){
        try {
            let respuesta = await axios.get(ApiProdXUser)
            let compras = await respuesta.data
            return await compras

        } catch (error) {
            console.error(error)
        }
    },
    agregarCompraXUsuario(obj){
        try {
            axios.post(ApiProdXUser, obj );
        } catch (error) {
            console.error(error)
        }
    }
}