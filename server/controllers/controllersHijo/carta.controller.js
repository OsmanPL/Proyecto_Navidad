const BD = require('../../config/conexion');

exports.enviarCarta =async (req,res)=>{
    try {
        const {nickname, descripcion, total} = req.body

        let query = `SELECT * FROM HIJO WHERE Nickname='${nickname}'`;
        let result = await BD.Open(query, [], false);
        let usuarios = [];

        usuarios = result.rows.map(user =>{
            let usuariosSchema = {
                "Nickname": user[0],
                "Padre": user[7]
            }
            return usuariosSchema
        })

        let queryPadre =  `SELECT * FROM DIRECCION WHERE Padre_FK='${usuarios[0].Padre}'`;
        let resultPadre = await BD.Open(queryPadre, [], false);
        let padre = {};

        padre = resultPadre.rows.map(user =>{
            let padreSchema = {
                "ID_Direccion":user[0]
            }
            return padreSchema
        })

        let insertCarta = `INSERT INTO CARTA VALUES (NULL,'${usuarios[0].Nickname}','${usuarios[0].Padre}',${padre[0].ID_Direccion},'${descripcion}','Enviada',${total},default)`

        await BD.Open(insertCarta, [], true);

        res.json({"info":"Carta Registrada"});

    } catch (error) {

        console.log("Error al realizar la consulta => ",error)
        res.json({})

    }
}