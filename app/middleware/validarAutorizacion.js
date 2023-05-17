const validarAutorizacion=(req, res, next)=>{
    const token= req.headers.authorization?.split(' ').pop();
    if(!token){
        res.status(409)
        res.send({error: 'sin autorizacion'})
    }else{
        next()
    }
}
module.exports={ 
    validarAutorizacion
}