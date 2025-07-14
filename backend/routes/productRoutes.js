const express=require('express');
const router=express.Router();
const {addProduct,getProduct}=require("../controllers/productController");
const upload=require("../middlewares/upload")

router.post("/",upload.array('images',4),addProduct);
router.get("/",getProduct)

module.exports=router