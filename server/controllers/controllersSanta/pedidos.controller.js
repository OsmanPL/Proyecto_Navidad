const BD = require('../../config/conexion');

exports.pedido = async(req,res)=>{
    try {
        const{id}=req.body
        let sql = `UPDATE CARTA SET ESTADO='Entregada' WHERE ID_CARTA=${id}`
        await BD.Open(sql,[],true);

        res.json({"info":"Carta Entregada"})
    } catch (error) {
        console.log("Error al realizar la consulta => ",error)
        res.json({})
    }
}

exports.getCartas = async (req,res)=>{
    try {
        let query = `SELECT * FROM CARTA WHERE Estado='Confirmada' OR Estado='Entregada'`;
        let result = await BD.Open(query, [], false);
        let usuarios = [];

        usuarios = result.rows.map(user => {

            let usuariosSchema = {
                "ID_Carta": user[0],
                "Hijo_FK": user[1],
                "Padre_FK": user[2],
                "Direccion_FK": user[3],
                "Descripcion": user[4],
                "Estado": user[5],
                "PrecioTotal": user[6],
                "FechaEnvia": user[7],
                "ListaDeseos": []
            }

            return usuariosSchema
        })



        for (i = 0; i < usuarios.length; i++) {
            let coment = `SELECT * FROM JUGUETE_CARTA WHERE Carta_FK=${usuarios[i].ID_Carta} ORDER BY ID_JugueteCarta DESC`;
            let resultComent = await BD.Open(coment, [], false);
            let comentarios = [];

            comentarios = resultComent.rows.map(comentario => {
                let comentarioSchema = {
                    "ID_JugueteCarta": comentario[0],
                    "Juguete_FK": comentario[1],
                    "Carta_FK": comentario[2],
                    "Cantidad": comentario[3],
                    "Total": comentario[4],
                    "Juguete": {}
                }
                return comentarioSchema
            })

            for (j = 0; j < comentarios.length; j++) {
                let juguete = `SELECT * FROM JUGUETE WHERE ID_Juguete = ${comentarios[j].Juguete_FK}`;
                let resultJuguete = await BD.Open(juguete, [], false);
                let juguetes = [];

                juguetes = resultJuguete.rows.map(jc => {
                    let jugueteSchema = {
                        "Id_JC":jc[0],
                        "Nombre": jc[1],
                        "Categoria": jc[2],
                        "Precio": jc[3],
                        "Imagen": jc[4],
                        "Edad": jc[5]
                    }
                    return jugueteSchema
                })

                comentarios[j].Juguete = juguetes
            }
            usuarios[i].ListaDeseos = comentarios
        }

        res.json(usuarios);
    } catch (error) {

        console.log("Error al realizar la consulta => ", error)
        res.json({})

    }
}