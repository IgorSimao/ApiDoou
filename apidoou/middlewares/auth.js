const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {
    verificaToken: function(req, res, next) {
        const authHeader = req.headers.authorization;
    
        if(!authHeader){
            return res.status(401).json({"error": 'Token não informado!'});
        }
    
        const parts = authHeader.split(' ');
        if(!parts.length === 2 ){
            return res.status(401).json({"error": 'Token errado!'});
        }
    
        const [scheme, token] = parts;
    
        if(!/^Bearer$/.test(scheme)){
            return res.status(401).json({"error": 'Token mal formatado!'});
        }
    
        jwt.verify(token, authConfig.secret, (err, decoded)=> {
            if(err) return res.status(401).json({"error": 'Token inválido!'});
    
            req.userId = decoded.id;
            return next();
        })

    }
}