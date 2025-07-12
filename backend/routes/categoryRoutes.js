const express=require('express');
const router=express.Router();
const {addCategory,getCategory,deleteCategory}=require("../controllers/categoryControllers");
const upload=require("../middlewares/upload")

router.post("/",upload.single("icon"),addCategory);
router.get("/",getCategory);
router.delete("/:deleteId",deleteCategory);

module.exports= router;