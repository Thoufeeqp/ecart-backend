const products=require('../models/productschema')
const wishlists=require('../models/wishlistschema')
const carts=require('../models/cartschema')

exports.getallproduct=async(req,res)=>{
    try{
  const allproducts=await products.find()
  res.status(200).json(allproducts)
    }
    catch(error){
        res.status(401).json(error)
    }
}
exports.view=async(req,res)=>{
 let {id}=req.params
 try{
 const product=await products.findOne({id})
 res.status(200).json(product)
 }
 catch(error){
  res.status(404).json("product not available")
 }
}

///////
exports.addwish=async(req,res)=>{
let {id,title,price,image}=req.body

try{
const wish =await wishlists.findOne({id})

if(wish){
  res.status(406).json("product already exist in wishlist")
}
else{
  const newproduct=new wishlists({
    id,title,price,image
  })
 await newproduct.save()
  res.status(200).json(newproduct)
}
}
catch(error){
  res.status(400).json(error)
}
 
}
exports.getwish=async(req,res)=>{
  try{
   const list= await wishlists.find()
   res.status(200).json(list)
  }
  catch(error){
    res.status(400).json(error)
  }
}
exports.removewish=async(req,res)=>{
 const {id}=req.params
 console.log(id);
 
 try{
  wishlists.deleteOne({id}).then((result) => {
    console.log(result);
});
     
      const list=await wishlists.find()
      res.status(201).json(list)
    }
    
  
 
 catch(error){
  res.status(400).json(error)
 }

}
exports.addcart=async(req,res)=>{
  const{id,title,price,image,quantity}=req.body
  try{
   const item= await carts.findOne({id})
   if(item){
    item.quantity+=1
    item.total=item.quantity*item.price
    await item.save()
    res.status(200).json("product added successfully")
   }
   else{
    
      const newitem=new carts({
        id,title,price,image,quantity,total:price*quantity
      })
      await newitem.save()
      res.status(200).json("added successfully to cart")
    
    
   }
  }
  catch(error){
    console.log(error);
    
  }
}

exports.getcart=async(req,res)=>{
  try{
    const sanam=await carts.find()
    res.status(200).json(sanam)
  }
  catch(error){
    res.status(400).json(error)
  }
}
exports.cartitemdelete=async(req,res)=>{
  const {id}=req.params
  await carts.deleteOne({id})
  const remain=await carts.find()
  res.status(200).json(remain)
}
exports.increment=async(req,res)=>{
  const {id}=req.params
  try{
 const item=await carts.findOne({id})
 item.quantity+=1
 item.total=item.quantity*item.price
 await item.save()
 const allitems=await carts.find()
 res.status(200).json(allitems)
  }
  catch(error){
    console.log(error);
  }
}
exports.decrement=async(req,res)=>{
  const {id}=req.params
  try{
 const item=await carts.findOne({id})
 item.quantity-=1
 if(item.quantity==0){
  await carts.deleteOne({id})
  const all=await carts.find()
  res.status(200).json(all)
 }
 else{
  item.total=item.quantity*item.price
 await item.save()
 const allitems=await carts.find()
 res.status(200).json(allitems)
 }
 
  }
  catch(error){
    console.log(error);
  }
}
exports.empty=async(req,res)=>{
  await carts.deleteMany({})
  const items=await carts.find()
  res.status(200).json(items)
}
