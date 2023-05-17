const express = require('express')
const router = express.Router();
const {tareasController}= require('../../controllers/tareas/tareas.controller')
const {validarAutorizacion}= require('../../middleware/validarAutorizacion')

router.get('/',validarAutorizacion, async (req, res)=>{
    const {usuarioId }=  req.body;
    const respuesta= new tareasController()
    try {
        res.send(await respuesta.listarTareas(usuarioId))
    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
})

router.post('/', validarAutorizacion, async (req, res)=>{
    const {usuarioId, descripcion }=  req.body;
    const respuesta= new tareasController()
    try {
        res.send(await respuesta.crearTarea(usuarioId, descripcion))
    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
})

router.put('/', validarAutorizacion, async (req, res)=>{
    const { idtarea, descripcion, finalizada }=  req.body;
    const respuesta= new tareasController()
    try {
        res.send(await respuesta.actualizarTarea(idtarea, descripcion, finalizada))
    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
})

router.delete('/', validarAutorizacion, async (req, res)=>{
    const { idtarea }=  req.body;
    const respuesta= new tareasController()
    try {
        res.send(await respuesta.eliminaTarea(idtarea));
    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
})

module.exports= router