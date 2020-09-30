const jwt = require('jsonwebtoken');

//Middlewares para verificar token
let verificarToken = (req, res, next) => {
    let token = req.get('token'); //puedo usar authorization
    
    //Sacar la información del token
    jwt.verify(token, process.env.SEED, (err, decode) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decode.usuario;
        next();
    });

    
};

module.exports = {
    verificarToken
}