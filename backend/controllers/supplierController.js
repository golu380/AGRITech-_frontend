
const nodeGeocoder = require('node-geocoder');
const Supplier = require('../models/supplierProduct');
const multer = require('multer');


const SupplierController = {
    async createSupplierController (req,res,next){
      console.log(req.body);
       const {
        name,
        email,
        address,
        cropSelection,
        storage,
        image,
        phonenumber,
        description,
        imgUrl,
        id
        

       } = req.body;
       console.log(name,email,address,cropSelection,image,phonenumber,imgUrl)

     if(name & address == '')  {
        res.status(400)
        throw new Error('No Products Items')
     }else{
         let options = {
            provider:'openstreetmap'
         }
         let geoCoder = nodeGeocoder(options)
         const getCordinates = geoCoder.geocode(address).then(
            response =>{
               return response[0];
            }
         ).catch((err)=>{
            console.log(err);
         });
         const latAndLong = await getCordinates;
         console.log(latAndLong);
       
         const supplier = new Supplier({
            user:id,
            name,
            email,
            address,
            cropSelection,
            storage,
            longitude:latAndLong.longitude,
            latitude:latAndLong.latitude,
            image,
            phonenumber,
            description,
            imgUrl
         })
         console.log(supplier)
         try{
            const createdSupplierProduct =  await supplier.save();
            res.status(201).json(createdSupplierProduct);
         }catch(error){
            return next(error);
         }
     }
   
    }

}

module.exports = SupplierController;