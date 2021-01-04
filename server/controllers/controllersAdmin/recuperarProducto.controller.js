const BD = require('../../config/conexion');

exports.getProductos = async (req, res) => {
    try {
        const {nombre}=req.params
        let query = `SELECT * FROM JUGUETE WHERE Nombre='${nombre}'`;
        let result = await BD.Open(query, [], false);
        let buenasAcciones = [];

        buenasAcciones = result.rows.map(buena => {
            let buenaSchema = {
                "ID_Juguete": buena[0]
            }
            return buenaSchema
        })

        res.json(buenasAcciones[0])
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}