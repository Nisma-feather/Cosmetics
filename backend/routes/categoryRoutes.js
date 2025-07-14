const express=require('express');
const router=express.Router();
const {addCategory,getCategory,deleteCategory,updateCategory}=require("../controllers/categoryControllers");
const upload=require("../middlewares/upload");


router.post("/",upload.single("icon"),addCategory);
router.get("/",getCategory);
router.delete("/:deleteId",deleteCategory);
router.put("/:updateId",upload.single("icon"),updateCategory);
module.exports= router;