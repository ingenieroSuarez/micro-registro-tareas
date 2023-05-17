const { listarTareas,
        actualizarTarea,
        eliminaTarea,
        crearTarea
    } = require('../../almacenamiento/mysql')

class tareasController{
    async listarTareas(usuarioId){
        return await listarTareas(usuarioId);
    }
    async crearTarea(usuarioId, descripcion){
        let tarea={
            finalizada: false,
            descripcion: descripcion,
            usuarioId: usuarioId
        };
        return await crearTarea(tarea)
    }

    async actualizarTarea(idtarea, descripcion, finalizada){
        const tareaActualizada={
            idtareas: idtarea,
            descripcion: descripcion,
            finalizada: finalizada
        };
        return await actualizarTarea(tareaActualizada);
    }
    async eliminaTarea(idtarea){
        return await eliminaTarea(idtarea);
    }
}

module.exports={
    tareasController
}