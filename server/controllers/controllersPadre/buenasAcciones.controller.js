const BD = require('../../config/conexion');
const { deleteBuenaAccion } = require('../controllersAdmin/buenasAcciones.controller');

exports.getBuenasAcciones = async (req, res) => {
    try {
        const { correo, nickname } = req.params
        let sql = `SELECT * FROM BUENA_ACCION_REALIZADA WHERE PADRE_FK='${correo}' AND ESTADO='Realizada' AND HIJO_FK='${nickname}'`;
        let resultados = await BD.Open(sql, [], false);
        let bar = [];

        bar = resultados.rows.map(buena => {
            let schemaBar = {
                "ID_BuenaAccion_Realizada": buena[0],
                "ID_BuenaAccion": buena[1],
                "Titulo": "",
                "Descripcion": "",
                "Hijo": buena[2],
                "Padre": buena[3],
                "Estado": buena[4],
                "Recompensa": buena[5]
            }
            return schemaBar
        })

        for (i = 0; i < bar.length; i++) {
            let query = `SELECT * FROM BUENA_ACCION WHERE ID_BuenaAccion=${bar[i].ID_BuenaAccion}`;
            let result = await BD.Open(query, [], false);

            result.rows.map(ba => {
                bar[i].Titulo = ba[1],
                    bar[i].Descripcion = ba[2]
            })
        }

        res.json(bar)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.confirmar = async (req, res) => {
    try {
        const {id,nickname, cantidad,correo}=req.body
        let sql  =`UPDATE BUENA_ACCION_REALIZADA SET ESTADO='Confirmada' WHERE ID_Realizada=${id}`;
        await BD.Open(sql,[],true);
            let query = `UPDATE HIJO SET Cantidad_Bastones=(Cantidad_Bastones+${cantidad}) WHERE NICKNAME='${nickname}'`;
            await BD.Open(query,[],true);
            let sqlPadre = `UPDATE PADRE SET DINERO=(DINERO-${cantidad}) WHERE CORREO='${correo}'`
            await BD.Open(sqlPadre,[],true)

        res.json({"info":"Buena Accion Confrimada"})
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.deleteBuenaAccion=async(req,res)=>{
    try {
        const {id}=req.params;
        let sql =`DELETE FROM BUENA_ACCION_REALIZADA  WHERE ID_Realizada=${id}`
        await BD.Open(sql,[],true);
        res.json({"info":"Buena Accion Rechazada"})
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}