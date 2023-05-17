const express = require('express');
const router = express.Router();

router.use('/tareas', require('./tareas'));

module.exports= router