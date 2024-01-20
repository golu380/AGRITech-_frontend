const mongoose = require('mongoose');
const farmerProductReviewSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required : true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref : 'User'
    }
},{
    timestamps: true
})
const supplierSchema = mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    address:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    storage:{
        type:String,
        required:true
    },
    reviews:[farmerProductReviewSchema],
    longitude:{
        type:Number,
        required:false
    },
    latitude:{
        type:Number,
        required:false
    },
    image:{
        path:{
            type:String,
            required:true
        }
       
    },
    imgUrl:{
        type:String,
        required:false
    },
    isReviwed:{
        type:Boolean,
        required:true,
        default:false

    },
    rating:{
        type:Number,
        required:true,
        default: 0
    },
},{
    timestamps:true
})


const Supplier = mongoose.model('Supplier',supplierSchema);
module.exports = Supplier;