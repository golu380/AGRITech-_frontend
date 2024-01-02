const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config/config');

class JwtService {
    static sign(playload, expiry ='15d', secret = JWT_SECRET){
        return jwt.sign(playload, secret,{expiresIn:expiry})
    }
    static verify(token, secret = JWT_SECRET){
        return jwt.verify(token, secret)
    }
}

module.exports = JwtService;