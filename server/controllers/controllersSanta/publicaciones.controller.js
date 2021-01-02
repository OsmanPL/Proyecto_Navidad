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

exports.crearPublicacion=async(req,res)=>{
    try {
        const{publicacion,imagen,santa}=req.body

        let sqlPublicacion = `INSERT INTO PUBLICACION VALUES(NULL,'${publicacion}',${imagen},'${santa}')`
        await BD.Open(sqlPublicacion,[],true);

        res.json({"info":"Publicacion Creada"})
    } catch (error) {
        console.log("Error al realizar la consulta => ",error)
        res.json({})
    }
}

exports.editarPublicacion = async (req,res)=>{
    try {
        const{id,publicacion,imagen}=req.body
        let sqlPublicacion = `UPDATE PUBLICACION SET PUBLICACION='${publicacion}',IMAGEN=${imagen} WHERE ID_PUBLICACION=${id}`
        await BD.Open(sqlPublicacion,[],true);

        res.json({"info":"Publicacion Editada"})
    } catch (error) {
        console.log("Error al realizar la consulta => ",error)
        res.json({})
    }
}

exports.eliminarPublicacion = async (req,res)=>{
    try {
        const{id}=req.body
        let sqlComentario = `DELETE FROM COMENTARIO WHERE PUBLICACION_FK=${id}`
        await BD.Open(sqlComentario,[],true);
        let sqlPublicacion = `DELETE FROM PUBLICACION WHERE ID_PUBLICACION=${id}`
        await BD.Open(sqlPublicacion,[],true);

        res.json({"info":"Publicacion Eliminada"})
    } catch (error) {
        console.log("Error al realizar la consulta => ",error)
        res.json({})
    }
}