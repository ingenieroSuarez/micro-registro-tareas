
const mysql = require('mysql');

const dbconf = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

let connection;
function handleCon() {
    connection = mysql.createConnection(dbconf);
    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}
handleCon();


function listarTareas(usuarioId) {
    return new Promise( (resolve, reject) => {
        let respuesta=[]
        connection.query(`SELECT * FROM tareas where usuarioId=${usuarioId}`, (err, data) => {
            if (err) return reject(err);
            if(data.length>0){
                respuesta=data.map(({idtareas, finalizada, descripcion, usuarioId})=>({idtareas, finalizada, descripcion, usuarioId }))
            }
            resolve(respuesta);
        })
    })
}

function crearTarea(tarea) {
    return new Promise( (resolve, reject) => {
        connection.query(`INSERT INTO tareas SET ?`, tarea, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function eliminaTarea(idtareas) {
    return new Promise( (resolve, reject) => {
        connection.query(`DELETE FROM tareas WHERE idtareas = ?`,idtareas, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function actualizarTarea(tareaActualizada) {
    console.log("actualizarTarea=>");
    return new Promise( (resolve, reject) => {
        connection.query(`UPDATE tareas SET ? WHERE idtareas = ?`,[tareaActualizada, tareaActualizada.idtareas], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}


module.exports = {
    listarTareas,
    actualizarTarea,
    eliminaTarea,
    crearTarea
};

