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
                email:user.email,
                isAdmin:user.isAdmin
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
       console.log(req);
       try{
        const user = await User.findById(req.user._id);
        
        if(user){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                // cropSelection:user.cropSelection,
                isAdmin:user.isAdmin,
            })
        }else{
            return next(CustomerErrorHandler.notExists('User does not found'));

        }
       }catch(err){
        return next(err);
       }


    },
    // @desc update user profile
    // @rout users/profile
    // @acess private

    async updateUserProfile(req, res,next){
        // console.log(req.body)
        // console.log(req.user);
       
            try{
                const user = await User.findById(req.user._id);
                console.log(user);
                if(user){
                    user.name = req.body.name || user.name
                    user.email = req.body.email || user.email
                //    console.log(req.body.password)
                    if(req.body.password){
                       const  hashedpass = await bcrypt.hash(req.body.password,Number(SALT))
                       console.log(hashedpass)
                       user.password = hashedpass;
                    }
                   
                    
                    
                }
                let access_token;
                try{
                    const updatedUser = await user.save();
                    access_token = JwtService.sign({
                        updatedUser
                    })
                }catch(err){
                    return next(err)
                }

                res.json({access_token, message:'profile updated succefully'});
               

            }catch(err){
                return next(err);
            }
    },

    //@desc get all usrs
    //@rout Get /
    //@access Private /admin
    async getUsers(req,res,next){
        try{
            const users = await User.find({});
            if(!users){
                res.status(404).json({message: 'no any user found'})
            }
            res.json(users);
        }catch(err){
           return next(err);
        }
    },

//@desc Get all users
//@rout Get /api/users/
//@acess Private/admin

    async deleteUser(req,res,next){
        console.log(req.params.id)
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            console.log(user);
            if(!user){
                res.status(401).json({message: 'User is not found'});
                
               
               
            }else{
                res.status(200).json({message: 'user removed successfully '});
            }
           
        
           
        }catch(err){
            return next(err);
        }
    },
    //@desc Get user by id
    //@route get /api/users/:id
    //@acess private/admin

    async getUserById(req,res,next){
        console.log(req.params.id);
        try{
            const user = await User.findById(req.params.id).select('-password')
            if(user){
                res.json(user);
            }else{
                res.status(401).json({message:'User not found'})
            }
        }catch(err){
            return next(err);
        }
    },

    //@ desc update user
    //@rout Put /api/users
    //@access private/admin

    async updateUser(req,res,next){
        try{
            const user = await User.findById(req.params.id);
            if(user){
                user.name = req.body.name || user.name
                user.email = req.body.email || user.email
                // user.cropSelection = req.body.cropSelection || user.cropSelection
                user.isAdmin = req.body.isAdmin

                updatedUser = await user.save();

                res.status(201).json({
             _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            // cropSelection: updatedUser.cropSelection,
                })
        
            }else{
                return next(CustomerErrorHandler.notExists);
            }
        }catch(err){
            return next(err);
        }
    }
    



    
}

module.exports = Authentication;