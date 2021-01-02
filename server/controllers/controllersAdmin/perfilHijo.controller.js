const BD = require('../../config/conexion');

exports.getPerfilHijo = async (req, res) => {
    try {
        let sqlHijo = `SELECT * FROM HIJO`;
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

        res.json(hijos)
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.insertHijo = async (req,res)=>{
    try {
        const {nickname,password,nombre,sexo,fecha,padre} = req.body;

        edad = calcularEdad(fecha)

        let sqlHijo = `INSERT INTO HIJO VALUES ('${nickname}', '${nombre}','${sexo}','${fecha}',${edad},'${password}', 0, '${padre}')`;

        await BD.Open(sqlHijo,[],true)

        let sqlConversacion = `INSERT INTO CONVERSACION (NULL,'Osman Perez', ${nickname})`
        await BD.Open(sqlConversacion,[],true)

        res.json({"info":"Hijo Creado"})
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.updateHijo = async (req,res)=>{
    try {
        const {nickname,password,nombre,sexo,fecha,bastones} = req.body;

        edad = calcularEdad(fecha)

        let sqlHijo = `UPDATE HIJO SET Nombre='${nombre}', Sexo='${sexo}', Fecha_Nacimiento='${fecha}',Edad=${edad},Pasword='${password}',Cantidad_Bastones=${bastones} WHERE  Nickname='${nickname}'`;

        await BD.Open(sqlHijo,[],true)

        res.json({"info":"Hijo Modificado"})

    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.deleteHijo = async (req,res)=>{
    try {
        const {nickname}=req.body;

        let sqlConversacion = `DELETE FROM CONVERSACION WHERE Hijo_FK='${nickname}'`
        await BD.Open(sqlConversacion,[],true);

        let sqlHijo = `DELETE FROM HIJO WHERE Nickname='${nickname}'`
        await BD.Open(sqlHijo,[],true);

        res.json({"info":"Hijo Eliminado"})
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}


function calcularEdad(fecha) {
    var fech = fecha.split("/");
    var hoy = new Date();
    var cumpleanos = new Date(fech[2],fech[1],fech[0]);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}