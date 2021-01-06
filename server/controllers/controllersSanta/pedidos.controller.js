const BD = require('../../config/conexion');

exports.pedido = async (req, res) => {
    try {
        const { id } = req.body
        let sql = `UPDATE CARTA SET ESTADO='Entregada' WHERE ID_CARTA=${id}`
        await BD.Open(sql, [], true);

        res.json({ "info": "Carta Entregada" })
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.getCartas = async (req, res) => {
    try {
        let query = `SELECT * FROM CARTA WHERE Estado='Confirmada'`;
        let result = await BD.Open(query, [], false);
        let usuarios = [];

        usuarios = result.rows.map(user => {

            let usuariosSchema = {
                "ID_Carta": user[0],
                "Hijo_FK": user[1],
                "Padre_FK": user[2],
                "Direccion_FK": user[3],
                "Descripcion": user[4],
                "Estado": user[5],
                "PrecioTotal": user[6],
                "FechaEnvia": user[7],
                "Hijo": {},
                "Direccion":{}
            }
            return usuariosSchema
        })
        for (i = 0; i < usuarios.length; i++) {
            let selectHijo = `SELECT * FROM HIJO WHERE NICKNAME='${usuarios[i].Hijo_FK}'`;
            let resultadoHijo = await BD.Open(selectHijo, [], false);
            let hijos = [];

            hijos = resultadoHijo.rows.map(hijo => {
                let schema = {
                    "Nickname": hijo[0],
                    "Password": hijo[5],
                    "Nombre": hijo[1],
                    "Sexo": hijo[2],
                    "Fecha_Nacimiento": hijo[3],
                    "Edad": hijo[4],
                    "Bastones": hijo[6],
                    "Padre": hijo[7]
                }
                return schema;
            })

            let selectDireccion = `SELECT * FROM DIRECCION WHERE ID_Direccion='${usuarios[i].Direccion_FK}'`
            let resultDireccion = await BD.Open(selectDireccion,[],false);
            let direccion = [];

            direccion = resultDireccion.rows.map(direc =>{
                let schema = {
                    "Departamento":direc[1],
                    "Municipio":direc[2],
                    "Descripcion":direc[3],
                    "Latitud":direc[4],
                    "Longitud":direc[5]
                }
                return schema
            })

            usuarios[i].Direccion = direccion[0]
            usuarios[i].Hijo = hijos[0];
        }

        res.json(usuarios);
    } catch (error) {

        console.log("Error al realizar la consulta => ", error)
        res.json({})

    }
}


exports.entregadas = async (req, res) => {
    try {
        let query = `SELECT * FROM CARTA WHERE Estado='Entregada'`;
        let result = await BD.Open(query, [], false);
        let usuarios = [];

        usuarios = result.rows.map(user => {

            let usuariosSchema = {
                "ID_Carta": user[0],
                "Hijo_FK": user[1],
                "Padre_FK": user[2],
                "Direccion_FK": user[3],
                "Descripcion": user[4],
                "Estado": user[5],
                "PrecioTotal": user[6],
                "FechaEnvia": user[7],
                "Hijo": {}
            }
            return usuariosSchema
        })
        for (i = 0; i < usuarios.length; i++) {
            let selectHijo = `SELECT * FROM HIJO WHERE NICKNAME='${usuarios[i].Hijo_FK}'`;
            let resultadoHijo = await BD.Open(selectHijo, [], false);
            let hijos = [];

            hijos = resultadoHijo.rows.map(hijo => {
                let schema = {
                    "Nickname": hijo[0],
                    "Password": hijo[5],
                    "Nombre": hijo[1],
                    "Sexo": hijo[2],
                    "Fecha_Nacimiento": hijo[3],
                    "Edad": hijo[4],
                    "Bastones": hijo[6],
                    "Padre": hijo[7]
                }
                return schema;
            })

            usuarios[i].Hijo = hijos[0];
        }

        res.json(usuarios);
    } catch (error) {

        console.log("Error al realizar la consulta => ", error)
        res.json({})

    }
}

exports.verDeseos = async (req, res) => {
    try {

        const { id } = req.body
        let coment = `SELECT * FROM JUGUETE_CARTA WHERE Carta_FK=${id} ORDER BY ID_JugueteCarta DESC`;
        let resultComent = await BD.Open(coment, [], false);
        let comentarios = [];

        comentarios = resultComent.rows.map(comentario => {
            let comentarioSchema = {
                "ID_JugueteCarta": comentario[0],
                "Juguete_FK": comentario[1],
                "Carta_FK": comentario[2],
                "Cantidad": comentario[3],
                "Total": comentario[4],
                "Juguete": {}
            }
            return comentarioSchema
        })

        for (j = 0; j < comentarios.length; j++) {
            let juguete = `SELECT * FROM JUGUETE WHERE ID_Juguete = ${comentarios[j].Juguete_FK}`;
            let resultJuguete = await BD.Open(juguete, [], false);
            let juguetes = [];

            juguetes = resultJuguete.rows.map(jc => {
                let schemaJuguete = {
                    "Nombre": jc[1],
                    "Categoria": jc[2]
                }
                return schemaJuguete
            })
            comentarios[j].Juguete = juguetes[0]
        }
        res.json(comentarios)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}