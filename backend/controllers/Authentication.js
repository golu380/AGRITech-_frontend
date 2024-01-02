const User = require('../models/user')

const Authentication = {

    async register(req,res,next){
        const {name,email,password,mobile} = req.body;
        console.log(req.body);
        try{
            const newData = new User(req.body);
            await newData.save();
            res.json({message:"Data saved successfully"})
        }catch(error){
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    
}

module.exports = Authentication;