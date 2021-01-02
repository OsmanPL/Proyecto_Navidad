const BD = require('../config/conexion');

exports.iniciarSesion = async (req, res) => {
    try{
        
        const user= req.param('user');
        const password =req.param('password');
        let queryAdmin = `SELECT * FROM ADMIN WHERE Usuario='${user}' AND Pasword='${password}'`
        let result = await BD.Open(queryAdmin, [], false);
        let admin = {};
        let auth = false;
        let tipo = "";

        admin = result.rows.map(user =>{
            let usuariosSchema = {
                "Usuario": user[0],
                "Password": user[1]
            }

            return usuariosSchema
        })

        let querySanta = `SELECT * FROM SANTA WHERE Usuario='${user}' AND Pasword='${password}'`
        let resultSanta = await BD.Open(querySanta, [], false);
        let santa = {};

        santa = resultSanta.rows.map(user =>{
            let usuariosSchema = {
                "Usuario": user[0],
                "Password": user[1]
            }

            return usuariosSchema
        })

        let queryPadre = `SELECT * FROM PADRE WHERE Correo='${user}' AND Pasword='${password}'`
        let resultPadre = await BD.Open(queryPadre, [], false);
        let padre = {};

        padre = resultPadre.rows.map(user =>{
            let usuariosSchema = {
                "Correo": user[0],
                "Password": user[1]
            }

            return usuariosSchema
        })

        let queryHijo = `SELECT * FROM HIJO WHERE Nickname='${user}' AND Pasword='${password}'`
        let resultHijo = await BD.Open(queryHijo, [], false);
        let hijo = {};

        hijo = resultHijo.rows.map(user =>{
            let usuariosSchema = {
                "Nickname": user[0],
                "Password": user[5]
            }

            return usuariosSchema
        })

        if (admin[0] != undefined){
            auth = true,
            tipo = "Administrador"
        }else if (santa[0] != undefined){
            auth = true,
            tipo = "Santa"
        }else if (padre[0] != undefined){
            auth = true,
            tipo = "Padre"
        }else if (hijo[0] != undefined){
            auth = true,
            tipo = "Hijo"
        }else{
            auth = false,
            tipo = "No Existe"
        }
        autenticado = {"auth":auth,"tipo":tipo,"user":user}
        res.json(autenticado);
    }
    catch(error)
    {
        console.log("Error al realizar la consulta => ",error)
        res.json({})
    }
}

exports.registrarse = async(req,res) => {
    try{
        const { correo, password,  nombre_padre, nombre_hijo, nickname_hijo, sexo_hijo, fecha_nac_hijo, departamento, municipio, descripcion, telefono, dinero} = req.body

        console.log(req.body)
        edad = calcularEdad(fecha_nac_hijo)

        let sqlPadre = `INSERT INTO PADRE VALUES ('${correo}', '${password}','${nombre_padre}',${telefono}, ${dinero})`
        let sqlDireccion = `INSERT INTO DIRECCION VALUES (null, '${departamento}','${municipio}','${descripcion}', '${correo}')`
        let sqlHijo = `INSERT INTO HIJO VALUES ('${nickname_hijo}', '${nombre_hijo}','${sexo_hijo}','${fecha_nac_hijo}',${edad},'${password}', 0, '${correo}')`
        let sqlConversacion = `INSERT INTO CONVERSACION VALUES (NULL, 'Osman Perez','${nickname_hijo}')`

        await BD.Open(sqlPadre, [], true);
        await BD.Open(sqlHijo, [], true);
        await BD.Open(sqlDireccion, [], true);
        await BD.Open(sqlConversacion, [],true);

        res.json({"Info": "Usuario creado exitosamente"})
    }
    catch(error){
        res.json({"Info": "Usuario no creado"})
        console.log("Error al crear el Usuario => ",error)
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