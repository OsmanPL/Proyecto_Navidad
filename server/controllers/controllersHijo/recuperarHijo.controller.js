const BD = require('../../config/conexion');

exports.getPerfilHijo = async (req, res) => {
    try {
        const {nickname}=req.params
        let sqlHijo = `SELECT * FROM HIJO WHERE NICKNAME='${nickname}'`;
        let resultHijo = await BD.Open(sqlHijo, [], false);
        let hijos = [];

        hijos = resultHijo.rows.map(hijo => {
            hijoSchema = {
                "Nickname": hijo[0],
                "Password": hijo[5],
                "Nombre": hijo[1],
                "Sexo": hijo[2],
                "Fecha_Nacimiento": hijo[3],
                "Edad": hijo[4],
                "Bastones": hijo[6],
                "Padre": hijo[7]
            }
            return hijoSchema
        })

        res.json(hijos[0])
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}