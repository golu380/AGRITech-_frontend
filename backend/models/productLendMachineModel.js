const mongoose = require('mongoose');

const machineReviewSchema = mongoose.Schema({
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
    required:true
   }
},{
    timestamp: true
})

const productLendMachineSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        required: true,
        ref : 'User'
    },
    name:{
        type:String,
        required: true,

    },
    description:{
        type:String,
        required: true,
    },
    target_plant: {
        type:String,
        required: true
    },
    reviews:[machineReviewSchema],
    rating:{
        type:Number,
        required: true,
        default : 0
    },
    machine_power:{
        type: String,
        required: true,
        default : 0
    },
    price:{
        type:Number,
        required: true,
        default: 0
    },
    quantity:{
        type:Number,
        required: true,
        default : 0
    }
})

const farmer_lend_machines = mongoose.model('farmer_lend_machines',productLendMachineSchema)

module.exports = farmer_lend_machines;