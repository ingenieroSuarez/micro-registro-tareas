const express = require('express')
const router = express.Router();
const {tareasController}= require('../../controllers/tareas/tareas.controller')

router.get('/', async (req, res)=>{
    const {usuarioId }=  req.body;
    const respuesta= new tareasController()
    try {
        res.send(await respuesta.listarTareas(usuarioId))
    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
})

router.post('/', async (req, res)=>{
    const {usuarioId, descripcion }=  req.body;
    const respuesta= new tareasController()
    try {
        res.send(await respuesta.crearTarea(usuarioId, descripcion))
    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
})

router.put('/', async (req, res)=>{
    const { idtarea, descripcion, finalizada }=  req.body;
    const respuesta= new tareasController()
    try {
        res.send(await respuesta.actualizarTarea(idtarea, descripcion, finalizada))
    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
})

router.delete('/', async (req, res)=>{
    const { idtarea }=  req.body;
    const respuesta= new tareasController()
    try {
        res.send(await respuesta.eliminaTarea(idtarea));
    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
})

module.exports= router