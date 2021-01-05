const BD = require('../../config/conexion');

exports.getProductos = async (req, res) => {
    try {
        let query = `SELECT * FROM JUGUETE`;
        let result = await BD.Open(query, [], false);
        let buenasAcciones = [];

        buenasAcciones = result.rows.map(buena => {
            let buenaSchema = {
                "ID_Juguete": buena[0],
                "Nombre": buena[1],
                "Categoria": buena[2],
                "Precio": buena[3],
                "Imagen": buena[4],
                "Edad": buena[5]
            }
            return buenaSchema
        })

        res.json(buenasAcciones)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.insertProducto = async (req, res) => {
    try {
        const { nombre, categoria, precio, imagen, edad } = req.body

        let query = `INSERT INTO JUGUETE VALUES(NULL,'${nombre}','${categoria}',${precio},${imagen},${edad})`;

        await BD.Open(query, [], true);

        res.json({ "info": "Juguete creado" })

    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.updateProducto = async (req,res)=>{
    try {
        const {id, nombre, categoria, precio, imagen, edad } = req.body
        let query = `UPDATE JUGUETE SET Nombre='${nombre}', Categoria='${categoria}', Precio=${precio}, Imagen=${imagen}, Edad=${edad} WHERE ID_Juguete = ${id}`
        await BD.Open(query, [], true);

        res.json({ "info": "Juguete Modificado" })
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.deleteProducto = async (req,res)=>{
    try {
        
        const {id} = req.params;
        let sql = `SELECT * FROM JUGUETE_CARTA WHERE Juguete_FK=${id}`;
        let result = await BD.Open(sql, [], false);
        let juguetes = [];

        juguetes = result.rows.map(juguete=>{
            jugueteSchema={
                Carta_FK:juguete[2],
                Total:juguete[4]
            }
            return jugueteSchema;
        })
        for(i=0;i<juguetes.length;i++){
            let carta = `UPDATE CARTA SET Precio_Total=(Precio_Total-${juguetes[i].Total}) WHERE ID_CARTA=${juguetes[i].Carta_FK}`
            await BD.Open(carta,[],true);
        }

        let query = `DELETE FROM JUGUETE WHERE ID_Juguete = ${id}`
        await BD.Open(query,[],true);

        res.json({"info":"Producto Eliminado"})
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({"info":"No se puede eliminar este producto ya que se encuentra en alguna lista de deseos"})
    }
}