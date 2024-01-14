const User = require('../models/user')
const Joi = require('joi');
const bcrypt = require('bcrypt')
const SALT = require('../config/config')
const JwtService  = require('../services/JwtService')
const CustomerErrorHandler = require('../services/CustomErrorHandler')

const Authentication = {

    async register(req,res,next){
        //validation

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email : Joi.string().email().required(),
            mobile: Joi.required(),
            password: Joi.string()
                        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                        .required(),
            confirm_password: Joi.ref('password')
        })

        const {error} = registerSchema.validate(req.body);
        if(error){
            return next(error);
        }
        try{
            const exists = await User.exists({email: req.body.email})
            if(exists){
                
             
                res.status(410).json({error:"This email already exists"})
                return next(
                    CustomerErrorHandler.aleradyExists('This email already exists').message
                )
            }
            
        }catch(err){
            return next(err);
        }
        //Hash Password

        const {name,email,password,mobile} = req.body

        const hashedPass = await bcrypt.hash(password,Number(SALT))
        const user = new User({
            name,
            email,
            mobile,
            password:hashedPass
        })

        let access_token
        try{
            const result = await user.save()
            access_token = JwtService.sign({
                result
            })
        }catch(err){
            return next(err);
        }
        res.json({access_token})

    },

    async login (req,res,next){
        const loginSchema = Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        })

        const {email,password} = req.body
        console.log(req.body)
        const {error} = loginSchema.validate(req.body)
        if(error){
            return next(error);

        }

        try{
            const user = await User.findOne({
                email
            })
            if(!user){
                
               
                // next();
                return next(CustomerErrorHandler.notExists("User Doesn't Exists, Please Sign Up"))
            }
            //Compare password

            const match = await bcrypt.compare(password,user.password)
            if(!match){
                
                
                return next(CustomerErrorHandler.wrongPassword("Invalid password"))
            }
            const access_token = JwtService.sign({
                _id:user._id,
                name:user.name,
                email:user.email
            })
            res.cookie('usercookie',access_token ,{
                expires: new Date(Date.now() + 9000000),
                httpOnly: true
            })

            res.status(201).json({user,access_token})
        }catch(err){
        return next(err);
        }
    },
    async getUserProfile(req,res,next){
       


    }

    
}

module.exports = Authentication;