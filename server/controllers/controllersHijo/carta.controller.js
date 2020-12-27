const BD = require('../../config/conexion');

exports.enviarCarta =async (req,res)=>{
    try {
        const {nickname, descripcion, total} = req.body

        let query = `SELECT * FROM HIJO WHERE Nickname='${nickname}'`;
        let result = await BD.Open(query, [], false);
        let usuarios = [];

        usuarios = result.rows.map(user =>{
            let usuariosSchema = {
                "Nickname": user[0],
                "Padre": user[7],
                "Bastones":user[6]
            }
            return usuariosSchema
        })

        let queryPadre =  `SELECT * FROM DIRECCION WHERE Padre_FK='${usuarios[0].Padre}'`;
        let resultPadre = await BD.Open(queryPadre, [], false);
        let padre = {};

        padre = resultPadre.rows.map(user =>{
            let padreSchema = {
                "ID_Direccion":user[0]
            }
            return padreSchema
        })

        let insertCarta = `INSERT INTO CARTA VALUES (NULL,'${usuarios[0].Nickname}','${usuarios[0].Padre}',${padre[0].ID_Direccion},'${descripcion}','Enviada',${total},default)`

        await BD.Open(insertCarta, [], true);

        usuarios[0].Bastones = usuarios[0].Bastones - total;

        let actualizarBastones = `UPDATE HIJO SET Cantidad_Bastones=${usuarios[0].Bastones} WHERE  Nickname='${nickname}'`

        await BD.Open(actualizarBastones, [], true);


        res.json({"info":"Carta Registrada"});

    } catch (error) {

        console.log("Error al realizar la consulta => ",error)
        res.json({})

    }
}

exports.verCartas = async (req,res) =>{
    try {
        const {nickname}=req.body
        let query = `SELECT * FROM CARTA WHERE Hijo_FK = '${nickname}'`;
        let result = await BD.Open(query, [], false);
        let usuarios = [];

        usuarios = result.rows.map(user =>{
            
            let usuariosSchema = {
                "ID_Carta": user[0],
                "Hijo_FK": user[1],
                "Padre_FK": user[2],
                "Direccion_FK":user[3],
                "Descripcion":user[4],
                "Estado":user[5],
                "PrecioTotal":user[6],
                "FechaEnvia":user[7],
                "ListaDeseos":[]
            }

            return usuariosSchema
        })



        for (i=0;i<usuarios.length;i++){
            let coment = `SELECT * FROM JUGUETE_CARTA WHERE Carta_FK=${usuarios[i].ID_Carta} ORDER BY ID_JugueteCarta DESC`;
            let resultComent = await  BD.Open(coment, [], false);
            let comentarios = [];

            comentarios = resultComent.rows.map(comentario=>{
                let comentarioSchema ={
                    "ID_JugueteCarta":comentario[0],
                    "Juguete_FK":comentario[1],
                    "Carta_FK":comentario[2],
                    "Cantidad":comentario[3],
                    "Total":comentario[4],
                    "Juguete":{}
                }
                return comentarioSchema
            })

            for (j=0;j<comentarios.length;j++){
                let juguete = `SELECT * FROM JUGUETE WHERE ID_Juguete = ${comentarios[j].Juguete_FK}`;
                let resultJuguete = await BD.Open(juguete,[],false);
                let juguetes = [];

                juguetes = resultJuguete.rows.map(jc=>{
                    let jugueteSchema = {
                        "Nombre":jc[1],
                        "Categoria":jc[2],
                        "Precio":jc[3],
                        "Imagen":jc[4],
                        "Edad":jc[5]
                    }
                    return jugueteSchema
                })

                comentarios[j].Juguete = juguetes
            }
            usuarios[i].ListaDeseos = comentarios
        }

        res.json(usuarios);
    } catch (error) {
        
        console.log("Error al realizar la consulta => ",error)
        res.json({})

    }
}