const BD = require('../../config/conexion');

exports.agregarDeseo = async (req, res) => {
    try {
        const { juguete, carta, cantidad, total } = req.body

        let sqlDeseo = `INSERT INTO JUGUETE_CARTA VALUES (NULL,${juguete},${carta}, ${cantidad},${total})`;

        await BD.Open(sqlDeseo,[],true);

        res.json({"info":"Juguete Agregado"});
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})

    }
}