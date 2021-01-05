const BD = require('../../config/conexion');

exports.getBuenasAcciones = async (req, res) => {
    try {
        let query = `SELECT * FROM BUENA_ACCION`;
        let result = await BD.Open(query, [], false);
        let buenasAcciones = [];

        buenasAcciones = result.rows.map(buena => {
            let buenaSchema = {
                "ID_BuenaAccion": buena[0],
                "Titulo": buena[1],
                "Descripcion": buena[2],
                "Recompensa": buena[3],
                "Edad": buena[4]
            }
            return buenaSchema
        })

        res.json(buenasAcciones)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.insertBuenaAccion = async (req, res) => {
    try {
        const { titulo, descripcion, recompensa, edad } = req.body;

        let sql = `INSERT INTO BUENA_ACCION VALUES(NULL,'${titulo}','${descripcion}',${recompensa},${edad})`;

        await BD.Open(sql, [], true);

        res.json({ "info": "Buena Accion Creada" })
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.updateBuenaAccion = async (req, res) => {
    try {
        const { id, titulo, descripcion, recompensa, edad } = req.body;

        let sql = `UPDATE BUENA_ACCION SET Titulo='${titulo}',Descripcion='${descripcion}',Recompensa=${recompensa},Edad=${edad} WHERE ID_BuenaAccion = ${id}`

        await BD.Open(sql, [], true);

        res.json({ "info": "Buena Accion Actualizada" })
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.deleteBuenaAccion = async (req, res) => {
    try {
        const { id } = req.params;

        let sql = `DELETE FROM BUENA_ACCION WHERE ID_BuenaAccion = ${id}`

        await BD.Open(sql, [], true);

        res.json({ "info": "Buena Accion Eliminada" })
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}