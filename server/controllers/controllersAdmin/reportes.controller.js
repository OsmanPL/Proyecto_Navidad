const BD = require('../../config/conexion');

exports.top10ProductosMasComprados = async (req, res) => {
    try {
        let sql = `SELECT jc.JUGUETE_FK , j.NOMBRE ,SUM(jc.CANTIDAD) AS CantidadTotal FROM JUGUETE_CARTA jc INNER JOIN JUGUETE j ON jc.JUGUETE_FK = j.ID_JUGUETE GROUP BY jc.JUGUETE_FK, j.NOMBRE ORDER BY CantidadTotal DESC FETCH NEXT 10 ROWS ONLY`;
        let result = await BD.Open(sql, [], true);
        let productos = [];

        productos = result.rows.map(producto => {
            let productoSchema = {
                "ID_Juguete": producto[0],
                "Nombre": producto[1],
                "Cantidad": producto[2]
            }
            return productoSchema
        })
        res.json(productos)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.top10Departamentos = async (req, res) => {
    try {
        let sql = `SELECT d.DEPARTAMENTO , COUNT(d.DEPARTAMENTO) AS CantidadCompras FROM CARTA c , DIRECCION d WHERE c.DIRECCION_FK = d.ID_DIRECCION  GROUP BY d.DEPARTAMENTO ORDER BY CantidadCompras DESC FETCH NEXT 10 ROWS ONLY`;
        let result = await BD.Open(sql, [], true);
        let productos = [];

        productos = result.rows.map(producto => {
            let productoSchema = {
                "Departamento": producto[0],
                "Cantidad": producto[1]
            }
            return productoSchema
        })
        res.json(productos)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.top10municipios = async (req, res) => {
    try {
        let sql = `SELECT d.MUNICIPIO , COUNT(d.MUNICIPIO) AS CantidadCompras FROM CARTA c , DIRECCION d WHERE c.DIRECCION_FK = d.ID_DIRECCION  GROUP BY d.MUNICIPIO ORDER BY CantidadCompras DESC FETCH NEXT 10 ROWS ONLY`;
        let result = await BD.Open(sql, [], true);
        let productos = [];

        productos = result.rows.map(producto => {
            let productoSchema = {
                "Municipio": producto[0],
                "Cantidad": producto[1]
            }
            return productoSchema
        })
        res.json(productos)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.top5buenasacciones = async (req, res) => {
    try {
        let sql = `SELECT bar.ID_BUENAACCION_FK , ba.TITULO, COUNT(bar.ID_BUENAACCION_FK) AS CantidadRealizada FROM BUENA_ACCION_REALIZADA bar  INNER JOIN BUENA_ACCION ba ON ba.ID_BUENAACCION = bar.ID_BUENAACCION_FK GROUP BY bar.ID_BUENAACCION_FK , ba.TITULO ORDER BY CantidadRealizada DESC FETCH NEXT 5 ROWS ONLY`;
        let result = await BD.Open(sql, [], true);
        let productos = [];

        productos = result.rows.map(producto => {
            let productoSchema = {
                "ID_BuenaAccion": producto[0],
                "Titulo": producto[1],
                "Cantidad": producto[2]
            }
            return productoSchema
        })
        res.json(productos)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.bitacora = async (req, res) => {
    try {
        const { nickname } = req.body

        let sql = `SELECT c.*, p2.PUBLICACION , p2.ID_Publicacion FROM COMENTARIO c , PUBLICACION p2 WHERE PUBLICACION_FK = p2.ID_PUBLICACION AND c.HIJO_FK = '${nickname}' ORDER BY c.ID_COMENTARIO ASC`;
        let result = await BD.Open(sql, [], true);
        let productos = [];

        productos = result.rows.map(producto => {
            let productoSchema = {
                "ID_Comentario": producto[0],
                "Hijo": producto[1],
                "Comentario": producto[2],
                "ID_Publicacion": producto[3],
                "Publicacion": producto[4]
            }
            return productoSchema
        })
        res.json(productos)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.top5Categoria = async (req, res) => {
    try {
        let sql = `SELECT j.CATEGORIA , COUNT(j.CATEGORIA) AS CantidadCompras FROM JUGUETE j , JUGUETE_CARTA jc WHERE j.ID_JUGUETE = jc.JUGUETE_FK GROUP BY j.CATEGORIA ORDER BY CantidadCompras DESC FETCH NEXT 5 ROWS ONLY`;
        let result = await BD.Open(sql, [], true);
        let productos = [];

        productos = result.rows.map(producto => {
            let productoSchema = {
                "Categoria": producto[0],
                "Cantidad": producto[1]
            }
            return productoSchema
        })
        res.json(productos)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.topCartas = async (req,res)=>{
    try {

        let sql = `SELECT * FROM CARTA c ORDER BY c.PRECIO_TOTAL DESC`;
        let result = await BD.Open(sql, [], true);
        let usuarios = [];

        usuarios = result.rows.map(user =>{
            
            let usuariosSchema = {
                "ID_Carta": user[0],
                "Hijo_FK": user[1],
                "Padre_FK": user[2],
                "Direccion_FK":user[3],
                "Descripcion":user[4],
                "Estado":user[5],
                "PrecioTotal":user[6],
                "FechaEnvia":user[7]
            }

            return usuariosSchema
        })
        res.json(usuarios)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}