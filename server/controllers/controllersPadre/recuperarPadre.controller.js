const BD = require('../../config/conexion');

exports.getPadre = async (req,res) =>{
    try {
        const {correo}=req.params;
        let query1 = `SELECT * FROM PADRE WHERE CORREO='${correo}'`;
        let result1 = await BD.Open(query1, [], false);
        let padres = [];

        padres = result1.rows.map(santa =>{
            let santaSchema={
                "Correo":santa[0],
                "Password":santa[1],
                "Nombre":santa[2],
                "Telefono":santa[3],
                "Dinero":santa[4],
                "Direccion":{}
            }
            return santaSchema
        })

        for(i=0;i<padres.length;i++){
            let sqlDireccion =  `SELECT * FROM DIRECCION WHERE Padre_FK='${padres[i].Correo}'`;
            let resultDireccion = await BD.Open(sqlDireccion,[],false);
            let direccion = [];

            direccion = resultDireccion.rows.map(direccionQ=>{
                let direccionSchema ={
                    "ID_Direccion":direccionQ[0],
                    "Departamento":direccionQ[1],
                    "Municipio":direccionQ[2],
                    "Descripcion":direccionQ[3],
                    "Latitud":direccionQ[4],
                    "Longitud":direccionQ[5]
                }
                return direccionSchema
            })

            padres[i].Direccion = direccion[0]
        }

        res.json(padres[0])
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}