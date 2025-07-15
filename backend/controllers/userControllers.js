const mongoose=require('mongoose');
const User =require('../models/user');

const userSignup=async(req,res)=>{
    try{
      const {userName,email,password}=req.body;
      const existing=await User.findOne({email});
      if(existing){
        return res.status(400).json({message:"Account Already Exists"})
      }
      const newUser=await User.create({userName,email,password});
      return res.status(201).json({message:"Account Created Successfully",newUser})

      
    }
    catch(e){
        console.log(e);
         return res
           .status(500)
           .json({ message: "Failed to Create Account"});


    }
}

const addToCart=async(req,res)=>{

    try{
       const {productId,quantity=1,userId}=req.body;

       const user=await User.findById(userId);
     
     if(!user){
      return res.status(404).json({message:"User Not Found"})
     }
     const existingProduct=user.cart.find((item)=>item.product.toString()===productId);

     if(existingProduct){
      existingProduct.quantity += quantity;
     }
     else{
      user.cart.push({product:productId,quantity})
     }
     await user.save();
     const updatedCart=await User.findById(userId).populate("cart.product")
       return res.status(200).json({ message:"Product Added to Cart", cart:updatedCart.cart });
    }
    catch(e){
      console.log(e)
        return res.status(500).json({message:"errorgetting the cart"})
    }
}

const removeFromCart=async(req,res)=>{
  try{
   const {userId,productId}=req.body;
   const user=await User.findById(userId);
   if(!user){
    return res.status(400).json({message:"user not found"})
   }
   await User.findByIdAndUpdate(userId,{$pull:{cart:{product:productId}}},
    {new:true}
   );
   const updatedCart=await User.findById(userId).populate("cart.product");
   return res.status(200).json({message:"Product Removed from cart Successfully",updatedcart:updatedCart.cart})
    

  }

  catch(e){
   return res.status(500).json({message:"Cant able to remove the product"})
  }
}
module.exports={userSignup,addToCart,removeFromCart}