const mongoose = require('mongoose');

mongoose.set('strictPopulate',false);

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required :true,

    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User;