const BD = require('../../config/conexion');

exports.getMensajes = async (req, res) => {
    try {
        let query = `SELECT * FROM CONVERSACION`;
        let result = await BD.Open(query, [], false);
        let usuarios = [];

        usuarios = result.rows.map(user => {

            let usuariosSchema = {
                "ID_Conversacion": user[0],
                "Admin": user[1],
                "Hijo_FK": user[2],
                "Mensajes": []
            }

            return usuariosSchema
        })

        for (i = 0; i < usuarios.length; i++) {
            let coment = `SELECT * FROM MENSAJE WHERE Conversacion_FK=${usuarios[i].ID_Conversacion} ORDER BY ID_Mensaje DESC`;
            let resultComent = await BD.Open(coment, [], false);
            let comentarios = [];

            comentarios = resultComent.rows.map(comentario => {
                let comentarioSchema = {
                    "ID_Mensaje": comentario[0],
                    "Descripcion": comentario[1],
                    "Emisor": comentario[2],
                    "Conversacion_FK": comentario[3]
                }
                return comentarioSchema
            })
            usuarios[i].Mensajes = comentarios
        }

        res.json(usuarios);
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}


exports.enviarMensaje = async (req, res) => {
    try {
        const { conversacion, mensaje } = req.body
        let query = `INSERT INTO MENSAJE VALUES(NULL, '${mensaje}', 'Administrador', ${conversacion})`;
        await BD.Open(query, [], true);
        res.json({ "info": "Mensaje Enviado" });
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.getConversasiones = async (req, res) => {
    try {
        let query = `SELECT * FROM CONVERSACION`;
        let result = await BD.Open(query, [], false);
        let conversaciones = [];

        conversaciones = result.rows.map(user => {

            let usuariosSchema = {
                "ID_Conversacion": user[0],
                "Admin": user[1],
                "Hijo_FK": user[2],
            }
            return usuariosSchema
        })

        res.json(conversaciones)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}