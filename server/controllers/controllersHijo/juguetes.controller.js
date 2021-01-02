const BD = require('../../config/conexion');

exports.getJuguetes = async (req, res) => {
    try {
        const { categoria, edad, dinero } = req.body;
        let usuarios = [];
        if (categoria == 'todo') {
            let query = `SELECT * FROM JUGUETE WHERE Edad=${edad} AND Precio<=${dinero}`;
            let result = await BD.Open(query, [], false);

            usuarios = result.rows.map(user => {
                let usuariosSchema = {
                    "ID_Juguete": user[0],
                    "Nombre": user[1],
                    "Categoria": user[2],
                    "Precio": user[3],
                    "Imagen": user[4],
                    "Edad": user[5]
                }
                return usuariosSchema
            })
        } else {
            let query = `SELECT * FROM JUGUETE WHERE Categoria='${categoria}' AND Edad=${edad} AND Precio<=${dinero}`;
            let result = await BD.Open(query, [], false);

            usuarios = result.rows.map(user => {
                let usuariosSchema = {
                    "ID_Juguete": user[0],
                    "Nombre": user[1],
                    "Categoria": user[2],
                    "Precio": user[3],
                    "Imagen": user[4],
                    "Edad": user[5]
                }
                return usuariosSchema
            })
        }

        res.json(usuarios)

    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}