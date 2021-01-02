const BD = require('../../config/conexion');

exports.getPadres = async (req,res) =>{
    try {
        let query1 = `SELECT * FROM PADRE`;
        let result1 = await BD.Open(query1, [], false);
        let padres = [];

        padres = result1.rows.map(santa =>{
            let santaSchema={
                "Correo":santa[0],
                "Password":santa[1],
                "Nombre":santa[2],
                "Telefono":santa[3],
                "Dinero":santa[4],
                "Direccion":[]
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
                    "Descripcion":direccionQ[3]
                }
                return direccionSchema
            })

            padres[i].Direccion = direccion
        }

        res.json(padres)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.insertPadre = async (req,res)=>{
    try {
        const {correo,password,nombre,telefono,dinero,departamento,municipio,descripcion} = req.body;

        let sqlPadre = `INSERT INTO PADRE VALUES('${correo}','${password}','${nombre}',${telefono},${dinero})`;
        await BD.Open(sqlPadre,[],true);

        let sqlDireccion =  `INSERT INTO DIRECCION VALUES(NULL, '${departamento}','${municipio}','${descripcion}','${correo}')`
        await BD.Open(sqlDireccion,[],true);

        res.json({"info":"Padre creado"})

    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.updatePadre = async (req,res)=>{
    try {
        const{correo,password,nombre,telefono,dinero,departamento,municipio,descripcion}=req.body

        let sqlPadre = `UPDATE PADRE SET Pasword='${password}',Nombre='${nombre}',Telefono=${telefono},Dinero=${dinero} WHERE Correo='${correo}'`;
        await BD.Open(sqlPadre,[],true);

        let sqlDireccion =  `UPDATE DIRECCION SET Departamento='${departamento}', Municipio='${municipio}', Descripcion='${descripcion}' WHERE Padre_FK='${correo}'`
        await BD.Open(sqlDireccion,[],true);

        res.json({"info":"Padre Modificado"})
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.deletePadre = async (req,res)=>{
    try {
        const{correo}=req.body;

        let sqlDireccion = `DELETE FROM DIRECCION WHERE Padre_FK='${correo}'`
        await BD.Open(sqlDireccion,[],true);

        let sqlPadre = `DELETE FROM PADRE WHERE Correo='${correo}'`
        await BD.Open(sqlPadre,[],true);

        res.json({"info":"Padre Eliminado"})
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}