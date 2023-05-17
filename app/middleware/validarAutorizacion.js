const jwt = require('jsonwebtoken');
const validarAutorizacion=(req, res, next)=>{
    const token= req.headers.authorization?.split(' ').pop();
    if(!token){
        res.status(409)
        res.send({error: 'sin autorizacion'})
    }else{
        jwt.verify(token, process.env.SECRET_JWT, (error, decoded) => {
            if (error) {
              console.error('Error al verificar el token:', error);
              res.status(409)
              res.send({error: 'sin autorizacion'})
            }
            console.log('Token verificado. Decodificado:', decoded);
            next()
          });
    }



}
module.exports={ 
    validarAutorizacion
}