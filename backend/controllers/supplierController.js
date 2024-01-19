

const SupplierController = {
    async createSupplierController (req,res,next){
       const {
        name,
        email,
        address,
        cropSelction,
        storage,
        image,
        phonenumber,
        description

       } = req.body;

     if(name & address == '')  {
        res.status(400)
        throw new Error('No Products Items')
     }else{
        let options = 
        provider:'openstreetmap'
     }
    }

}