const jwt = require('jsonwebtoken');

//Middlewares para verificar token
let verificarToken = (req, res, next) => {
    let token = req.get('token'); //puedo usar authorization
    
    //Sacar la información del token
    jwt.verify(token, process.env.SEED, (err, decode) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no válido"
                }
            });
        }

        req.usuario = decode.usuario;
        next();
    });
};

//Middlewares para verificar admin role
let verificarAdminRole = (req, res, next) => {
    let usuario = req.usuario; //puedo usar authorization

    if(usuario.role === 'ADMIN_ROLE'){
        next();
    }else{
        return res.json({
            ok: false,
            err: {
                message: "El usuario no es administrador"
            }
        });
    }
};

module.exports = {
    verificarToken,
    verificarAdminRole
}