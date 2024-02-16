const CustomErrorHandler = require('../services/CustomErrorHandler');
const JwtService = require('../services/JwtService');


const auth  = async (req,res,next) =>{
    let authHeader = req.headers.authorization
    if(!authHeader) {
        return next(CustomErrorHandler.unAuthrized('No Token in here'));

    }

    const token = authHeader.split(' ')[1]

    try{
        const {_id,name,email,isAdmin} = JwtService.verify(token)

        const user = {
            _id,
            name,
            email,
            isAdmin
        }
        req.user = user
        next()
    }catch(error){
        return next(CustomErrorHandler.unAuthrized('Something went wrong'))
    }
}

const admin = async (req, res, next) =>{
    let authHeader = req.headers.authorization
    if(!authHeader) {
        return next(CustomErrorHandler.unAuthrized('No Token in here'));

    }

    const token = authHeader.split(' ')[1]

    try{
        const {_id,name,email,isAdmin} = JwtService.verify(token)
        console.log(_id,name,email,isAdmin)

        const user = {
            _id,
            name,
            email,
            isAdmin
        }
       if(isAdmin){
        req.user = user
        next()
       }else{
        return next(CustomErrorHandler.unAuthrized('Not a Admin'))
       }
    }catch(error){
        return next(CustomErrorHandler.unAuthrized('Something went wrong'))
    }
}

module.exports = {auth,admin};