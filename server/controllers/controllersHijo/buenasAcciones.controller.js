const BD = require('../../config/conexion');

exports.getBuenasAcciones = async (req, res) => {
    try{
       const {edad} = req.body
        let query = `SELECT * FROM BUENA_ACCION WHERE Edad=${edad}`;
        let result = await BD.Open(query, [], false);
        let usuarios = [];

        usuarios = result.rows.map(user =>{
            let usuariosSchema = {
                "ID_BuenaAccion": user[0],
                "Titulo": user[1],
                "Descripcion": user[2],
                "Recompensa": user[3],
                "Edad":user[4]
            }

            return usuariosSchema
        })
        res.json(usuarios);
    }
    catch(error)
    {
        console.log("Error al realizar la consulta => ",error)
        res.json({})
    }
}


exports.realizarAccion = async (req, res) => {
    try{
        const {nickname, buenaAccion} = req.body
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

        let queryAccion = `SELECT * FROM BUENA_ACCION WHERE ID_BuenaAccion=${buenaAccion}`;
        let resultAccion = await BD.Open(queryAccion, [], false);
        let buenaAccionR = [];

        buenaAccionR = resultAccion.rows.map(user =>{
            let usuariosSchema = {
                "ID_BuenaAccion": user[0],
                "Recompensa": user[3]
            }
            return usuariosSchema
        })

        let sqlHijo = `INSERT INTO BUENA_ACCION_REALIZADA VALUES (NULL,${buenaAccionR[0].ID_BuenaAccion}, '${usuarios[0].Nickname}','${usuarios[0].Padre}','Realizada',${buenaAccionR[0].Recompensa})`

        await BD.Open(sqlHijo, [], true);


        res.json({"info":"Buena Accion Realizada"});
    }
    catch(error)
    {
        console.log("Error al realizar la consulta => ",error)
        res.json({})
    }
}