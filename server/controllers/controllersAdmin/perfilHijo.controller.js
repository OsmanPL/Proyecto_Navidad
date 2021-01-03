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

exports.insertHijo = async (req, res) => {
    try {
        const { nickname, password, nombre, sexo, fecha, padre } = req.body;

        edad = calcularEdad(fecha)

        let sqlHijo = `INSERT INTO HIJO VALUES ('${nickname}', '${nombre}','${sexo}','${fecha}',${edad},'${password}', 0, '${padre}')`;

        await BD.Open(sqlHijo, [], true)

        let sqlConversacion = `INSERT INTO CONVERSACION (NULL,'Osman Perez', ${nickname})`
        await BD.Open(sqlConversacion, [], true)

        res.json({ "info": "Hijo Creado" })
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.updateHijo = async (req, res) => {
    try {
        const { nickname, password, nombre, sexo, fecha, bastones } = req.body;

        edad = calcularEdad(fecha)

        let sqlHijo = `UPDATE HIJO SET Nombre='${nombre}', Sexo='${sexo}', Fecha_Nacimiento='${fecha}',Edad=${edad},Pasword='${password}',Cantidad_Bastones=${bastones} WHERE  Nickname='${nickname}'`;

        await BD.Open(sqlHijo, [], true)

        res.json({ "info": "Hijo Modificado" })

    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}

exports.deleteHijo = async (req, res) => {
    try {
        const { nickname } = req.body;

        let selectCartas = `SELECT * FROM CARTA WHERE  Hijo_FK='${nickname}'`
        let resultado2 = await BD.Open(selectCartas, [], false);
        let cartas = [];


        cartas = resultado2.rows.map(carta => {
            let cartaSchema = {
                ID_Carta: carta[0]
            }
            return cartaSchema
        })

        for (i = 0; i < cartas.length; i++) {
            let eliminarJugueteCarta = `DELETE FROM JUGUETE_CARTA WHERE CARTA_FK=${cartas[i].ID_Carta}`
            await BD.Open(eliminarJugueteCarta, [], true)
        }

        let eliminarCarta = `DELETE FROM CARTA WHERE Hijo_FK='${nickname}'`;
        await BD.Open(eliminarCarta, [], true);

        let selectConversaciones = `SELECT * FROM CONVERSACION WHERE HIJO_FK='${nickname}'`
        let resultado3 = await BD.Open(selectConversaciones, [], false);
        let conversaciones = [];

        conversaciones = resultado3.rows.map(conversacion => {
            let conversacionSchema = {
                ID_Conversacion: conversacion[0]
            }
            return conversacionSchema
        })

        for (j = 0; j < conversaciones.length; j++) {
            let eliminarMensajes = `DELETE FROM MENSAJE WHERE Conversacion_FK=${conversaciones[i].ID_Conversacion}`
            await BD.Open(eliminarMensajes, [], true)
        }
        let deleteConversaciones = `DELETE FROM CONVERSACION WHERE HIJO_FK='${nickname}'`
        await BD.Open(deleteConversaciones, [], true)

        let sqlHijo = `DELETE FROM HIJO WHERE Nickname='${nickname}'`
        await BD.Open(sqlHijo, [], true);

        res.json({ "info": "Hijo Eliminado" })
    } catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.json({})
    }
}


function calcularEdad(fecha) {
    var fech = fecha.split("/");
    var hoy = new Date();
    var cumpleanos = new Date(fech[2], fech[1], fech[0]);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}