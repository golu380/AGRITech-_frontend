const productLendMachineModel = require('../models/productLendMachineModel');
const CustomerErrorHandler = require('../services/CustomErrorHandler')

const MachineController ={

    // @desc fetch all lending machines
    // @ route  Get /lendMachines
    // @access public

    async getLendMachines(req,res,next){
        try{
            const productLendMachine = await productLendMachineModel.find({})
            if(!productLendMachine){
                return next(CustomerErrorHandler.notFound("No any product found"))
            }
            res.status(201).json(productLendMachine);
        }catch(err){
            return next(err);
        }

    },

    // @desc fetch machine by id
    // @rout get /lendMachine/:id
    // @access public

    async getLendMachinesById(req,res,next){
        console.log(req.params.id);
        try{
            const productLendMachine = await productLendMachineModel.findById(req.params.id)
            if(!productLendMachine){
                return next(CustomerErrorHandler.notFound("no product found for this id !"))
            }
            res.status(201).json(productLendMachine)
        }catch(err){
            return next(err)
        }
    },
    // @desc fetch machine by id
    // @rout GET /lendMachines/:id
    // @aceess private/admin

    async deleteLendMachine(req,res,next){
        console.log(req.params.id);
        try{
            const lendMachine = await productLendMachineModel.findById(req.params.id)
            if(!lendMachine){
                return next(CustomerErrorHandler.notFound("no product found for this id !"))
            }
            lendMachine.remove();
            res.json({message: 'Machine Removed successfully'})
        }catch(err){
            return next(err)
        }
    },

    // @desc create lend machine
    // @ Post/lendMachine
    // @ private/admin

    async createLendMachine(req,res,next){
        const lendMachine = new productLendMachineModel({
            name: 'sample machine',
            user: req.user._id,
            image: '/images/farmMachine.jpg',
            description: 'sample description',
            target_plant: 'sample category',
            price: 0,
            quantity: 0,
            machine_power: '0HP',
        })
        try{
            const createdLendMachine = await lendMachine.save();
            res.status(201).json(createdLendMachine);
        }catch(err){
            return next(err);
        }
    },

    // @desc Update Lend Machine
    // @rout Put /lendMachine/:id
    // @acess private /Admin

    async updateLendMachine(req,res,next){
        const { name, price, image, description, target_plant, quantity, machine_power} = req.body;
        try{
            const updateLendMachine = await productLendMachineModel.findById(req.params.id)
            if(!updateLendMachine){
                return next(CustomerErrorHandler.notFound("product is not found by this id"))
            }
        updateLendMachine.name = name
        updateLendMachine.price = price
        updateLendMachine.image = image
        updateLendMachine.description = description
        updateLendMachine.target_plant = target_plant
        updateLendMachine.quantity = quantity
        updateLendMachine.machine_power = machine_power
        const updatedMachine = await updateLendMachine.save()
        res.status(201).json(updatedMachine)

        }catch(err){
            return next(err);
        }
    }
}

module.exports = MachineController;