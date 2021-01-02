const BD = require('../../config/conexion');

exports.getPerfilesSanta = async (req, res) => {
    try {
        let santas = []

        let query = `SELECT * FROM SANTA`;
        let result = await BD.Open(query, [], false);

        santas = result.rows.map(santa => {
            let santaSchema = {
                "Usuario": santa[0],
                "Password": santa[1]
            }
            return santaSchema
        })

        res.json(santas)

    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.insertSanta = async (req, res) => {
    try {
        const { usuario, password } = req.body

        let sql = `INSERT INTO SANTA VALUES('${usuario}','${password}')`
        await BD.Open(sql, [], true)

        res.json({ "info": "Usuario Santa Creado" })
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}


exports.updateSanta = async (req, res) => {
    try {
        const { usuario, password } = req.body

        let sql = `UPDATE SANTA SET Pasword='${password}' WHERE Usuario = '${usuario}'`
        await BD.Open(sql, [], true)

        res.json({ "info": "Usuario Santa Modificado" })
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.deleteSanta = async (req, res) => {
    try {
        const { usuario } = req.body

        let sql = `DELETE FROM SANTA WHERE Usuario = '${usuario}'`
        await BD.Open(sql, [], true)

        res.json({ "info": "Usuario Santa Eliminado" })
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}