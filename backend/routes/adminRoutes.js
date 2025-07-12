const express=require("express");
const router=express.Router();
const upload=require("../middlewares/upload")
const {addBanner}=require("../controllers/adminControllers")

router.post("/addBanner",upload.single("image"),addBanner)

module.exports=router