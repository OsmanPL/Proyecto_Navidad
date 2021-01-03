const BD = require('../../config/conexion');

exports.getPublicaciones = async (req, res) => {
    try{
        let query = `SELECT * FROM PUBLICACION ORDER BY ID_Publicacion DESC`;
        let result = await BD.Open(query, [], false);
        let usuarios = [];

        usuarios = result.rows.map(user =>{
            
            let usuariosSchema = {
                "ID_Publicacion": user[0],
                "Publicacion": user[1],
                "Imagen": user[2],
                "Santa":user[3],
                "Comentarios":[]
            }

            return usuariosSchema
        })

        for (i=0;i<usuarios.length;i++){
            let coment = `SELECT * FROM COMENTARIO WHERE Publicacion_FK=${usuarios[i].ID_Publicacion} ORDER BY ID_Comentario ASC`;
            let resultComent = await  BD.Open(coment, [], false);
            let comentarios = [];

            comentarios = resultComent.rows.map(comentario=>{
                let comentarioSchema ={
                    "ID_Comentario":comentario[0],
                    "Hijo_FK":comentario[1],
                    "Comentario":comentario[2],
                    "Publicacion_FK":comentario[3]
                }
                return comentarioSchema
            })
            usuarios[i].Comentarios = comentarios
        }

        res.json(usuarios);
    }
    catch(error)
    {
        console.log("Error al realizar la consulta => ",error)
        res.json({})
    }
}

exports.comentar = async (req,res)=>{
    try {
        const {publicacion, nickname, comentario} = req.body
        let query = `INSERT INTO COMENTARIO VALUES(NULL, '${nickname}', '${comentario}',${publicacion})`;
        await BD.Open(query,[],true);
        res.json({"info":"Ha realizado un comentario"});
    } catch (error) {
        console.log("Error al realizar la consulta => ",error)
        res.json({})
    }
}