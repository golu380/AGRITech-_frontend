
const nodeGeocoder = require('node-geocoder');
const Supplier = require('../models/supplierProduct');


//@desc Create supplier product
//@rout Post /api/supplier
//@access private



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
         if(latAndLong){
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
         }else{
            const supplier = new Supplier({
               user:id,
               name,
               email,
               address,
               cropSelection,
               storage,
               // longitude:latAndLong.longitude,
               // latitude:latAndLong.latitude,
               image,
               phonenumber,
               description,
               imgUrl
            })
            try{
               const createdSupplierProduct =  await supplier.save();
               res.status(201).json(createdSupplierProduct);
            }catch(error){
               return next(error);
            }
         }
         
     }
   
    },

    //@ desc Get logged in user products
    //@ route Get /api/suplier/myproducts
    //@acess private

    async getMyProducts(req,res,next){

      try{
         console.log(req.user._id);
         const products = await Supplier.find({user: req.user._id});
         res.status(200).json(products);
      }catch(err){
         return next(err);
      }
     
    },

   //@desc Get all products
   //@route get /api/suplier
   //@acess public

   async getAllProductsForPublic(req,res,next){
      console.log(req);
      try{
         const products = await Supplier.find({}).populate('user','id name');
         console.log(products);
         res.status(200).json(products);
      }catch(err){
         return next(err);
      }
   },

   //@desc Get all Products
   //@route Get /api/supplier
   //@acess private/Admin

   async getProducts(req,res,next){
      try{
         const products = await Supplier.find({}).populate('user','id name');
         res.status(200).json(products);
      }catch(err){
         return next(err);
      }
   },

   //@desc fetch product by id
   //@route get /supplier/:id
   //@acess public
   async getFarmerProductById(req,res,next){
      try{
         const products = await Supplier.findById(req.params.id);
         if(products){
            res.status(200).json(products);

         }else{
            res.status(404).json({message:'Product not found'});
         }
      }catch(err){
         return next(err);
      }
   },

   //@desc Update products Revies
   //@route Post/supplier/product/:id/reviews
   //@acess private/Admin

   async createFarmerProductReview(req,res,next){
      const {rating, comment} = req.body;
      try{
         const product = await Supplier.findById(req.params.id);
         if(product){
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
            if(alreadyReviewed){
               res.status(400).json({message:'Product already reviewed'});

            }

            const review = {
               name: req.user.name,
               rating:Number(rating),
               comment,
               user:req.user._id
            }
            product.reviews.push(review);
            product.isReviwed = true;
            product.rating = product.reviews.reduce((acc,item)=> item.rating + acc, 0) /product.reviews.length;
            await product.save();
            res.status(201).json({message:'Review added'})

         }else{
            res.status(401).json({message:'Product not found'})
         }
      }catch(err){
         return next(err);
      }
   },

   //@desc update product reviewed
   //@route put  /supplier/product/:id/review
   //@acess private/Admin

   async updateProductReview(req,res,next){
      try{
         const product = await Supplier.findById(req.params.id)

         if (product) {
             product.isAdmin = req.body.isAdmin
     
             const updatedProduct = await product.save()
     
             res.json({
                 _id: updatedProduct._id,
                 isAdmin: updatedProduct.isAdmin,
             })
         } else {
             res.status(401).json({message:'product not found !'})
             
         }
      }catch(err){
         return next(err);
      }
   }

}

module.exports = SupplierController;