const express=require("express");
const router=express.Router();
const upload=require("../middlewares/upload")
const {addBanner,getBanner,deleteBanner,updateBanner}=require("../controllers/bannerControllers")

router.post("/",upload.single("image"),addBanner);
router.get("/",getBanner);
router.delete("/:deleteId",deleteBanner);
router.put("/:updateId",upload.single("image"),updateBanner);

module.exports=router;