const BD = require('../../config/conexion');

exports.getPadres = async (req, res) => {
    try {
        let query1 = `SELECT * FROM PADRE`;
        let result1 = await BD.Open(query1, [], false);
        let padres = [];

        padres = result1.rows.map(santa => {
            let santaSchema = {
                "Correo": santa[0],
                "Password": santa[1],
                "Nombre": santa[2],
                "Telefono": santa[3],
                "Dinero": santa[4],
                "Direccion": []
            }
            return santaSchema
        })

        for (i = 0; i < padres.length; i++) {
            let sqlDireccion = `SELECT * FROM DIRECCION WHERE Padre_FK='${padres[i].Correo}'`;
            let resultDireccion = await BD.Open(sqlDireccion, [], false);
            let direccion = [];

            direccion = resultDireccion.rows.map(direccionQ => {
                let direccionSchema = {
                    "ID_Direccion": direccionQ[0],
                    "Departamento": direccionQ[1],
                    "Municipio": direccionQ[2],
                    "Descripcion": direccionQ[3]
                }
                return direccionSchema
            })

            padres[i].Direccion = direccion
        }

        res.json(padres)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.insertPadre = async (req, res) => {
    try {
        const { correo, password, nombre, telefono, dinero, departamento, municipio, descripcion } = req.body;

        let sqlPadre = `INSERT INTO PADRE VALUES('${correo}','${password}','${nombre}',${telefono},${dinero})`;
        await BD.Open(sqlPadre, [], true);

        let sqlDireccion = `INSERT INTO DIRECCION VALUES(NULL, '${departamento}','${municipio}','${descripcion}','${correo}')`
        await BD.Open(sqlDireccion, [], true);

        res.json({ "info": "Padre creado" })

    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.updatePadre = async (req, res) => {
    try {
        const { correo, password, nombre, telefono, dinero, departamento, municipio, descripcion } = req.body

        let sqlPadre = `UPDATE PADRE SET Pasword='${password}',Nombre='${nombre}',Telefono=${telefono},Dinero=${dinero} WHERE Correo='${correo}'`;
        await BD.Open(sqlPadre, [], true);

        let sqlDireccion = `UPDATE DIRECCION SET Departamento='${departamento}', Municipio='${municipio}', Descripcion='${descripcion}' WHERE Padre_FK='${correo}'`
        await BD.Open(sqlDireccion, [], true);

        res.json({ "info": "Padre Modificado" })
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.deletePadre = async (req, res) => {
    try {
        const { correo } = req.body;

        let selectHijos = `SELECT * FROM HIJO WHERE  Padre_FK='${correo}'`
        let resultado1 = await BD.Open(selectHijos, [], false);
        let hijos = [];


        hijos = resultado1.rows.map(hijo => {
            let hijoSchema = {
                Nickname: hijo[0]
            }
            return hijoSchema;
        })

        let selectCartas = `SELECT * FROM CARTA WHERE  Padre_FK='${correo}'`
        let resultado2 = await BD.Open(selectCartas, [], false);
        let cartas = [];


        cartas = resultado2.rows.map(carta => {
            let cartaSchema = {
                ID_Carta: carta[0]
            }
            return cartaSchema
        })

        for (i = 0; i < cartas.length; i++) {
            let eliminarJugueteCarta = `DELETE FROM JUGUETE_CARTA WHERE CARTA_FK=${cartas[i].ID_Carta}`
            await BD.Open(eliminarJugueteCarta, [], true)
        }

        let eliminarCarta = `DELETE FROM CARTA WHERE PADRE_FK='${correo}'`;
        await BD.Open(eliminarCarta, [], true);

        for (i = 0; i < hijos.length; i++) {
            let selectConversaciones = `SELECT * FROM CONVERSACION WHERE HIJO_FK='${hijos[i].Nickname}'`
            let resultado3 = await BD.Open(selectConversaciones, [], false);
            let conversaciones = [];

            conversaciones = resultado3.rows.map(conversacion => {
                let conversacionSchema = {
                    ID_Conversacion: conversacion[0]
                }
                return conversacionSchema
            })

            for (j = 0; j < conversaciones.length; j++) {
                let eliminarMensajes = `DELETE FROM MENSAJE WHERE Conversacion_FK=${conversaciones[i].ID_Conversacion}`
                await BD.Open(eliminarMensajes, [], true)
            }
            let deleteConversaciones = `DELETE FROM CONVERSACION WHERE HIJO_FK='${hijos[i].Nickname}'`
            await BD.Open(deleteConversaciones, [], true)
        }

        let deleteHijos = `DELETE FROM HIJO WHERE PADRE_FK='${correo}'`
        await BD.Open(deleteHijos, [], true);

        let sqlDireccion = `DELETE FROM DIRECCION WHERE Padre_FK='${correo}'`
        await BD.Open(sqlDireccion, [], true);

        let sqlPadre = `DELETE FROM PADRE WHERE Correo='${correo}'`
        await BD.Open(sqlPadre, [], true);

        res.json({ "info": "Padre Eliminado" })
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}