const mongoose=require('mongoose');
const { userSignup,addToCart,removeFromCart }=require('../controllers/userControllers');
const express=require('express');
const router=express.Router();

router.post("/",userSignup);
router.post("/cart",addToCart)
router.post("/removecart",removeFromCart)

module.exports=router